import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { login } from '../store/auth/authSlice';
import { useSelector } from 'react-redux';

interface LoginFormData {
    username: string;
    password: string;
  }

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: '',
    });
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

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
            navigate('/threads');
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            {auth.error && <p>{auth.error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" 
                    name="username"
                    value={formData.username} 
                    onChange={handleChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" 
                    name="password"
                    value={formData.password} 
                    onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            <Link to={"/threads"}>
                <button>
                    Back
                </button>
            </Link>
            <Link to={"/auth/signup"}>
                <button>
                    Signup
                </button>
            </Link>
        </div>
    );
};

export default LoginPage;
