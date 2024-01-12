import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store/store';
import ProfileDropDown from '../components/ProfileDropDown';
import { useSelector } from 'react-redux';

const PageHeader = () => {
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleNavigateToLogin = () => {
    navigate('/auth/login');
  }

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleProfileClick = () => {
    isLoggedIn ? toggleDropdown() : handleNavigateToLogin();
  }

  const profileTitle = isLoggedIn ? 'Profile' : 'Login';

  return (
    <div className='sticky top-0 z-20 flex gap-10 lg:gap-20 justify-between 
    pt-3 pb-3 px-2 bg-white text-black border-b border-gray-300 shadow-md'>
      <div className='flex gap-4 items-center flex-shrink-0'>
        <img
          src="/logo_transparent.png"
          alt="Logo"
          className="w-20 h-20 ml-5 object-cover object-top rounded-full"
        />
        <p>
          Connecting Conversations, Spreading Stories
        </p>
      </div>
      <div className='flex items-center'>
        <div className='relative container'>
          <img
            src="/blankprofile.png"
            alt="Profile"
            className="w-10 h-10 object-cover rounded-full cursor-pointer"
            onClick={handleProfileClick}
            title={profileTitle}
          />
          {isDropDownOpen && (
            <div>
              < ProfileDropDown setIsDropDownOpen={setIsDropDownOpen} />
            </div>
          )}
        </div>
      </div>
    </div >
  )
}

export default PageHeader
