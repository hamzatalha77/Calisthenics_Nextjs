import mongoose, { Schema } from 'mongoose'

const ExercisesSchema = new Schema(
  {
    title: String,
    description: String
  },
  {
    timestamps: true
  }
)

const Exercises =
  mongoose.models.Exercises || mongoose.model('Exercises', ExercisesSchema)

export default Exercises
