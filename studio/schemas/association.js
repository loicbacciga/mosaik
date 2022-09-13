export default {
    name: "association",
    title: "Page association",
    type: "document",
  
    fields: [
      {
        name: "about",
        title: "A propos",
        type: "array",
        of: [{ type: "block" }],
        validation: (Rule) => Rule.required(),
      },
    ],
  
    preview: {
      prepare() {
        return {
          title: "Contenu page association",
        };
      },
    },
  };
  