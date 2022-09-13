interface HomeLecture {
  title: string,
  slug: string,
  short_content: any,
  _id: string,
}

interface AllLecture {
  title: string,
  slug: string,
  long_content: any,
  partenaires?: Ref[]
}

interface Partenaire {
  _id: string,
  image: any,
  name: string
}

interface Ref {
  _ref: string
}

interface IndexInfo {
  intro_paragraph: any
}

interface AssociationInfo {
  about: any
}

interface Equipe {
  name: string,
  role: string,
  image: any
}
