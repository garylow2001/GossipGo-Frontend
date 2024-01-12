import React from 'react'
import { RootState } from '../store/store';
import ProfileDropDown from '../components/ProfileDropDown';
import { useSelector } from 'react-redux';
import AuthPopup from '../popups/AuthPopup';

const PageHeaderProfile = () => {
    const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);
    const [isAuthPopupOpen, setisAuthPopupOpen] = React.useState(false);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const pageHeaderProfileRef = React.useRef<HTMLDivElement>(null);
    const user = useSelector((state: RootState) => state.user);
    const username = user.currentUser?.username;

    const toggleDropdown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    const toggleAuthPopup = () => {
        setisAuthPopupOpen(!isAuthPopupOpen);
    }

    const handleProfileClick = (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation();
        isLoggedIn ? toggleDropdown() : toggleAuthPopup();
    }

    const profileTitle = isLoggedIn ? 'Profile' : 'Login';
    return (
        <div className='flex items-center'>
            <p className='text-lg mx-2 mt-1'>{username}</p>
            <div className='relative container' ref={pageHeaderProfileRef}>
                <img
                    src="/blankprofile.png"
                    alt="Profile"
                    className="w-10 h-10 object-cover rounded-full cursor-pointer"
                    onClick={handleProfileClick}
                    title={profileTitle}
                />

                {isDropDownOpen && (
                    <div>
                        < ProfileDropDown
                            setIsDropDownOpen={setIsDropDownOpen}
                            pageHeaderProfileRef={pageHeaderProfileRef}
                        />
                    </div>
                )}

                {isAuthPopupOpen && (
                    <AuthPopup isOpen={isAuthPopupOpen} onRequestClose={toggleAuthPopup} />
                )}
            </div>
        </div>
    )
}

export default PageHeaderProfile
