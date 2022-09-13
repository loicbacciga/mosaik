const postFields = `
  _id,
  name,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

const lectureFields = `
  _id,
  title,
  "slug": slug.current
`

export const indexInfoQuery = `
*[_type == "index"] [0] { intro_paragraph }
`

// LECTURES
export const homeLecturesQuery = `
*[_type == "lecture"]{ title, "slug": slug.current, short_content, _id }
`

export const lectureSlugsQuery = `
*[_type == "lecture" && defined(slug.current)][].slug.current
`

export const lectureQuery = `
*[_type == "lecture" && slug.current == $slug] [0] {
    title, "slug": slug.current, long_content, partenaires, _id
}`

export const lectureBySlugQuery = `
*[_type == "lecture" && slug.current == $slug][0] {
  "slug": slug.current
}
`

// PARTENAIRES
export const partenairesQuery = `
*[_type == "partenaire"] { name, image, _id }
`

// ASSOCIATION
export const associationQuery = `
*[_type == "association"] [0] { about }
`

// EQUIPE
export const equipeQuery = `
*[_type == "equipe"]{ name, role, image }
`

// METADATA
export const metadataQuery = `
*[_type == "meta"] [0] { logo }`



export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`
