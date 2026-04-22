import { type SchemaTypeDefinition } from 'sanity';
import spotlight from './schemas/spotlight';
import program from './schemas/program';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [spotlight, program],
};
