import type { CollectionConfig } from 'payload'

export const WebServiceUsers: CollectionConfig = {
  slug: 'webServiceUsers',
  auth: {
    useAPIKey: true,
  },
  fields: [
    {
      name: 'isAdmin',
      type: 'checkbox',
    },
  ],
  timestamps: true,
}
