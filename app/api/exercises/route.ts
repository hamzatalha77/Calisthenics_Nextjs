import { NextResponse } from 'next/server'
import { fetchExercises } from '../../lib/data'
import slugify from 'slugify'
import { ObjectId } from 'mongodb'
import { exercises } from '../../lib/myconnexion'

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
  try {
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
      duration
    } = await req.json()

    const now = new Date()
    const exercise = {
      _id: new ObjectId(),
      slug: slugify(title),
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
      createdAt: now,
      updatedAt: now
    }

    await exercises.insertOne(exercise)

    return NextResponse.json(
      { message: 'Exercise created successfully', exercise },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating exercise:', error)

    return NextResponse.json(
      { message: 'Failed to create exercise', error: error.message },
      { status: 500 }
    )
  }
}
