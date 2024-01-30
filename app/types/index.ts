import { ObjectId } from 'mongodb'

export type Exercise = {
  _id: ObjectId
  title: string
  description: string
  images: string[]
  video: string
  tags: string[]
  muscles: string[]
  technique: string
  reps: number
  sets: number
  duration: number
  category: string
  subcategories: string[]
  createdAt: Date
  updatedAt: Date
}
export type User = {
  _id: ObjectId
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export type SideNavItem = {
  title: string
  path: string
  icon?: JSX.Element
  submenu?: boolean
  subMenuItems?: SideNavItem[]
}
