import mongoose, { Schema } from 'mongoose'

const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.models.Users || mongoose.model('Users', usersSchema)
