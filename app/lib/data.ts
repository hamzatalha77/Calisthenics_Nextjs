import { ObjectId } from 'mongodb'
import { exercises } from '../api/db'

type Exercise = {
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
}

const fetchExercises = async () => {
  const exerciseDocuments = await exercises.find().toArray()
  return exerciseDocuments
}

const createExercise = async (exercise: Exercise) => {
  await exercises.insertOne(exercise)
}

export { fetchExercises, createExercise }
