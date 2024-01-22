'use client'
import React, { useEffect, useState } from 'react'
import { Exercise } from '../../../types'

const getExercises = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/exercises', {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { exercises } = await getExercises()
        setExercises(exercises)
      } catch (error) {
        console.error('Error loading Data', error)
      }
    }
    fetchData()
  }, [])

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
                        <a
                          href="#"
                          className="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                        <a
                          href="#"
                          className="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Delete
                        </a>
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
