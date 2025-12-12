import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { myUserRecord } from '../../access/myUserRecord'
import { computeName } from './hooks/computeName'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: myUserRecord,
    delete: myUserRecord,
    read: myUserRecord,
    update: myUserRecord,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'isAdmin',
      type: 'checkbox',
    },
  ],
  hooks: {
    beforeValidate: [computeName],
  },
  timestamps: true,
}
