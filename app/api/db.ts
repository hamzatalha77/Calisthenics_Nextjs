import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

let client: MongoClient
if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}
client = new MongoClient(uri)
const clientPromise = await client.connect()

const db = clientPromise.db()
const exercises = db.collection('exercises')
const categories = db.collection('categories')
const subcategories = db.collection('subcategories')
const users = db.collection('users')
export { db, exercises, categories, subcategories, users }
