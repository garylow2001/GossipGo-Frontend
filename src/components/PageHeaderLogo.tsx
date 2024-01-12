import React from 'react'
import { useNavigate } from 'react-router-dom';

const PageHeaderLogo = () => {
    const navigate = useNavigate();
    const handleNavigateToHome = () => {
        navigate('/');
    }
    return (
        <div
            className='flex gap-4 items-center flex-shrink-0 hover:cursor-pointer'
            onClick={handleNavigateToHome}
            title='Homepage'
        >
            <img
                src="/logo_transparent.png"
                alt="Logo"
                className="w-20 h-20 ml-5 object-cover object-top rounded-full"
            />
            <p>
                Connecting Conversations, Spreading Stories
            </p>
        </div>
    )
}

export default PageHeaderLogo
