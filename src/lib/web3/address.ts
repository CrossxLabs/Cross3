import prisma from '@/lib/prisma'
import { getBioNamesSvc } from '@/services/common'
import { getSocialList } from '@/lib/utils'

export const getPathsUser = async identity => {
  console.log('🐅 identity', identity)
  try {
    if (identity?.address) {
      return (
        (await prisma.user.findFirst({
          where: {
            account: {
              some: {
                address: {
                  equals: identity.address,
                  mode: 'insensitive',
                },
              },
            },
          },
        })) || identity
      )
    } else if (identity?.id) {
      return (
        (await prisma.user.findUnique({
          where: {
            id: identity?.id,
          },
        })) || identity
      )
    } else {
      return identity
    }
  } catch (error) {
    console.error('Error fetching user in getPathsUser:', error)
    return identity
  }
}

export const getBioNames = async address => {
  if (!address) return
  try {
    let res = await getBioNamesSvc({
      address,
    })
    if (res) {
      if (Array.isArray(res) && res?.length) {
        let item = res.find(row => row?.address)
        return {
          identity: {
            address: item?.address,
            type: item?.platform,
          },
          social: {
            ...getSocialList(res),
          },
        }
      } else if (typeof res == 'object' && res?.address) {
        return {
          identity: {
            address: res?.address,
            type: res?.platform,
          },
        }
      } else if (!res?.address) {
        return {
          identity: {
            type: 'id',
          },
        }
      }
    } else {
      return {
        identity: {
          type: 'id',
        },
      }
    }
  } catch (error) {
    console.error('Error fetching names:', error)
    return {
      identity: {
        type: 'empty',
      },
    }
  }
}
