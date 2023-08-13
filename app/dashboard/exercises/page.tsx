import React, { ComponentPropsWithRef } from 'react'
type Props = ComponentPropsWithRef<'input'>
const CreateExerciseScreen = (props: Props) => {
  return (
    <div>
      <h1>Create Exercise</h1>
      <input {...props} type="file" multiple />
    </div>
  )
}

export default CreateExerciseScreen
