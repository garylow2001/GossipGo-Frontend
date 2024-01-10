import React from 'react'
import { Link } from 'react-router-dom'
import CustomButton from '../components/CustomButton'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { logout } from '../store/auth/authSlice';

const PageHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      dispatch(logout());
    }
  }
  return (
    <div className='sticky top-0 z-20 flex gap-10 lg:gap-20 justify-between 
    pt-3 pb-3 px-2 bg-white text-black border-b border-gray-300 shadow-md'>
      <div className='flex gap-4 items-center flex-shrink-0'>
        BACK NAVIGATION
      </div>
      <div>
        LOGO HERE
      </div>
      <div>
        <Link to="/auth/login">
          <CustomButton>Login</CustomButton>
        </Link>
        <CustomButton onClick={handleLogout}>Logout</CustomButton>
      </div>
    </div>
  )
}

export default PageHeader
