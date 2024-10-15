import { ReactNode, FC, createContext, useContext } from 'react'
import { Provider } from 'react-redux'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { useRouter } from 'next/router'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { SolanaWalletConnectors } from '@dynamic-labs/solana'
import { BitcoinWalletConnectors } from '@dynamic-labs/bitcoin'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { createConfig, WagmiProvider } from 'wagmi'
import { StudioContextProvider } from './studio'
import { SnackbarProvider } from './snackbar'
import { NmParallaxProvider } from './parallax'
import { getUserAccountSvc } from '@/services/user'
import { CacheRequestProvider } from '@/lib/api/cache'
import { wagmiDynamicConfig } from '@/lib/chains/wagmi'
import { store } from '@/lib/store'
import { env } from '@/lib/types/env'

import config from '@/config'

const { title, prefix, themes } = config

let persistor = persistStore(store)

const cache = createCache({
  key: `${prefix.replace('3', '')}-style`,
  prepend: true,
})

const rootElement = () => document.getElementById('__next')

const theme = createTheme({
  palette: {
    primary: {
      main: themes.primary,
    },
    success: {
      main: themes.success,
      contrastText: themes.light,
    },
    warning: {
      main: themes.warning,
      contrastText: themes.light,
    },
    error: {
      main: themes.error,
    },
    secondary: {
      main: themes.secondary,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: themes.light,
            backgroundColor: themes.primary,
            ':hover': {
              opacity: 0.999,
              backgroundColor: themes.primary,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: 'initial',
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiDrawer: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiSwipeableDrawer: {
      defaultProps: {
        container: rootElement,
      },
    },
    // ...
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1024,
      xl: 1536,
    },
  },
})

const walletConfig = createConfig(wagmiDynamicConfig)

const queryClient = new QueryClient()

const dynamicStyleOverrides = `
.dynamic-shadow-dom-content {
  --dynamic-connect-button-color: #fff;
  --dynamic-connect-button-background: ${themes.primary};
  --dynamic-connect-button-radius: 10rem;
  > div > button {
    padding: .9rem 5rem;
    div {
     font-size: 1rem;
     font-weight: 400;
    }
  }
}
.menu-list__overlay-card__container {
  gap: .5rem;
}
`

export const GlobalContext = createContext<any>({})

export const GlobalContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()

  const handleAccountSubmit = async val => {
    let res = await getUserAccountSvc(val)

    if (res?.ok) {
      router.replace(`${res?.data?.id}`)
    } else {
      if (res?.message) {
      }
    }
  }

  return (
    <CacheProvider value={cache}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <DynamicContextProvider
            settings={{
              appName: title,
              environmentId: env?.dynamicConnectId,
              walletConnectors: [EthereumWalletConnectors, SolanaWalletConnectors],
              cssOverrides: dynamicStyleOverrides,
              events: {
                onAuthSuccess: args => {
                  if (args?.user?.userId) {
                    handleAccountSubmit(args?.user)
                  }
                },
              },
            }}
          >
            <WagmiProvider config={walletConfig}>
              <QueryClientProvider client={queryClient}>
                <DynamicWagmiConnector>
                  <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                      <CacheRequestProvider>
                        <NmParallaxProvider>
                          <StudioContextProvider>
                            <SnackbarProvider>{children}</SnackbarProvider>
                          </StudioContextProvider>
                        </NmParallaxProvider>
                      </CacheRequestProvider>
                    </PersistGate>
                  </Provider>
                </DynamicWagmiConnector>
              </QueryClientProvider>
            </WagmiProvider>
          </DynamicContextProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
