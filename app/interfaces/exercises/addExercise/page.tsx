'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { SyntheticEvent, ComponentPropsWithRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = ComponentPropsWithRef<'input'>

const CreateExerciseScreen = (props: Props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [video, setVideo] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [muscles, setMuscles] = useState<string[]>([])
  const [technique, setTechnique] = useState('')
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')
  const [duration, setDuration] = useState('')
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const router = useRouter()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      const imagesUrls = await imageUpload()
      fetch('http://localhost:3000/api/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          images: imagesUrls,
          video,
          tags,
          muscles,
          technique,
          reps,
          sets,
          duration
        })
      })
      toast.success('Exercise added successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
      setTimeout(() => {
        router.push('/interfaces/exercises/allExercise')
      }, 1000) // Adjust the delay as needed
    } catch (error) {
      toast.error('Failed to add exercise. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }
  }

  const imageUpload = async () => {
    const imageUrls: string[] = []

    for (const image of images) {
      const data = new FormData()
      data.append('file', image)
      data.append('upload_preset', 'caliupload')
      data.append('cloud_name', 'dodxmvtfr')

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dodxmvtfr/image/upload',
        {
          method: 'POST',
          body: data
        }
      )

      const res2 = await res.json()
      imageUrls.push(res2.url)
    }

    return imageUrls
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = e.target.files
    setImages([...selectedImages])

    const previews = Array.from(selectedImages).map((image) =>
      URL.createObjectURL(image)
    )
    setImagePreviews(previews)
  }

  return (
    <div>
      <h1 className="text-center text-6xl">Create Exercise</h1>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="title">
                title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="video">
                Video Url
              </label>
              <input
                id="video"
                type="text"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="technique"
              >
                Technique
              </label>
              <input
                id="technique"
                type="text"
                value={technique}
                onChange={(e) => setTechnique(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="tags">
                Tags
              </label>
              <input
                id="tags"
                type="text"
                value={tags.join(',')}
                onChange={(e) => setTags(e.target.value.split(','))}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="muscles"
              >
                Muscles
              </label>
              <input
                id="muscles"
                type="text"
                value={muscles.join(',')}
                onChange={(e) => setMuscles(e.target.value.split(','))}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="reps">
                Reps
              </label>
              <input
                id="Reps"
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="sets">
                Sets
              </label>
              <input
                id="sets"
                type="number"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="duration"
              >
                Duration
              </label>
              <input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Description
              </label>
              <textarea
                id="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Images
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {imagePreviews.map((preview, index) => (
                  <Image
                    width={60}
                    height={60}
                    key={index}
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-16 h-16 object-cover mr-2"
                  />
                ))}
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className="">Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
      </section>
      <ToastContainer />
    </div>
  )
}

export default CreateExerciseScreen
