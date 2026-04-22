import { type SchemaTypeDefinition } from 'sanity'
import spotlight from './schemas/spotlight'
import program from './schemas/program'
import booking from './schemas/booking'
import client from './schemas/client'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [spotlight, program, booking, client],
}
