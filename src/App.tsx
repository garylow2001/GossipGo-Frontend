import React from 'react';
import './App.css';
import ViewThreadsPage from './pages/ViewThreadsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateThreadPage from './pages/CreateThreadPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewThreadsPage />} />
        <Route path="/new-thread" element={<CreateThreadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
