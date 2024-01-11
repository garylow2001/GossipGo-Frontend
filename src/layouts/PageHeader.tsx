import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomButton from '../components/CustomButton'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { logout } from '../store/auth/authSlice';

const PageHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/auth/login');
  }

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      dispatch(logout());
    }
  }

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div className='sticky top-0 z-20 flex gap-10 lg:gap-20 justify-between 
    pt-3 pb-3 px-2 bg-white text-black border-b border-gray-300 shadow-md'>
      <div className='flex gap-4 items-center flex-shrink-0'>
        <img
          src="/logo_transparent.png"
          alt="Logo"
          className="w-20 h-20 ml-5 object-cover object-top rounded-full"
        />
      </div>
      <div className='flex items-center'>
        <div className='relative container'>
          <img
            src="/blankprofile.png"
            alt="Profile"
            className="w-10 h-10 object-cover rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropDownOpen && (
            <div className='absolute top-0 right-0 mt-16 mr-5 bg-white rounded-md shadow-md'>
              <CustomButton onClick={handleNavigateToLogin}>Login</CustomButton>
              <CustomButton onClick={handleLogout}>Logout</CustomButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageHeader
