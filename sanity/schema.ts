import { type SchemaTypeDefinition } from "sanity"
import { treatment } from "./schemas/treatment"
import { pricingPackage } from "./schemas/package"

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [treatment, pricingPackage],
}
