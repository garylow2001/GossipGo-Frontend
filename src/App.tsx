import React from 'react';
import './App.css';
import ThreadListView from './components/ThreadListView';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import CreateThreadPage from './pages/CreateThreadPage';
import ViewThreadPage from './pages/ViewThreadPage';
import LoginPage from './pages/LoginPage';

const App = () => {
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
      </Routes>
    </Router>
  );
}

export default App;
