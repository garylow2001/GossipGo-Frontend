import React, { useState } from 'react';
import Modal from 'react-modal';
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';

interface AuthPopupProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, onRequestClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    const handleToggleForm = () => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    zIndex: 9999, // Set a high z-index value
                },
                content: {
                    width: '500px',
                    height: '500px',
                    margin: 'auto',
                },
            }}
        >
            <div className='absolute top-2 right-4'>
                <button onClick={onRequestClose} className='text-2xl'>x</button>
            </div>
            {isLogin ? (
                <LoginPopup
                    isOpen={isOpen}
                    onRequestClose={onRequestClose}
                    onToggleForm={handleToggleForm}
                />
            ) : (
                <SignupPopup
                    isOpen={isOpen}
                    onRequestClose={onRequestClose}
                    onToggleForm={handleToggleForm}
                />
            )}
        </Modal>
    );
};

export default AuthPopup;
