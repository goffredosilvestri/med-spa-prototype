import { defineType, defineField } from "sanity"

export const treatment = defineType({
    name: "treatment",
    title: "Treatment",
    type: "document",
    fields: [
        defineField({
            name: "id",
            type: "string",
            title: "ID",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "name",
            type: "string",
            title: "Name",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "tagline",
            type: "string",
            title: "Tagline",
        }),
        defineField({
            name: "description",
            type: "text",
            title: "Description",
        }),
        defineField({
            name: "duration",
            type: "string",
            title: "Duration",
        }),
        defineField({
            name: "price",
            type: "number",
            title: "Price",
        }),
        defineField({
            name: "image",
            type: "image",
            title: "Image",
            options: {
                hotspot: true,
            },
        }),
    ],
})
