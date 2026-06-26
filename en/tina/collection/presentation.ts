import type { Collection } from "tinacms";

const Presentation: Collection = {
  label: "Presentations",
  name: "presentation",
  path: "_presentations",
  format: "md",
  ui: {
    defaultItem: () => ({
      title: "Untitled Presentation",
      date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    }),
    filename: {
      slugify: (values) => {
        const d = (values?.date || "").toString().slice(0, 10);
        const t = (values?.title || "untitled")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return d ? `${d}-${t}` : t;
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "authors",
      label: "Authors",
    },
    {
      type: "string",
      name: "conference_name_date_and_place",
      label: "Conference name, date and place",
    },
    {
      type: "string",
      name: "title",
      label: "Title",
      required: true,
    },
    {
      type: "image",
      name: "file_url",
      label: "File URL",
    },
  ],
};

export default Presentation;
