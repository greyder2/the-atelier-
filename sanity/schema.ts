import { type SchemaTypeDefinition } from 'sanity'
import spotlight from './schemas/spotlight'
import program from './schemas/program'
import booking from './schemas/booking'
import client from './schemas/client'
import professor from './schemas/professor'
import lesson from './schemas/lesson'
import company from './schemas/company'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [spotlight, program, booking, client, professor, lesson, company],
}