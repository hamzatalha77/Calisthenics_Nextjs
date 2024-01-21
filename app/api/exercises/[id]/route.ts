import { NextResponse } from 'next/server'
import { exercises } from '../../../lib/db'
import { ObjectId } from 'mongodb'

// export async function PUT(req: Request, res: Response, { params }) {
//   const { id } = params
//   const {} = req.json()
// }

// export async function GET(req: Request, { params }) {
//   const { id } = params

//   await exercises.findOne({ _id: id })
//   return NextResponse.json({ exercises }, { status: 200 })
// }
export async function DELETE(
  request: Request,
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
