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
  createdAt: Date
  updatedAt: Date
}

const fetchExercises = async () => {
  const exerciseDocuments = await exercises.find().toArray()
  return exerciseDocuments
}

const createExercise = async (exercise: Exercise) => {
  const now = new Date()
  exercise.createdAt = now
  exercise.updatedAt = now
  await exercises.insertOne(exercise)
}
const updateExercise = async (
  exerciseId: string,
  updates: Partial<Exercise>
) => {
  const now = new Date()
  const updateObj = {
    $set: {
      updatedAt: now,
      ...updates
    }
  }

  const filter = { _id: ObjectId.createFromHexString(exerciseId) }

  await exercises.updateOne(filter, updateObj)
}

export { fetchExercises, createExercise, updateExercise }
