import mongoose, { Schema } from 'mongoose'

const ExercisesSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: [{ type: String, required: true }],
    video: {
      type: String,
      required: true
    },
    tags: [
      {
        type: String,
        required: true
      }
    ],
    muscles: [
      {
        type: String,
        required: true
      }
    ],
    technique: {
      type: String,
      required: true
    },
    reps: {
      type: String,
      required: true
    },
    sets: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const ExercisesModel =
  mongoose.models.Exercises || mongoose.model('Exercises', ExercisesSchema)

export default ExercisesModel
