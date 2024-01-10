import React from 'react'

const Sidebar: React.FC = () => {
  return (
    <aside className='sticky top-0 bg-gray-100 flex flex-col px-1 pt-6 border-r border-black'>
      <p>-----SIDEBAR------</p>
      <p>Home</p>
      <p>Popular</p>
      <p>Recent</p>
      <p>Community</p>
      <p>About</p>
    </aside>
  )
}

export default Sidebar
