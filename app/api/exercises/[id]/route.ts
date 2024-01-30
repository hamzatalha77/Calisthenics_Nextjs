import { NextRequest, NextResponse } from 'next/server'
import { exercises } from '../../../lib/myconnexion'
import { ObjectId } from 'mongodb'
import slugify from 'slugify'

export const GET = async (request: NextRequest, { params }: any) => {
  const { id } = params
  try {
    const post = await exercises.findOne({ _id: new ObjectId(id) })

    if (!post) {
      return new NextResponse('Exercise not found', { status: 404 })
    }

    return new NextResponse(JSON.stringify(post), { status: 200 })
  } catch (err) {
    console.error('Database Error:', err.message)
    return new NextResponse('Database Error!', { status: 500 })
  }
}

export const PUT = async (request: NextRequest, { params }: any) => {
  const { id } = params
  const updatedData = await request.json()

  try {
    const currentExercise = await exercises.findOne({ _id: new ObjectId(id) })

    if (!currentExercise) {
      return new NextResponse('Exercise not found', { status: 404 })
    }

    const updateObject = {
      $set: {
        updatedAt: new Date()
      }
    }

    for (const key in updatedData) {
      if (updatedData.hasOwnProperty(key)) {
        updateObject.$set[key] = updatedData[key]
      }
    }

    const updatedExercise = await exercises.findOneAndUpdate(
      { _id: new ObjectId(id) },
      updateObject,
      { returnDocument: 'after' }
    )

    if (!updatedExercise.value) {
      return new NextResponse('Exercise not found', { status: 404 })
    }

    if (updatedData.title && updatedData.title !== currentExercise.title) {
      const newSlug = slugify(updatedData.title)
      await exercises.updateOne(
        { _id: new ObjectId(id) },
        { $set: { slug: newSlug } }
      )
      updatedExercise.value.slug = newSlug
    }

    const response = {
      message: 'Exercise has been updated',
      exercise: updatedExercise.value
    }

    return new NextResponse(JSON.stringify(response), { status: 200 })
  } catch (err) {
    console.error('Error in PUT request:', err)
    return new NextResponse('Database Error!', { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const result = await exercises.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 1) {
      return new NextResponse(null, {
        status: 204,
        statusText: 'The Exercise Has Been Deleted'
      })
    } else {
      let error_response = {
        status: 'fail',
        message: 'No document with the provided ID found'
      }
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  } catch (error: any) {
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
// export async function PUT(req: Request, res: Response, { params }) {
//   try {
//     const {
//       _id,
//       title,
//       description,
//       images,
//       video,
//       tags,
//       muscles,
//       technique,
//       reps,
//       sets,
//       duration
//     } = await req.json()
//     if (!_id) {
//       return NextResponse.json(
//         { message: '_id is required for updating the exercise' },
//         { status: 400 }
//       )
//     }
//     const existingExercise = await exercises.findOne({
//       _id: new ObjectId(_id)
//     })
//     if (!existingExercise) {
//       return NextResponse.json(
//         { message: 'Exercise is not found', _id },
//         { status: 400 }
//       )
//     }
//     existingExercise.title = title
//     existingExercise.description = description
//     existingExercise.images = images
//     existingExercise.video = video
//     existingExercise.tags = tags
//     existingExercise.muscles = muscles
//     existingExercise.technique = technique
//     existingExercise.reps = reps
//     existingExercise.sets = sets
//     existingExercise.duration = duration
//     existingExercise.updatedAt = new Date()

//     await exercises.updateOne(
//       { _id: new ObjectId(_id) },
//       { $set: existingExercise }
//     )
//     return NextResponse.json(
//       { message: 'Exercise updated Successfully', exercise: existingExercise },
//       { status: 200 }
//     )
//   } catch (error) {
//     console.error('error updating exercise:', error)
//     return NextResponse.json(
//       {
//         message: 'Failed to update exercise',
//         error: error.message
//       },
//       { status: 500 }
//     )
//   }
// }
