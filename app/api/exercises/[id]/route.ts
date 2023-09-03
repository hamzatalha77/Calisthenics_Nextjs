import { exercises } from '../../../lib/db'

export async function PUT(req: Request, res: Response, { params }) {
  const { id } = params
  const {} = req.json()
}

export async function GET(req: Request, { params }) {
  const { id } = params

  await exercises.insertOne(exercise)
}
