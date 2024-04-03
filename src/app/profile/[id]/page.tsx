import React from 'react'

 const page = ({params}:any) => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h1>profile page</h1>
      <h2 className='bg-orange-400 text-black'>{params.id}</h2>
    </div>
  )
}

export default page;