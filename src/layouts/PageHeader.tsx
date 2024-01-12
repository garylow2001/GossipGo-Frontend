import React from 'react'
import PageHeaderLogo from '../components/PageHeaderLogo';
import PageHeaderProfile from '../components/PageHeaderProfile';

const PageHeader = () => {
  return (
    <div className='sticky top-0 z-20 flex gap-10 lg:gap-20 justify-between 
    pt-3 pb-3 px-2 bg-white text-black border-b border-gray-300 shadow-md'>
      <PageHeaderLogo />
      <PageHeaderProfile />
    </div >
  )
}

export default PageHeader
