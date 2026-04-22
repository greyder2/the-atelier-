import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from '../env'

// This client has write permissions. 
// Sensitive: Use only on the server, never on the client.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token: process.env.SANITY_API_WRITE_TOKEN,
})
