import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { useParallax } from 'react-scroll-parallax'
import { Box, Button, Skeleton, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper'
import LandingCard from '../landing/base/card'

import { nativeSocialEmbeds } from '@/config/bio/card'
import config from '@/config'

const { host, title } = config

const ContentSocial = () => {
  const [socialSkeleton, setSocialSkeleton] = useState(true)

  const socialParallax = useParallax<HTMLDivElement>({
      shouldAlwaysCompleteAnimation: true,
      scale: [0.8, 1.1],
    }),
    leftImg1Parallax = useParallax<HTMLDivElement>({
      shouldAlwaysCompleteAnimation: true,
      opacity: [0.5, 1],
      translateX: [-40, 0],
      translateY: [-100, 0],
      rotate: [0, 12],
      speed: -10,
    }),
    rightImg1Parallax = useParallax<HTMLDivElement>({
      shouldAlwaysCompleteAnimation: true,
      opacity: [0.5, 1],
      translateX: [100, 0],
      translateY: [100, 0],
      rotate: [0, -12],
      speed: -10,
    }),
    bottomImg1Parallax = useParallax<HTMLDivElement>({
      shouldAlwaysCompleteAnimation: true,
      opacity: [0.8, 1],
      translateX: [-80, 0],
    }),
    footerBtnParallax = useParallax<HTMLDivElement>({
      shouldAlwaysCompleteAnimation: true,
      opacity: [0.5, 1],
      translateY: [100, 0],
      speed: -50,
    })

  return (
    <section className="text-center py-24 sm:px-4">
      <Typography variant="h5" className="font-fustat font-semibold">
        And connect more
      </Typography>
      <Box ref={socialParallax.ref} className="my-10 mx-auto max-w-2xl relative">
        <Swiper
          slidesPerView={6}
          spaceBetween={12}
          modules={[Autoplay, FreeMode]}
          freeMode
          grabCursor
          loop
          autoplay={{
            delay: 1800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            480: {
              slidesPerView: 8,
            },
            1024: {
              slidesPerView: 9,
            },
            1600: {
              slidesPerView: 10,
            },
          }}
        >
          <Box className="absolute z-1 left-0 top-0 w-24 h-full bg-gradient-to-r from-white" />
          {nativeSocialEmbeds.map((row, index) => {
            return (
              <SwiperSlide key={`social_item_${index}`}>
                {socialSkeleton && <Skeleton animation="wave" variant="rounded" width={55} height={55} />}
                <Image
                  alt=""
                  draggable={false}
                  src={row.image}
                  width="100"
                  height="100"
                  className={classNames('rounded-md size-11 2xl:size-13', row['class'], {
                    'opacity-0 absolute top-0': socialSkeleton,
                    'opacity-20': row?.['disabled'],
                  })}
                  onLoadingComplete={e => {
                    if (socialSkeleton) e.naturalWidth && setSocialSkeleton(false)
                  }}
                />
              </SwiperSlide>
            )
          })}
          <Box className="absolute z-1 right-0 top-0 w-24 h-full bg-gradient-to-l from-white" />
        </Swiper>
      </Box>
      <Typography variant="h4" className="font-fustat font-semibold pt-24 xl:pt-48">
        Your unique handle and payments.
        <p className="font-light text-lg opacity-70 pt-2 pb-12">
          And btw, the good ones are still free. <span className="max-sm:block">All in one place.</span>
        </p>
      </Typography>
      <Box className="relative max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        <LandingCard
          component="ul"
          tpls={{ style: 'S001' }}
          customClass="p-8"
          innerClass="relative flex justify-center items-center gap-3 text-3.5xl sm:text-4xl tracking-wider overflow-hidden"
        >
          <li className="opacity-65">{host}/</li>
          <li className="animate-scroll-y max-h-60 sm:max-h-120">
            {[
              'Alice',
              'Bob',
              'Charlie',
              'David',
              'Emma.eth',
              'vitalik.eth',
              'Grace',
              'Hannah',
              'Ian.eth',
              'Julia',
              'Karl',
              'Stani.lens',
              'dwr.eth',
              'Nina',
              'Oliver',
              'Paula.lens',
              'Quentin',
              'Rachel',
              'Samuel',
              'Tina.farcaster',
              'Ursula',
              'Victor',
              'Wanda',
              'Vitalik.eth',
              'Yara',
              'Zach',
            ].map((row, index) => (
              <p key={`scroll-name-item-${index}`} className="text-4xl sm:text-4.5xl text-left leading-snug">
                {row}
              </p>
            ))}
          </li>
        </LandingCard>

        <Box className="absolute z-1 left-1.5 right-1.5 top-1.5 w-auto h-10 sm:h-16 bg-gradient-to-b from-black/90 backdrop-blur-sm" />
        <Box className="absolute z-1 left-1.5 right-1.5 bottom-1.5 w-auto h-10 sm:h-16 bg-gradient-to-b from-black/90 backdrop-blur-sm" />

        <Box className="absolute z-2 -top-12 -left-12" ref={leftImg1Parallax.ref}>
          <Image
            draggable={false}
            alt=""
            width={180}
            height={180}
            src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ebce23e53ac60a7fa7bd43_hero%20youtube.png"
            className="max-lg:size-32 hover:-rotate-12 transition-all duration-1000"
          />
        </Box>
        <Box className="absolute z-2 top-12 -right-12 lg:-right-24 max-sm:hidden" ref={rightImg1Parallax.ref}>
          <Image
            draggable={false}
            alt=""
            width={180}
            height={180}
            src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ebce230b9edded60bf0d84_hero%20twitter-p-500.png"
            className="max-lg:size-32 hover:rotate-12 transition-all duration-1000"
          />
        </Box>
        <Box className="absolute z-2 max-sm:-right-20 sm:left-6 lg:left-12 -bottom-16" ref={bottomImg1Parallax.ref}>
          <Image
            draggable={false}
            alt=""
            width={320}
            height={160}
            src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63862179c1d29e82a5658a25_spotifywidget2-p-1080.png"
            className="max-lg:w-60 hover:scale-110 transition-all duration-1000"
          />
        </Box>
      </Box>
      <Box className="pt-18 sm:pt-36 flex flex-col items-center gap-8" ref={footerBtnParallax.ref}>
        <Button
          size="large"
          className="w-full sm:w-auto p-4 px-20 text-xl text-white bg-theme-primary/50 hover:bg-theme-primary rounded-lg transition-all"
          href="/gateway"
        >
          Claim your {title}
        </Button>
      </Box>
    </section>
  )
}

export default ContentSocial
