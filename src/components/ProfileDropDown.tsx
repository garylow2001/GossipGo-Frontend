import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { logout } from '../store/auth/authSlice';

interface ProfileDropDownProps {
    setIsDropDownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    pageHeaderProfileRef: React.RefObject<HTMLDivElement>;
}

const ProfileDropDown: React.FC<ProfileDropDownProps> = ({ setIsDropDownOpen, pageHeaderProfileRef }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            dispatch(logout());
        }
        setIsDropDownOpen(false);
    }
    const dropDownRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const clickOutsideDropdown = dropDownRef.current && !dropDownRef.current.contains(event.target as Node);
            const clickOnProfile = pageHeaderProfileRef.current && pageHeaderProfileRef.current.contains(event.target as Node);

            if (clickOnProfile) {
                setIsDropDownOpen(true);
                // This is to let the toggle logic in PageHeaderProfile.tsx override the mousedown event
            } else if (clickOutsideDropdown) {
                setIsDropDownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    });

    return (
        <div
            className='absolute top-0 right-0 mt-12 mr-2 p-2 bg-white rounded-md shadow-md border'
            ref={dropDownRef}
        >
            <div className='flex flex-col' role='list'>
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
            className='cursor-pointer hover:bg-secondary p-2 rounded-md'
        >
            {label}
        </div>
    )
}

export default ProfileDropDown
