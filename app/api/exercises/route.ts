import cloudinary from 'cloudinary'
import { NextResponse } from 'next/server'
import { createExercise, fetchExercises } from '../../lib/data'
import slugify from 'slugify'
import { ObjectId } from 'mongodb'
import formidable from 'formidable'

;(cloudinary as any).config({
  cloud_name: 'dodxmvtfr',
  api_key: '643979424287564',
  api_secret: '3V_VXb4vQCJdvLRoKJyOKntBT8E'
})

type Data = {
  name: string
}

export async function GET(req: Request, res: Response) {
  try {
    const exercisesData = await fetchExercises()
    return NextResponse.json(
      { message: 'ok', exercises: exercisesData },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}

export async function POST(req: Request, res: Response) {
  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return NextResponse.json(
        { message: 'Error', error: err },
        { status: 500 }
      )
    }
    const {
      title,
      description,
      images,
      video,
      tags,
      muscles,
      technique,
      reps,
      sets,
      duration,
      category,
      subcategories
    } = await req.json()

    try {
      const now = new Date()
      const exercise = {
        _id: new ObjectId(),
        slug: slugify(title),
        title,
        description,
        images: [],
        video,
        tags,
        muscles,
        technique,
        reps,
        sets,
        duration,
        category,
        subcategories,
        createdAt: now,
        updatedAt: now
      }

      const uploadedImages = []
      const fileKeys = Object.keys(files)

      for (const key of fileKeys) {
        const file = files[key]
        const result = await cloudinary.v2.uploader.upload(file.path)
        uploadedImages.push(result.secure_url)
      }

      exercise.images = uploadedImages

      await createExercise(exercise)

      return NextResponse.json({ message: 'OK', exercise }, { status: 201 })
    } catch (error) {
      return NextResponse.json({ message: 'Error', error }, { status: 500 })
    }
  })
}
