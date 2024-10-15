import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParallax } from 'react-scroll-parallax'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { FlipWords } from '@/components/aceternity-ui/flip-words'

import config from '@/config'

const { title, titles, logo } = config

let animateWords = [
  'Onchain Social Layer.',
  'Crypto Blocks Profiles.',
  'But Rich and Beautiful.',
  'Multichain in Cross3.',
]

const Banner = ({ ...props }) => {
  const theme = useTheme()
  let lgScreen = useMediaQuery(theme.breakpoints.up('lg')),
    lg2xlScreen = useMediaQuery(theme.breakpoints.between('lg', 1280))

  const bannerParallax = useParallax<HTMLDivElement>({
      shouldAlwaysCompleteAnimation: true,
      opacity: [1, 0],
      scale: [1, 1.3],
    }),
    leftImg1Parallax = useParallax<HTMLDivElement>({
      shouldAlwaysCompleteAnimation: true,
      opacity: [1, 0],
      translateX: [lgScreen ? 40 : 0, -150],
      translateY: [lg2xlScreen ? -60 : 10, -150],
      speed: -10,
    }),
    leftImg2Parallax = useParallax<HTMLDivElement>({
      shouldAlwaysCompleteAnimation: true,
      opacity: [1, 0],
      translateX: [0, -300],
      translateY: [lg2xlScreen ? 80 : 0, 150],
    }),
    leftImg3Parallax = useParallax<HTMLDivElement>({
      shouldAlwaysCompleteAnimation: true,
      opacity: [1, 0],
      translateX: [15, lgScreen ? -300 : 300],
      translateY: [lg2xlScreen ? 100 : -5, lgScreen ? 300 : 0],
      speed: -10,
    }),
    rightImg1Parallax = useParallax<HTMLDivElement>({
      shouldAlwaysCompleteAnimation: true,
      opacity: [1, 0],
      translateX: [20, lgScreen ? 150 : -150],
      translateY: [0, lgScreen ? -300 : 0],
      speed: -10,
    }),
    rightImg2Parallax = useParallax<HTMLDivElement>({
      shouldAlwaysCompleteAnimation: true,
      opacity: [1, 0],
      translateX: [5, 150],
      translateY: [lg2xlScreen ? 100 : 0, lgScreen ? 300 : 0],
      speed: -10,
    })

  return (
    <section
      ref={bannerParallax.ref}
      className="pt-20 lg:pt-12 relative text-center flex flex-col gap-6 sm:gap-8 justify-center items-center min-h-screen"
    >
      <header className="flex flex-col items-center animate-trans-blur animate__slower animate__delay-3s">
        <Image
          draggable={false}
          alt=""
          width={120}
          height={120}
          src={logo.light}
          className="hover:rotate-180 transition-all duration-1000"
        />
        <Typography variant="h2" className="group relative font-semibold font-righteous tracking-wider mt-3">
          {titles[0]}
          <Box className="absolute -right-3 top-2 text-lg">
            <span className="group-hover:hidden">{titles[1]}</span>
            <span className="hidden -mr-1 group-hover:inline transition-all">🥭</span>
          </Box>
        </Typography>
      </header>
      <Box className="animate__animated animate__flipInX animate__slow">
        <Typography variant="h2" className="font-black font-fustat">
          <p className="mb-1">All in Portfolios.</p>
          <FlipWords words={animateWords} className="text-center" />
        </Typography>
        <Typography variant="h6" className="text-zinc-400 font-normal font-fustat py-6">
          Your web3 gateway to show everything you are and create.
        </Typography>
        <ul className="flex flex-col gap-4 pt-6">
          <li>
            <Button
              size="large"
              className="w-full sm:w-auto p-4 px-20 text-xl text-white bg-theme-primary rounded-lg"
              href="/gateway"
            >
              Create your {title}
            </Button>
          </li>
        </ul>
      </Box>
      <Box className="lg:absolute mt-12 sm:mt-14 lg:mt-0 max-lg:flex left-0">
        <Box ref={leftImg1Parallax.ref}>
          <Image
            draggable={false}
            alt=""
            width={200}
            height={200}
            className="-rotate-6 hover:rotate-6 transition-all duration-500"
            src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/641dca4b67deea2ebb9ff2fb_bigyoutubewidget.png"
          />
        </Box>
        <Box ref={leftImg2Parallax.ref}>
          <Image
            draggable={false}
            alt=""
            width={180}
            height={180}
            className="rotate-12 hover:-rotate-6 transition-all duration-500"
            src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ebce230b9edded60bf0d84_hero%20twitter-p-500.png"
          />
        </Box>
        <Box ref={leftImg3Parallax.ref}>
          <Image
            draggable={false}
            alt=""
            width={120}
            height={180}
            src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ebcd583d088274b088fd2c_instagramwidget-p-500.png"
            className="-rotate-12 hover:rotate-6 transition-all duration-500"
          />
        </Box>
      </Box>
      <Box className="lg:absolute max-lg:flex right-0">
        <Box ref={rightImg1Parallax.ref}>
          <Image
            draggable={false}
            alt=""
            width={180}
            height={180}
            src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ea7d42d96b453e6c24c20f_hero%20buymeacoffee-p-500.png"
            className="rotate-6 hover:-rotate-6 transition-all duration-500"
          />
        </Box>
        <Box ref={rightImg2Parallax.ref}>
          <Image
            draggable={false}
            alt=""
            width={250}
            height={250}
            src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/639207e5abd89162bd81b491_bigcalendlywidget.png"
            className="-rotate-6 hover:rotate-6 transition-all duration-500"
          />
        </Box>
      </Box>
    </section>
  )
}

export default Banner
