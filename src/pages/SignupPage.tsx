import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../store/auth/authSlice';
import CustomButton from '../components/CustomButton';

interface SignupFormData {
  username: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const actionResult = await dispatch(signup(formData));
    if (signup.fulfilled.match(actionResult)) {
      navigate('/auth/login');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {auth.error && <p>{auth.error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
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
          />
        </label>
        <br />
        <CustomButton type="submit">Signup</CustomButton>
      </form>
      <Link to={'/auth/login'}>
        <CustomButton>
          Login
        </CustomButton>
      </Link>
    </div>
  );
};

export default SignupPage;
