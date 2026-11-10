import type { Collection } from "tinacms"

const Video: Collection = {
  defaultItem: () => ({
    layout: "post",
  }),
  label: "Video",
  name: "video",
  path: "_videos",
  format: "md",
  ui: {
    filename: {
      slugify: (values) => {
        const date = values?.date ? new Date(values.date) : new Date()
        const dateString = date.toISOString().split("T")[0]
        const title = (values?.title || "untitled")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return `${dateString}-${title}`;
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "layout",
      label: "Layout",
      ui: {
        component: null, // hidden
      },
    },
    {
      type: "string",
      name: "title",
      label: "Title",
      required: true,
    },
    {
      type: "rich-text",
      name: "body",
      isBody: true,
      label: "Body",
    },
    {
      type: "image",
      name: "file_url",
      label: "File URL",
    },
  ]
}

export default Video