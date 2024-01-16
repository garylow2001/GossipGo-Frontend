import React from 'react'
import { threadCategories } from '../utils/utils'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { fetchThreadList } from '../store/threads/threadListSlice';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleGetRecent = () => {
    dispatch(fetchThreadList({ option: 'recent' }));
  }

  const handleGetCategory = (category: string) => {
    dispatch(fetchThreadList({ option: category }));
  }
  return (
    <aside className='fixed h-screen w-32 overflow-y-auto hidden-scrollbar flex flex-col px-1 pt-6 border-r bg-gray-100 border-gray-300'>
      <p>---SIDEBAR---</p>
      <div className='flex flex-col my-20 space-between gap-20 pb-20'>
        <SideBarElement label='Recent' onClick={handleGetRecent} />
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
