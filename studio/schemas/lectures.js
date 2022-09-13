export default {
  name: "lecture",
  title: "Cours",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_content",
      title: "Texte court pour la page d'accueil",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "long_content",
      title: "Texte explicatif de ce qu'on fait",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "partenaires",
      title: "Partenaires",
      type: "array",
      of: [{ type: "reference", to: [{ type: "partenaire" }] }],
    },
  ],
};
