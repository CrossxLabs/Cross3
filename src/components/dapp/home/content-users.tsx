import Image from 'next/image'
import { useParallax } from 'react-scroll-parallax'
import { Button, Typography } from '@mui/material'
import { AnimatedTooltip } from '@/components/aceternity-ui/animated-tooltip'
import NmIcon from '@/components/nm-icon'
import { getDefaultAvatarUrl, getRandomIntNum } from '@/lib/utils'

import config from '@/config'

const { title, domains } = config

let showcase = [
  {
    id: 1,
    name: 'John Doe',
    designation: 'Software Engineer',
    image: getDefaultAvatarUrl(160),
  },
  {
    id: 2,
    name: 'Robert Johnson',
    designation: 'Product Manager',
    image: getDefaultAvatarUrl(175),
  },
  {
    id: 3,
    name: 'Jane Smith',
    designation: 'Data Scientist',
    image: getDefaultAvatarUrl(88),
  },
  {
    id: 4,
    name: 'Emily Davis',
    designation: 'UX Designer',
    image: getDefaultAvatarUrl(90),
  },
  {
    id: 5,
    name: 'Tyler Durden',
    designation: 'Soap Developer',
    image: getDefaultAvatarUrl(95),
  },
  {
    id: 6,
    name: 'Alice Thompson',
    designation: 'Marketing Specialist',
    image: getDefaultAvatarUrl(188),
  },
  {
    id: 7,
    name: 'Michael Brown',
    designation: 'DevOps Engineer',
    image: getDefaultAvatarUrl(195),
  },
  {
    id: 8,
    name: 'Laura Wilson',
    designation: 'HR Manager',
    image: getDefaultAvatarUrl(108),
  },
  {
    id: 9,
    name: 'David Martinez',
    designation: 'Frontend Developer',
    image: getDefaultAvatarUrl(200),
  },
  {
    id: 10,
    name: 'Sophia Garcia',
    designation: 'Backend Developer',
    image: getDefaultAvatarUrl(99),
  },
]

const ContentUsers = () => {
  const boxParallax = useParallax<HTMLDivElement>({
    shouldAlwaysCompleteAnimation: true,
    opacity: [0.8, 1],
    scale: [0.5, 1.06],
  })

  return (
    <section
      ref={boxParallax.ref}
      className="relative text-center pt-24 flex flex-col gap-14 justify-center items-center min-h-screen"
    >
      <Typography variant="h3" className="font-extrabold font-fustat">
        Join thousands of inspiring creatives
      </Typography>
      <AnimatedTooltip customClass="flex justify-center items-center" avatarClass="sm:size-18" items={showcase} />
      <Button
        size="large"
        className="w-full sm:w-auto min-w-96 relative group p-4 text-lg bg-theme-primary/50 rounded-lg text-white hover:bg-theme-primary"
        href="/gateway"
      >
        Explore the most creative {title}
        <NmIcon
          type="icon-angle_right"
          className="absolute right-4 opacity-0 group-hover:opacity-100 animate__animated animate__infinite animate__fadeInLeft animate__slow"
        />
      </Button>
    </section>
  )
}

export default ContentUsers
