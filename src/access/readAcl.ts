'use server'
import type { PayloadRequest } from 'payload'

export const readAcl = async (req: PayloadRequest, slug: string) => {
  let allowed = false

  try {
    if (req.user) {
      if (req.user.isAdmin) {
        return Boolean(true)
      }

      const groupResult = await req.payload.find({
        collection: 'groups',
        depth: 0,
        where: {
          'users.user.id': {
            equals: req.user.id,
          },
        },
        select: {
          name: true,
        },
      })

      const accessResult = await req.payload.find({
        collection: 'access',
        depth: 0,
        limit: 1,
        where: {
          collection: { equals: slug },
        },
        select: {
          read: {
            group: true,
          },
        },
      })

      //looping through the access results and comparing if the user is part of said groups.
      if (accessResult.docs && accessResult.docs[0].read && groupResult.docs) {
        loop1: for (let i = 0; i < accessResult.docs[0].read.length; i++) {
          for (let j = 0; j < groupResult.docs.length; j++) {
            if (accessResult.docs[0].read[i].group == groupResult.docs[j].id) {
              allowed = true
              break loop1
            }
          }
        }
      }
    }
    return Boolean(allowed)
  } catch (ex) {
    console.log(ex)
    return Boolean(false)
  }
}
