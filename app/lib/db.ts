import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

let client: MongoClient

const connectToMongo = async () => {
  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    await client.connect()
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    throw error
  }
}

const disconnectFromMongo = async () => {
  try {
    await client.close()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error.message)
    throw error
  }
}

// Ensure the connection is established when the module is loaded
connectToMongo()

const db = client.db()
const exercises = db.collection('exercises')
const categories = db.collection('categories')
const subcategories = db.collection('subcategories')
const users = db.collection('users')

// Process will exit if there's an unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  // Close MongoDB connection on unhandled rejection
  disconnectFromMongo().finally(() => process.exit(1))
})

export {
  client,
  connectToMongo,
  disconnectFromMongo,
  db,
  exercises,
  categories,
  subcategories,
  users
}
