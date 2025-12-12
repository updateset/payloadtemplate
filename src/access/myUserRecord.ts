import type { Access } from 'payload'

export const myUserRecord: Access = ({ req, id }) => {
  if (req.user?.isAdmin) {
    return Boolean(true)
  }

  if (req.user && id == req.user.id) {
    return Boolean(true)
  }

  return Boolean(false)
}
