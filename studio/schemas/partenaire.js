export default {
  name: 'partenaire',
  title: 'Partenaire',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image.asset',
    },
  },
}
