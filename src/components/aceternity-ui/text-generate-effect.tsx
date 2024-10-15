import { useEffect } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'
import { Typography, TypographyProps } from '@mui/material'
import classNames from 'classnames'

export interface TextGenerateEffectProps extends TypographyProps {
  words: string[] | string
  customClass?: string
  itemClass?: string
  filter?: boolean
  duration?: number
}

export const TextGenerateEffect = ({
  words,
  variant,
  component,
  customClass,
  itemClass,
  filter = true,
  duration = 0.5,
}: TextGenerateEffectProps) => {
  const [scope, animate] = useAnimate()

  let wordsArray = Array.isArray(words) ? words : words.split(' ')

  useEffect(() => {
    animate(
      'p',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.5),
      }
    )
  }, [scope.current])

  const renderWords = () => (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => {
        return (
          <motion.p
            key={word + idx}
            className={classNames('opacity-0 mb-1', itemClass)}
            style={{
              filter: filter ? 'blur(10px)' : 'none',
            }}
          >
            {word}
          </motion.p>
        )
      })}
    </motion.div>
  )

  return (
    <Typography variant={variant} component={component} className={classNames(customClass)}>
      {renderWords()}
    </Typography>
  )
}
