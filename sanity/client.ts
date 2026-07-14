import { createClient } from "next-sanity"
import { projectId, dataset, apiVersion } from "./env"

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to true for production if no revalidation logic is needed
})
