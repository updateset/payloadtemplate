import type { CollectionBeforeValidateHook } from 'payload'

export const computeName: CollectionBeforeValidateHook = async ({ data }) => {
  if (data) data.name = `${data.firstName} ${data.lastName}`
  return data
}
