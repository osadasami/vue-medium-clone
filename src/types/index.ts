export type User = {
  email: string
  username: string
  token: string
  bio: string
  image: string | null
}

export type Profile = {
  username: string
  bio: string
  image: string
  following: boolean
}

export type Article = {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Profile
}

export type Comment = {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: Profile
}

export type CredentialsLogin = {
  email: string
  password: string
}

export type CredentialsRegister = {
  email: string
  username: string
  password: string
}

export type Errors = {[key: string]: string[]}

export type UserResponse = {user: User}
