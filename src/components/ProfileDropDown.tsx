import React from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { logout } from '../store/auth/authSlice';

interface ProfileDropDownProps {
    setIsDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileDropDown: React.FC<ProfileDropDownProps> = ({ setIsDropDownOpen }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            dispatch(logout());
        }
        setIsDropDownOpen(false);
    }

    return (
        <div className='absolute top-0 right-0 mt-12 mr-2 p-2 bg-white rounded-md shadow-md border'>
            <div className='flex flex-col' role='list'>
                <ProfileDropDownElement label='Profile' onClick={() => { }} />
                <ProfileDropDownElement label='Settings' onClick={() => { }} />
                <ProfileDropDownElement label='Logout' onClick={handleLogout} />
            </div>
        </div>
    )
}

interface ProfileDropDownElementProps {
    label: string;
    onClick: () => void;
}

const ProfileDropDownElement: React.FC<ProfileDropDownElementProps> = ({ label, onClick }) => {
    return (
        <div
            role='listitem'
            onClick={onClick}
            className='cursor-pointer hover:bg-gray-200 p-2 rounded-md'
        >
            {label}
        </div>
    )
}

export default ProfileDropDown
