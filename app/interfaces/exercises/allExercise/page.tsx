'use client'
import { useEffect, useState } from 'react'
import { Exercise } from '../../../types'
import { useRouter } from 'next/navigation'

const getExercises = async () => {
  try {
    const res = await fetch('/api/exercises', {
      cache: 'no-store'
    })
    if (!res.ok) {
      throw new Error('failed to fetch your data')
    }
    return res.json()
  } catch (error) {
    console.log('Error loading Data', error)
    throw error
  }
}

export default function ExercisesList() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const fetchData = async () => {
    try {
      const { exercises } = await getExercises()
      setExercises(exercises)
    } catch (error) {
      console.error('Error loading Data', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: any) => {
    setIsDeleting(true)
    try {
      await fetch(`/api/exercises/${id}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(false)
      fetchData()
    }
  }
  const handleEdit = async (exercise: Exercise) => {
    router.push(`/interfaces/exercises/editExercise?id=${exercise._id}`)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Exercise Title
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Exercise Video
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Exercise Description
                    </th>
                    <th scope="col" className="p-4">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="p-4">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {exercises.map((exercise) => (
                    <tr
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      key={exercise._id.toString()}
                    >
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {exercise.title}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {exercise.video}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {exercise.description}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(exercise)}
                          className="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                        {!isDeleting ? (
                          <button
                            onClick={() => handleDelete(exercise._id)}
                            className="text-blue-600 dark:text-blue-500 hover:underline "
                          >
                            Delete
                          </button>
                        ) : (
                          <a className="text-blue-600 dark:text-blue-500 hover:underline">
                            Deleting...
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
