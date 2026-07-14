import { defineType, defineField } from "sanity"

export const pricingPackage = defineType({
    name: "pricingPackage",
    title: "Pricing Package",
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
            name: "price",
            type: "number",
            title: "Price",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "features",
            type: "array",
            title: "Features",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "isPopular",
            type: "boolean",
            title: "Is Popular",
            initialValue: false,
        }),
    ],
})
