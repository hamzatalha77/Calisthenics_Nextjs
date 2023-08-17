import { NextResponse } from 'next/server'
import { createExercise, fetchExercises, updateExercise } from '../../lib/data'
import slugify from 'slugify'
import { ObjectId } from 'mongodb'

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
      images,
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

    await createExercise(exercise)

    return NextResponse.json({ message: 'OK', exercise }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}
export async function PUT(req: Request, res: Response) {
  const { exerciseId, updates } = await req.json()

  try {
    await updateExercise(exerciseId, updates)

    return NextResponse.json(
      { message: 'Exercise updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}
