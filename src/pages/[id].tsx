import { useEffect, useState } from 'react'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import LandingLayout from '@/components/layout/landing'
import NmSpinInfinity from '@/components/nm-spin/infinity'
import { GlobalContext } from '@/components/context'
import prisma from '@/lib/prisma'
import { bigintFactory } from '@/lib/prisma/common'
import { getBioNames, getPathsUser } from '@/lib/web3/address'
import { getCompareIgnoreCase, getSocialList } from '@/lib/utils'
import { getBioNamesSvc } from '@/services/common'

interface Params extends ParsedUrlQuery {
  id: string
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  if (!prisma) throw new Error('prisma client not initialized ˙◠˙')

  try {
    const { id } = context.params as Params

    if (!id) throw new Error('id must be provided ˙◠˙')

    let { identity, social = null } = await getBioNames(id)

    console.log('🐳 social', social)
    let user = await getPathsUser({ ...identity, id })

    console.log('🐒 user', user)

    user = bigintFactory(user)

    let studio = await prisma.studio.findUnique({
      where: {
        uuid: user?.id,
      },
    })

    studio = bigintFactory(studio)

    return {
      props: {
        user,
        studio: studio || null,
        identity: { ...identity, id },
        social,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      notFound: true,
    }
  }
}

export default function RenderUser({ user, studio, identity, social }) {
  const router = useRouter()

  const isLoggedIn = useIsLoggedIn()

  const { user: userData, primaryWallet } = useDynamicContext()

  const [isSelf, setSelf] = useState(false)

  const [socialLocal, setSocialLocal] = useState(social)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBioNames = async (address: string) => {
      try {
        const res = await getBioNamesSvc({ address })
        if (Array.isArray(res) && res?.length) {
          setSocialLocal(getSocialList(res))
        }
      } catch (error) {
        console.error('Error fetching bio names:', error)
      } finally {
        setLoading(false)
      }
    }

    const isUserIdMatch =
      getCompareIgnoreCase(user?.id, identity?.id) || getCompareIgnoreCase(identity?.address, identity?.id)

    const isSelf = isLoggedIn && user?.account?.length && isUserIdMatch

    setSelf(isSelf)

    if (user?.id && !user?.address && !social) {
      const walletInfo = user?.account?.find(row => row?.address)
      const walletAddress = isSelf ? primaryWallet?.address : walletInfo?.address

      if (walletAddress) {
        fetchBioNames(walletAddress)
      } else {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [userData, isLoggedIn, user?.id, primaryWallet?.address])

  if (loading) {
    return <NmSpinInfinity absoluteCenter customClass="text-primary loading-lg scale-150" />
  }

  return (
    <GlobalContext.Provider value={{ user, identity, studio, social, isSelf: router.query?.preview ? false : isSelf }}>
      <LandingLayout />
    </GlobalContext.Provider>
  )
}
