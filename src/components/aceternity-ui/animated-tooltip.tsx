import { useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { motion, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

export const AnimatedTooltip = ({ items = [], customClass = null, ...props }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const springConfig = { stiffness: 100, damping: 5 }
  const x = useMotionValue(0) // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig)
  // translate the tooltip
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig)
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2
    x.set(event.nativeEvent.offsetX - halfWidth) // set the x value, which is then used in transform and rotate
  }

  return (
    <ul className={classNames('flex flex-wrap justify-center items-center gap-4 sm:gap-6', customClass)}>
      {items.map((item, idx) => (
        <li
          className="relative group"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === item.id && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: 'nowrap',
              }}
              className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-2 shadow-xl px-4 py-2"
            >
              <div className="absolute inset-x-10 z-1 w-1/5 -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
              <div className="absolute left-10 w-2/5 z-1 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
              <div className="font-bold text-white relative z-1 text-base">{item.name}</div>
              <div className="text-white text-xs">{item.designation}</div>
            </motion.div>
          )}
          <Image
            onMouseMove={handleMouseMove}
            height={100}
            width={100}
            src={item.image}
            alt={item.name}
            className={classNames(
              'object-cover object-top rounded-full max-2xs:size-14 size-15 group-hover:border-2 group-hover:border-theme-primary group-hover:scale-105 group-hover:z-1 relative transition duration-500',
              props?.avatarClass
            )}
          />
        </li>
      ))}
    </ul>
  )
}
