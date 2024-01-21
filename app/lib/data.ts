import { exercises } from './db'
import { Exercise } from '../types/types'

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
const updateExercise = async (exercise: Exercise) => {
  const now = new Date()
  exercise.createdAt = now
  exercise.updatedAt = now
  await exercises.insertOne(exercise)
}

export { fetchExercises, createExercise, updateExercise }
