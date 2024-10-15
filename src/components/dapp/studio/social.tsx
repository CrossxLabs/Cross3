import Link from 'next/link'
import Image from 'next/image'
import { Avatar, Box, Button } from '@mui/material'
import classNames from 'classnames'
import numabbr from 'numabbr'
import NmIcon from '@/components/nm-icon'
import NmStatus from '@/components/nm-status'
import NmSpinInfinity from '@/components/nm-spin/infinity'
import { useGlobalContext } from '@/components/context'
import { getBlurDataURL } from '@/lib/utils'

import socialConfig from '@/config/common/social'
import config from '@/config'

const { types } = socialConfig
const { prefix, domains } = config

const StudioSocial = ({ ...props }) => {
  const { social, isSelf } = useGlobalContext()

  // <Box className="flex justify-center min-h-full">
  //   <NmSpinInfinity customClass="text-primary loading-lg scale-150" />
  // </Box>
  return social?.links?.length ? (
    <ul className="flex flex-wrap gap-6">
      {social?.links.map((row, index) => {
        let item = types[row.type]
        return (
          <li
            key={`social-item-${index}`}
            className={classNames(
              'card shadow-sm border border-zinc-100 hover:border-zinc-200 hover:shadow-lg hover:scale-105 transition-all',
              {
                'flex-1':
                  (row.type == 'farcaster' && social?.farcaster?.avatar) ||
                  (row.type == 'lens' && social?.lens?.avatar),
              }
            )}
          >
            <Link className="p-5 group" href={row?.link} target="_blank">
              <ul className="flex justify-between items-center gap-4">
                <li className="flex flex-col gap-1 min-w-32 sm:min-w-36 lg:min-w-48 xl:min-w-52">
                  <Avatar
                    style={{
                      background: row?.bg,
                    }}
                    src={item?.image}
                    className="rounded-lg"
                  >
                    {!item?.image && (
                      <NmIcon
                        type={`icon-${item?.icon || prefix}`}
                        className="text-1.5xl hover:rotate-360 transition-all duration-500 leading-none"
                      />
                    )}
                  </Avatar>
                  <h2 className="card-title capitalize text-lg mt-1">{row?.type}</h2>
                  <p className="opacity-30 text-sm -mt-1">{row?.handle}</p>

                  {row.type == 'farcaster' && social?.farcaster?.social?.follower && (
                    <Button
                      size="small"
                      style={{
                        background: row?.bg,
                      }}
                      className="max-w-32 mt-1.5 rounded-md shadow-sm"
                      variant="contained"
                    >
                      Follow {numabbr(social?.farcaster?.social?.follower)}
                      {social?.farcaster?.social?.follower > 10000 && '+'}
                    </Button>
                  )}
                  {row.type == 'lens' && social?.lens?.social?.follower && (
                    <Button
                      size="small"
                      style={{
                        background: row?.bg,
                      }}
                      className="max-w-32 mt-1.5 rounded-md shadow-sm"
                      variant="contained"
                    >
                      Follow {numabbr(social?.lens?.social?.follower)}
                      {social?.lens?.social?.follower > 10000 && '+'}
                    </Button>
                  )}
                </li>
                {row.type == 'farcaster' && social?.farcaster?.avatar && (
                  <li>
                    <Image
                      alt=""
                      draggable={false}
                      src={social?.farcaster?.avatar}
                      width={100}
                      height={100}
                      placeholder="blur"
                      blurDataURL={getBlurDataURL(100, 100)}
                      className="rounded-md min-w-24"
                    />
                  </li>
                )}
                {row.type == 'lens' && social?.lens?.avatar && (
                  <li>
                    <Image
                      alt=""
                      draggable={false}
                      src={social?.lens?.avatar}
                      width={100}
                      height={100}
                      placeholder="blur"
                      blurDataURL={getBlurDataURL(100, 100)}
                      className="rounded-md min-w-24"
                    />
                  </li>
                )}
              </ul>
              {row.type == 'farcaster' && social?.farcaster?.description && (
                <p className="pt-2.5 opacity-70 line-clamp-2 whitespace-pre-wrap break-words">
                  {social?.farcaster?.description}
                </p>
              )}
              {row.type == 'lens' && social?.lens?.description && (
                <p className="pt-2.5 opacity-70 line-clamp-2 whitespace-pre-wrap break-words">
                  {social?.lens?.description}
                </p>
              )}
              <Avatar
                className={classNames(
                  'absolute right-2 size-6 bg-neutral-200 rounded-md hidden group-hover:inline',
                  !['ens', 'lens', 'farcaster'].includes(row.type) ? 'top-2' : 'bottom-4 right-4'
                )}
              >
                <NmIcon type="icon-line_right" className="-rotate-45 scale-95 align-middle ml-0.5 text-black/80" />
              </Avatar>
            </Link>
          </li>
        )
      })}
    </ul>
  ) : (
    !isSelf && (
      <NmStatus
        header={false}
        footer={false}
        status={404}
        text="Undressed page."
        image={`${domains.cdn}/status/icon_empty_assets_01.svg`}
        customClass="xl:-ml-4 -mt-10 xl:-mt-16 !px-0 animate__fadeIn animate__animated animate__delay-1s"
        innerClass="!px-0"
      />
    )
  )
}

export default StudioSocial
