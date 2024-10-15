import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DynamicWidget, useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { Box } from '@mui/material'
import GatewayLayout from '@/components/layout/gateway'
import NmSpinInfinity from '@/components/nm-spin/infinity'
import { useAppDispatch } from '@/lib/hooks'

import config from '@/config'

const { title, logo } = config

export default function Gateway() {
  const router = useRouter()

  const isLoggedIn = useIsLoggedIn()

  const { user } = useDynamicContext()

  const dispatch = useAppDispatch()

  const [loading, setSubmitLoading] = useState(isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      setSubmitLoading(true)
      if (user?.userId) {
        router.replace(`${user?.userId}`)
      }
    } else {
      setSubmitLoading(false)
    }
  }, [isLoggedIn])

  useEffect(() => {
    const handleRouteChangeComplete = url => {
      setSubmitLoading(false)
    }

    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    // Cleanup event listener on component unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router.events])

  return (
    <GatewayLayout contentClass="text-center flex flex-col justify-center gap-20">
      <header>
        <h1 className="font-righteous pb-4 text-3xl lg:text-4.5xl relative group">Log in to your {title}</h1>
        <p className="text-black/50 py-4">Good to have you back!</p>
      </header>
      <section className="mx-auto">
        <Box className="scale-105 pb-12">
          <DynamicWidget innerButtonComponent={<div>Sign up or Log in</div>} />
        </Box>
        {loading && (
          <Box className="flex gap-4 justify-center items-center">
            <span>Account Onchain Connecting</span>
            <NmSpinInfinity customClass="-ml-1 text-primary scale-120 animate__animated animate__fadeIn" />
          </Box>
        )}
      </section>
    </GatewayLayout>
  )
}
