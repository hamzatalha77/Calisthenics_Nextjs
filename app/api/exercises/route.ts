import { NextResponse } from 'next/server'
import { exercises, db } from '../db'
import { fetchExercises } from '../../lib/data'

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

export async function POST(req: Request) {}
