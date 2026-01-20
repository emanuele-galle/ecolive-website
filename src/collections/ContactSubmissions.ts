import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'email',
    group: 'Form',
    defaultColumns: ['nome', 'email', 'createdAt', 'status'],
    description: 'Richieste di contatto ricevute dal sito',
  },
  access: {
    // Solo admin possono vedere le submissions
    read: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'admin' || user.role === 'editor'
    },
    // Nessuno può creare da admin (solo da frontend)
    create: () => true, // API pubblica per il form
    update: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'admin'
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'admin'
    },
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      label: 'Nome e Cognome',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'telefono',
      type: 'text',
      label: 'Telefono',
    },
    {
      name: 'messaggio',
      type: 'textarea',
      label: 'Messaggio',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Stato',
      defaultValue: 'nuovo',
      options: [
        { label: 'Nuovo', value: 'nuovo' },
        { label: 'In lavorazione', value: 'in-lavorazione' },
        { label: 'Completato', value: 'completato' },
        { label: 'Spam', value: 'spam' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'note',
      type: 'textarea',
      label: 'Note interne',
      admin: {
        position: 'sidebar',
        description: 'Note visibili solo agli admin',
      },
    },
    {
      name: 'source',
      type: 'text',
      label: 'Pagina di origine',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      label: 'Indirizzo IP',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    // Configuratore casa - campi extra
    {
      name: 'configurazione',
      type: 'group',
      label: 'Configurazione Casa',
      admin: {
        condition: (data) => data?.source === '/configuratore',
      },
      fields: [
        {
          name: 'tipoCasa',
          type: 'select',
          label: 'Tipo Casa',
          options: [
            { label: 'Casa 1 Piano', value: '1-piano' },
            { label: 'Casa 2 Piani', value: '2-piani' },
          ],
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'numStanze',
          type: 'number',
          label: 'Numero Camere',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'metratura',
          type: 'number',
          label: 'Metratura (mq)',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
  timestamps: true,
}
