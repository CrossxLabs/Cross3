import { ParallaxProvider } from 'react-scroll-parallax'

export function NmParallaxProvider({ children }: { children: React.ReactNode }) {
  return <ParallaxProvider>{children}</ParallaxProvider>
}
