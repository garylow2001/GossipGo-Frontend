import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./index.css";

import CreateThreadPage from './pages/CreateThreadPage';
import ViewThreadPage from './pages/ViewThreadPage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { getCurrentUser } from './store/user/userSlice';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className='bg-gray-100 hidden-scrollbar'>
      <Router>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/threads">
            <Route path="/threads" element={<MainPage />} />
            <Route path="/threads/:id" element={<ViewThreadPage />} />
            <Route path="/threads/new-thread" element={<CreateThreadPage />} />
            <Route path="/threads/sort/:option" element={<MainPage />} />
            <Route path="/threads/category/:option" element={<MainPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
