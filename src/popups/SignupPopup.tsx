import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { signup } from '../store/auth/authSlice';
import CustomButton from '../components/CustomButton';
import PageTitle from '../components/PageTitle';

interface SignupPopupProps {
    onToggleForm: () => void;
}

interface SignupFormData {
    username: string;
    password: string;
}

const SignupPopup: React.FC<SignupPopupProps> = ({ onToggleForm }) => {
    const [formData, setFormData] = useState<SignupFormData>({
        username: '',
        password: '',
    });
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const { loading, signupError } = auth;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const actionResult = await dispatch(signup(formData));
        if (signup.fulfilled.match(actionResult)) {
            onToggleForm();
        }
    };

    return (
        <div className='flex flex-col w-full h-full items-center justify-between py-5'>
            <PageTitle>Sign Up</PageTitle>
            {loading && <p>Loading...</p>}
            {signupError && <p>{signupError}</p>}
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
                <CustomButton type="submit">Signup</CustomButton>
            </form>
            <p>
                Already have an account?{' '}
                <span className="text-secondary-clickable cursor-pointer" onClick={onToggleForm}>
                    Login
                </span>
            </p>
        </div>
    );
};

export default SignupPopup;
