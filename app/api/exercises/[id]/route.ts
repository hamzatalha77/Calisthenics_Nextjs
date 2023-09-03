import { exercises } from '../../../lib/db'
import Exercises from '../../../models/Exercises'

export async function PUT(req: Request, res: Response, { params }) {
  const { id } = params
  const {} = req.json()
}

export async function GET(req: Request, { params }) {
  const { id } = params

  await exercises.findOne({ _id: id })
}
