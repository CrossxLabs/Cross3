import { useParallax } from 'react-scroll-parallax'
import OpenLayout from '@/components/layout/open'

import Header from '@/components/layout/header'
import Banner from '@/components/dapp/home/banner'
import Footer from '@/components/layout/footer'

import ContentVideo from '@/components/dapp/home/content-video'
import ContentUsers from '@/components/dapp/home/content-users'
import ContentCredits from '@/components/dapp/home/content-credits'
import ContentGrids from '@/components/dapp/home/content-grids'
import ContentSocial from '@/components/dapp/home/content-social'

import config from '@/config'

const { logo } = config

const Index = () => {
  const videoParallax = useParallax<HTMLDivElement>({
    opacity: [0.85, 1],
    scale: [0.85, 1.1, 'easeInQuad'],
  })

  return (
    <OpenLayout>
      <Banner />
      <ContentVideo contentRef={videoParallax.ref} />
      <ContentUsers />
      <ContentCredits />
      <ContentGrids customClass="py-36" />
      <ContentSocial />
      <Footer />
    </OpenLayout>
  )
}

export default Index
