import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function account(req: NextApiRequest, res: NextApiResponse) {
  let method = req.method.toUpperCase()

  if (method === 'PUT' || method === 'POST') {
    let { userId, email } = req.body

    let account = req.body?.verifiedCredentials

    if (!userId) {
      res.status(400).json({ ok: false, message: 'User id is required ˙◠˙' })
      return
    }

    try {
      const upsertedUser = await prisma.user.upsert({
        where: { id: userId },
        update: { account, email },
        create: { id: userId, account, email },
      })

      res.status(200).json({ ok: true, data: upsertedUser })
    } catch (error) {
      console.log(error)
      res.status(500).json({ ok: false, message: 'Failed to update user ˙◠˙' })
    }
  } else {
    res.setHeader('Allow', ['PUT', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
