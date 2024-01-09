import React from 'react'

const PageHeader = () => {
  return (
    <div className='flex gap-10 lg:gap-20 justify-between pt-2 mb-6 px-2 bg-black text-white'>
      <div className='flex gap-4 items-center flex-shrink-0'>
        BACK NAVIGATION
      </div>
      <div>
        LOGO HERE
      </div>
      <div>
        PROFILE HERE (WITH LOGIN/OUT)
      </div>
    </div>
  )
}

export default PageHeader
