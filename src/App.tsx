import React from 'react';
import './App.css';
import ThreadListView from './components/ThreadListView';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateThreadPage from './pages/CreateThreadPage';
import ViewThreadPage from './pages/ViewThreadPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/threads">
          <Route index element={<ThreadListView />} />
          <Route path="/threads" element={<ThreadListView />} />
          <Route path="/threads/new-thread" element={<CreateThreadPage />} />
          <Route path="/threads/:id" element={<ViewThreadPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
