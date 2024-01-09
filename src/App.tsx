import React, { useEffect } from 'react';
import './App.css';
import ThreadListView from './components/ThreadListView';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateThreadPage from './pages/CreateThreadPage';
import ViewThreadPage from './pages/ViewThreadPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { getCurrentUser } from './store/user/userSlice';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  
  return (
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
  );
}

export default App;
