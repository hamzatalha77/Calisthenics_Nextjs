import { NextResponse } from 'next/server'
import { connectToMongo, users } from '../../lib/myconnexion'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'

export const POST = async (request: any) => {
  const { username, email, password, avatar } = await request.json()

  await connectToMongo()

  const existingUser = await users.findOne({ email })

  if (existingUser) {
    return new NextResponse('Email already in use', { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 5)
  const now = new Date()
  const user = {
    _id: new ObjectId(),
    username,
    email,
    avatar,
    password: hashedPassword,
    createdAt: now,
    updatedAt: now
  }

  try {
    await users.insertOne(user)
    return new NextResponse('user is registered', { status: 200 })
  } catch (error) {
    return new NextResponse(error, {
      status: 500
    })
  }
}
