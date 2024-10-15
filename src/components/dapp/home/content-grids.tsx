import { useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useParallax } from 'react-scroll-parallax'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import NmGridLayout from '@/components/nm-grid-layout'
import { useMobile } from '@/lib/hooks'
import { getRandomItem, getRandomItems } from '@/lib/utils'

import config from '@/config'

const { domains } = config

let grids = [
  {
    id: 1,
    w: 1,
    h: 2,
    content: (
      <Image
        draggable={false}
        alt=""
        width={450}
        height={450}
        src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/641dca4b67deea2ebb9ff2fb_bigyoutubewidget.png"
        className="hover:rotate-12 transition-all duration-1000"
      />
    ),
  },
  {
    id: 2,
    w: 1,
    h: 0.5,
    content: (
      <Image
        draggable={false}
        alt=""
        width={450}
        height={150}
        src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e91a49f16d3f275eb12ba7_githubwidget-p-800.png"
        className="hover:rotate-12 transition-all duration-1000"
      />
    ),
  },
  {
    id: 3,
    w: 0.5,
    h: 0.5,
    content: (
      <Image
        draggable={false}
        alt=""
        width={175}
        height={175}
        src={getRandomItem([
          `${domains.cdn}/cross3/static/gateway/social_behance.png`,
          'https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63951e93fd907e46335dd557_appstorewidget-p-500.png',
        ])}
        className="hover:rotate-12 transition-all duration-1000"
      />
    ),
  },
  {
    id: 4,
    w: 0.5,
    h: 0.5,
    content: (
      <Image
        draggable={false}
        alt=""
        width={175}
        height={175}
        src={getRandomItem([
          `${domains.cdn}/cross3/static/gateway/social_linkedin.png`,
          'https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ea7d42d96b453e6c24c20f_hero%20buymeacoffee-p-500.png',
        ])}
        className="hover:rotate-12 transition-all duration-1000"
      />
    ),
  },
  {
    id: 5,
    w: 0.5,
    h: 1.5,
    content: (
      <Image
        draggable={false}
        alt=""
        width={175}
        height={450}
        src={getRandomItem([
          `${domains.cdn}/cross3/static/gateway/social_shot_ins.png`,
          'https://cdn.prod.website-files.com/6335b33630f88833a92915fc/641da7bd90faf7781c424550_tallspotifywidget.png',
        ])}
        className="max-w-full h-auto hover:rotate-12 transition-all duration-1000"
      />
    ),
  },
  {
    id: 6,
    w: 0.5,
    h: 1.5,
    content: (
      <Image
        draggable={false}
        alt=""
        width={175}
        height={450}
        src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ebcd583d088274b088fd2c_instagramwidget-p-500.png"
        className="hover:rotate-12 transition-all duration-1000"
      />
    ),
  },
  {
    id: 7,
    w: 1,
    h: 2,
    content: (
      <Image
        draggable={false}
        alt=""
        width={450}
        height={450}
        src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/639207e5abd89162bd81b491_bigcalendlywidget.png"
        className="hover:rotate-12 transition-all duration-1000"
      />
    ),
  },
]

const ContentGrids = ({ data = [], customClass = null, parallax = true, ...props }) => {
  const router = useRouter()
  const isMobile = useMobile()
  const theme = useTheme()
  let lgScreen = useMediaQuery(theme.breakpoints.up('lg')),
    lg2xlScreen = useMediaQuery(theme.breakpoints.between('lg', 1280)),
    gateway = router?.pathname?.startsWith('/gateway')

  grids =
    data && Array.isArray(data) && data?.length
      ? data
      : isMobile && !gateway
        ? grids
            .map(row => {
              if ([3, 4].includes(row.id)) {
                row.w = 1
                row.h = 1
              }
              return row
            })
            .filter(item => ![5, 6].includes(item.id))
        : grids

  const boxParallax = parallax
    ? useParallax<HTMLDivElement>({
        shouldAlwaysCompleteAnimation: true,
        opacity: [0.8, 1],
        scale: [0.9, 1.1],
        translateX: [lgScreen ? (lg2xlScreen ? 4 : 12) : 0, lgScreen ? (lg2xlScreen ? 9 : 12) : 0],
      })
    : { ref: useRef(null) }

  const handleLayoutChange = newLayout => {
    console.log('Layout changed:', newLayout)
  }

  return (
    <section ref={boxParallax.ref} className={classNames('text-center mx-auto', customClass)}>
      <NmGridLayout grids={grids} onLayoutChange={handleLayoutChange} />
    </section>
  )
}

export default ContentGrids
