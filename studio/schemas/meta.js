export default {
  name: "meta",
  title: "Metadonnées",
  type: "document",

  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    prepare() {
      return {
        title: "Métadonnées",
      };
    },
  },
};
