import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { signup } from '../store/auth/authSlice';
import CustomButton from '../components/CustomButton';
import PageTitle from '../components/PageTitle';
import CustomLabel from '../components/CustomLabel';
import CustomTextArea from '../components/CustomTextArea';

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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
                <CustomLabel variant='default'>Username:</CustomLabel>
                <CustomTextArea
                    variant='default'
                    size='default'
                    rows={1}
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <br />
                <CustomLabel variant='default'>Password:</CustomLabel>
                <CustomTextArea
                    variant='default'
                    size='default'
                    rows={1}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
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
