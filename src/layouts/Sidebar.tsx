import React from 'react'

const Sidebar: React.FC = () => {
  return (
    <aside className='fixed h-screen w-32 overflow-y-auto hidden-scrollbar flex flex-col px-1 pt-6 border-r bg-gray-100 border-black'>
      <p>-----SIDEBAR------</p>
      <div className='flex flex-col my-20'>
        <p className='my-20'>Home</p>
        <p className='my-20'>Popular</p>
        <p className='my-20'>Recent</p>
        <p>Community</p>
        <p>About</p>
      </div>
    </aside>
  )
}

export default Sidebar
