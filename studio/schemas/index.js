export default {
  name: "index",
  title: "Page d'accueil",
  type: "document",

  fields: [
    {
      name: "intro_paragraph",
      title: "Paragraphe de présentation",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    prepare() {
      return {
        title: "Contenu page d'accueil",
      };
    },
  },
};
