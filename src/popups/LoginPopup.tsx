import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { login } from '../store/auth/authSlice';
import CustomButton from '../components/CustomButton';
import PageTitle from '../components/PageTitle';
import CustomLabel from '../components/CustomLabel';
import CustomInputText from '../components/CustomInputText';

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
            {loginError && <p className='text-secondary-alert'>{loginError}</p>}
            <form onSubmit={handleSubmit} className='space-y-4 w-full mb-5'>
                <CustomLabel variant='default'>Username:</CustomLabel>
                <CustomInputText
                    variant='default'
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <br />
                <CustomLabel variant='default'>Password:</CustomLabel>
                <CustomInputText
                    variant='default'
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <br />
                <CustomButton type="submit">Login</CustomButton>
            </form>
            <p>
                Don't have an account?{' '}
                <span className="text-secondary-clickable cursor-pointer" onClick={onToggleForm}>
                    Signup
                </span>
            </p>
        </div>
    )
}

export default LoginPopup
