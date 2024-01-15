import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { login } from '../store/auth/authSlice';
import CustomButton from '../components/CustomButton';
import PageTitle from '../components/PageTitle';

interface LoginFormData {
    username: string;
    password: string;
}

interface LoginPopupProps {
    onRequestClose: () => void;
    onToggleForm: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onRequestClose, onToggleForm }) => {
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: '',
    });
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const { loading, loginError } = auth;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const actionResult = await dispatch(login(formData));
        if (login.fulfilled.match(actionResult)) {
            onRequestClose();
        }
    };

    return (
        <div className='flex flex-col w-full h-full items-center justify-between py-5'>
            <PageTitle>Login</PageTitle>
            {loading && <p>Loading...</p>}
            {loginError && <p>{loginError}</p>}
            <form onSubmit={handleSubmit} className='space-y-4 w-full mb-5'>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </label>
                <br />
                <CustomButton type="submit">Login</CustomButton>
            </form>
            <p>
                Don't have an account?{' '}
                <span className="text-blue-500 cursor-pointer" onClick={onToggleForm}>
                    Signup
                </span>
            </p>
        </div>
    )
}

export default LoginPopup
