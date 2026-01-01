import { groq } from 'next-sanity'

// Get all featured projects ordered by display order
export const projectsQuery = groq`*[_type == "project" && featured == true] | order(order asc) {
  _id,
  title,
  slug,
  category,
  description,
  thumbnail,
  images,
  liveUrl,
  technologies,
  order
}`

// Get all skills ordered by display order
export const skillsQuery = groq`*[_type == "skill"] | order(order asc) {
  _id,
  title,
  icon,
  description,
  order
}`

// Get all tech stack items ordered by display order
export const techStackQuery = groq`*[_type == "techStack"] | order(order asc) {
  _id,
  name,
  logo,
  order
}`

// Get all featured testimonials ordered by display order
export const testimonialsQuery = groq`*[_type == "testimonial" && featured == true] | order(order asc) {
  _id,
  name,
  role,
  company,
  image,
  testimonial,
  rating,
  order
}`

// Get single project by slug
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  description,
  thumbnail,
  images,
  liveUrl,
  technologies
}`