import { NextResponse } from 'next/server'
import { createExercise, fetchExercises } from '../../lib/data'
import slugify from 'slugify'
import { ObjectId } from 'mongodb'
import { exercises } from '../../lib/db'

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

    await exercises.insertOne(exercise)

    return NextResponse.json({ message: 'OK', exercise }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    await exercises.exercise.delete({
      where: { id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error: any) {
    if (error.code === 'P2025') {
      let error_response = {
        status: 'fail',
        message: 'No Feedback with the Provided ID Found'
      }
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    let error_response = {
      status: 'error',
      message: error.message
    }
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
