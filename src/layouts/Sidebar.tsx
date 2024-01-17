import React from 'react'
import { threadCategories } from '../utils/utils'
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleGetRecent = () => {
    navigate('/threads/sort/recent');
  }

  const handleGetPopular = () => {
    navigate('/threads/sort/popular');
  }

  const handleGetCategory = (category: string) => {
    navigate(`/threads/category/${category}`);
  }
  return (
    <aside className='fixed h-screen w-32 overflow-y-auto hidden-scrollbar flex flex-col px-1 pt-6 border-r bg-gray-100 border-gray-300'>
      <div className='flex flex-col mb-20 space-between gap-5 pb-10'>
        <p className='font-bold'>New/Hot</p>
        <SideBarElement label='Trending' onClick={handleGetPopular} />
        <SideBarElement label='Recent' onClick={handleGetRecent} />
        <hr className='border-gray-300' />
        <p className='font-bold'>Categories</p>
        {threadCategories.map((category, index) => (
          <SideBarElement key={index} label={category} onClick={() => handleGetCategory(category)} />
        ))}
      </div>
    </aside>
  )
}

interface SideBarElementProps {
  label: string;
  onClick: () => void;
}

const SideBarElement: React.FC<SideBarElementProps> = ({ label, onClick }) => {
  return <div onClick={onClick} className='cursor-pointer hover:bg-gray-200 p-2 rounded-md'>
    <p>{label}</p>
  </div>
}

export default Sidebar
