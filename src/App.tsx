import React, { useEffect } from 'react';
import ThreadListView from './components/ThreadListView';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./index.css";

import CreateThreadPage from './pages/CreateThreadPage';
import ViewThreadPage from './pages/ViewThreadPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { getCurrentUser } from './store/user/userSlice';
import PageHeader from './layouts/PageHeader';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  
  return (
    <div className='max-h-screen flex flex-col'>
      <PageHeader />
      <Router>
        <Routes>
          <Route index element={<ThreadListView />} />
          <Route path="/threads">
            <Route path="/threads" element={<ThreadListView />} />
            <Route path="/threads/new-thread" element={<CreateThreadPage />} />
            <Route path="/threads/:id" element={<ViewThreadPage />} />
          </Route>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
