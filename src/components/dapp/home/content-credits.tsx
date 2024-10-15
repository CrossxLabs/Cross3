import Image from 'next/image'
import Link from 'next/link'
import { useParallax } from 'react-scroll-parallax'
import { Box, Avatar, Chip, Typography, useTheme, useMediaQuery } from '@mui/material'
import { TextGenerateEffect } from '@/components/aceternity-ui/text-generate-effect'
import ItemChainsSwiper from '@/components/card-group/swiper-card/item-chains'

import config from '@/config'

const { title, domains } = config

let texts = [
  'All deployed On-chain.',
  'Your Social Feeds. Payments.',
  'Photos. Videos. Galleries.',
  'NFT Collections. Streams.',
  'Calendar. Events . . .',
]

const ContentCredits = () => {
  const theme = useTheme()
  let smScreen = useMediaQuery(theme.breakpoints.up('sm'))

  const boxParallax = useParallax<HTMLDivElement>({
    opacity: [0.8, 1],
    scale: [0.65, 1.4],
  })

  return (
    <section ref={boxParallax.ref} className="text-center flex flex-col gap-8 justify-center items-center">
      <ItemChainsSwiper avatarClass="size-13" customClass="w-full my-4 opacity-50 hover:opacity-100" />
      <Box className="relative w-full">
        <TextGenerateEffect
          words={texts}
          variant={smScreen ? 'h2' : 'h3'}
          customClass="font-extrabold font-fustat"
          itemClass="leading-tight"
          duration={2}
        />
        <Box className="absolute bottom-0 w-full h-120 sm:h-80 bg-gradient-to-t from-white" />
      </Box>
      <Typography variant="h4" className="font-normal font-fustat py-12 max-sm:text-2xl max-sm:px-4">
        All your content integrated into your social pages.
      </Typography>
    </section>
  )
}

export default ContentCredits
