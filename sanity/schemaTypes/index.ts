import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import skill from './skill'
import techStack from './techStack'
import testimonial from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, skill, techStack, testimonial],
}
