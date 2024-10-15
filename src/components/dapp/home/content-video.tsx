import { useState } from 'react'
import Image from 'next/image'
import { useMediaQuery, useTheme } from '@mui/material'

import config from '@/config'

const { domains } = config

const ContentVideo = ({ contentRef = null, ...props }) => {
  const theme = useTheme()
  let smScreen = useMediaQuery(theme.breakpoints.up('sm'))

  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <section className="relative z-1 -mt-12 mx-auto lg:px-16 min-h-screen" ref={contentRef}>
      {!videoLoaded && (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-infinity text-primary loading-lg scale-150" />
      )}
      <video
        // @ts-ignore
        loading="lazy"
        loop
        muted
        playsInline
        autoplay="autoplay"
        className="w-full rounded-3xl"
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source
          src={
            smScreen
              ? `${domains.cdn}/cross3/static/home/preview/screenshot_showcase_pc_01.mp4`
              : `${domains.cdn}/cross3/static/home/preview/screenshot_showcase_mobile_01.mp4`
          }
          type="video/mp4"
        />
        <source
          src={
            smScreen
              ? `${domains.cdn}/cross3/static/home/preview/screenshot_showcase_pc_01.webm`
              : `${domains.cdn}/cross3/static/home/preview/screenshot_showcase_mobile_01.webm`
          }
          type="video/webm"
        />
      </video>
    </section>
  )
}

export default ContentVideo
