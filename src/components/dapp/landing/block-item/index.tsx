import { useCallback, memo, useEffect, useState } from 'react'
import { Box, Button, Avatar, Card } from '@mui/material'
import NmIcon from '@/components/nm-icon'
import { setStudioInfo } from '@/store/slice/studio'
import { useAppDispatch, useStudioData } from '@/lib/hooks'

const clos = [
  { w: 2, h: 2 },
  { w: 4, h: 1 },
  { w: 4, h: 2 },
  { w: 2, h: 4 },
  { w: 4, h: 4 },
]

const BloackItem = ({ value }) => {
  const dispatch = useAppDispatch()
  const userStudio = useStudioData()
  const [active, setActive] = useState(0)

  const handleClick = (item, index) => {
    const activeIndex = userStudio.blocks.findIndex(block => block.name === value.name)
    const blocks = [...userStudio.blocks]
    blocks[activeIndex] = {
      ...blocks[activeIndex],
      w: item.w / 2,
      h: item.h / 2,
    }
    dispatch(setStudioInfo({ ...userStudio, blocks }))
    setActive(index)
  }

  const handleDelete = () => {
    const index = userStudio.blocks.findIndex(item => item.name === value.name)
    const blocks = [...userStudio.blocks]
    blocks.splice(index, 1)
    dispatch(setStudioInfo({ ...userStudio, blocks }))
  }

  return (
    <Card
      className={`w-full h-full relative group flex justify-between p-6 overflow-visible rounded-3xl ${clos[active].h === 1 ? 'flex-row' : 'flex-col'}`}
    >
      <Avatar sx={{ background: value?.color || '' }}>
        <NmIcon type={`icon-${value?.icon}`} className="text-2xl leading-0" />
      </Avatar>
      <p className="font-bold text-left">{value.name}</p>
      <Button
        className="text-white rounded-3xl w-fit bg-theme-primary hover:bg-theme-primary/50"
        onClick={() => window.open(value.url)}
      >
        Follow
      </Button>
      <div
        onClick={handleDelete}
        className="absolute flex opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 -top-2 -left-2 z-1 items-center justify-center p-2 rounded-full shadow-md bg-white"
      >
        <NmIcon type="icon-delete" />
      </div>
      <div className="w-44 absolute grid grid-cols-5 gap-x-1 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 -bottom-6 left-1/2 -translate-x-1/2 z-1 items-center justify-center p-2 rounded-full shadow-md bg-black">
        {clos.map((item, index) => (
          <div
            onClick={() => handleClick(item, index)}
            key={index}
            className={`flex rounded-md h-full aspect-auto items-center py-1 justify-center ${active === index ? 'bg-white' : ''}`}
          >
            <div
              className={`w-${item.w} h-${item.h} rounded-sm border ${active === index ? 'border-black' : ' border-white'} cursor-pointer`}
            ></div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default BloackItem
