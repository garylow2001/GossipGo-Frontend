import React from 'react'

interface ProfileDropDownProps {
    handleLogout: () => void;
}

const ProfileDropDown: React.FC<ProfileDropDownProps> = ({ handleLogout }) => {
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
