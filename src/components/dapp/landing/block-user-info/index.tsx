import React, { useState, memo, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Avatar as MuiAvatar } from '@mui/material'
import Avatar, { genConfig } from 'react-nice-avatar'
import classNames from 'classnames'
import randomcolor from 'randomcolor'
import NmIcon from '@/components/nm-icon'
import NmBorderCounter from '@/components/nm-border-counter'
import { useGlobalContext } from '@/components/context'
import { useAppDispatch, useStudioData } from '@/lib/hooks'
import { setStudioInfo } from '@/store/slice/studio'
import { getCompareIgnoreCase } from '@/lib/utils'

import socialConfig from '@/config/common/social'
import config from '@/config'

let avatarConfig = genConfig()

const { types } = socialConfig
const { prefix, themes } = config

const BlockUserInfo = ({ ...props }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { studio, identity, social, isSelf } = useGlobalContext()

  const studioLocal = useStudioData()

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')

  const [nameEditing, setNameEditing] = useState(false)
  const [bioEditing, setBioEditing] = useState(false)

  const textAreaRef = useRef(null)

  const handleProfileBlur = (type = 'name') => {
    switch (type) {
      case 'name':
        setNameEditing(false)
        break
      case 'bio':
        setBioEditing(false)
        break

      default:
        break
    }
  }

  useEffect(() => {
    let name = studio?.name || social?.[identity?.type]?.displayName,
      bio = studio?.bio || social?.[identity?.type]?.description

    setName(name || '')
    setBio(bio || '')

    dispatch(setStudioInfo({ ...studio, name, bio }))
  }, [studio, social?.[identity?.type]])

  useEffect(() => {
    if (bioEditing && textAreaRef.current) {
      const textarea = textAreaRef.current
      textarea.focus()
      textarea.setSelectionRange(textarea.value.length, textarea.value.length)
    }
  }, [bioEditing])

  const contentTitle = (
    <Box className="font-semibold text-5xl leading-normal">
      {isSelf && nameEditing ? (
        <input
          type="text"
          autoFocus
          className="rounded-md placeholder:text-neutral-400 p-0 border-0 outline-0 focus:ring-0 w-full bg-transparent truncate text-5xl"
          placeholder="Name"
          defaultValue={name}
          disabled={!isSelf}
          onChange={e => {
            setName(e.target.value)
            dispatch(
              setStudioInfo({
                ...studioLocal,
                name: e.target.value,
              })
            )
          }}
          onBlur={() => handleProfileBlur('name')}
        />
      ) : (
        <h1
          className={classNames('truncate cursor-pointer', {
            'text-neutral-400': !name,
          })}
          onClick={() => setNameEditing(true)}
        >
          {name || 'Name'}
        </h1>
      )}
    </Box>
  )

  const contentNames = social?.data?.length > 0 && (
    <ul className="mb-1 flex flex-wrap gap-2">
      {social?.data.map((row, index) => {
        let path = row?.identity + (row?.platform == 'farcaster' ? '.farcaster' : ''),
          item = types[row.platform],
          item_active = getCompareIgnoreCase(String(router?.query?.id), path),
          curColor = item?.color || randomcolor()

        return ['ens', 'farcaster', 'lens', 'dotbit', 'unstoppabledomains', 'sns'].includes(row.platform) ? (
          <li
            key={`social-item-${index}`}
            className="p-1 px-1.5 gap-1 cursor-pointer flex items-center rounded-md border text-xs text-white"
            style={{
              color: item_active ? themes.light : curColor,
              backgroundColor: item_active ? curColor : themes.light,
              borderColor: curColor,
            }}
            onClick={() => router.push(path)}
          >
            <NmIcon
              type={`icon-${row?.platform || prefix}`}
              className="leading-0 hover:rotate-360 transition-all duration-500"
            />
            {row?.identity}
          </li>
        ) : null
      })}
    </ul>
  )

  const contentDesc = (
    <Box className="text-neutral-400 text-lg line-clamp-8 whitespace-pre-wrap break-words mb-4">
      {isSelf && bioEditing ? (
        <textarea
          rows={9}
          ref={textAreaRef}
          className="animate__animated animate__fadeIn resize-none outline-0 p-0 rounded-md border-none focus:ring-0 w-full bg-transparent truncate text-neutral-700 whitespace-pre-wrap break-words"
          placeholder="Add some bio..."
          defaultValue={bio}
          disabled={!isSelf}
          onChange={e => {
            setBio(e.target.value)
            dispatch(
              setStudioInfo({
                ...studioLocal,
                bio: e.target.value,
              })
            )
          }}
          onBlur={() => handleProfileBlur('bio')}
        />
      ) : (
        <p className="cursor-pointer break-word" onClick={() => setBioEditing(true)}>
          {bio || 'No bio yet...'}
        </p>
      )}
    </Box>
  )

  return (
    <article className={classNames('flex flex-col gap-2', props?.customClass)}>
      <NmBorderCounter speed="smooth" customClass="size-30 xl:size-40 p-2 rounded-full" innerClass="border-2">
        {social?.[identity?.type]?.avatar ? (
          <MuiAvatar className="size-full" src={social?.[identity?.type]?.avatar} />
        ) : (
          <Avatar className="size-full" {...avatarConfig} />
        )}
      </NmBorderCounter>
      {contentTitle}
      {contentNames}
      {contentDesc}
    </article>
  )
}

export default memo(BlockUserInfo)
