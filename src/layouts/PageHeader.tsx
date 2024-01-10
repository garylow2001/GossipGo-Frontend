import React from 'react'

const PageHeader = () => {
  return (
    <div className='sticky top-0 z-20 flex gap-10 lg:gap-20 justify-between pt-3 pb-3 px-2 bg-white text-black border-b border-black'>
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
