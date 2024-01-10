import React from 'react'

const Sidebar: React.FC = () => {
  return (
    <aside className='fixed h-screen w-32 overflow-y-auto hidden-scrollbar flex flex-col px-1 pt-6 border-r bg-gray-100 border-gray-300'>
      <p>---SIDEBAR---</p>
      <div className='flex flex-col my-20 space-between gap-40'>
        <p>Home</p>
        <p>Popular</p>
        <p>Recent</p>
        <p>Community</p>
        <p>About</p>
      </div>
    </aside>
  )
}

export default Sidebar
