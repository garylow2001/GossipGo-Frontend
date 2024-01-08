import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { createThread } from '../store/threads/threadSlice';

const CreateThreadPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.threadList.error);
  const loading = useSelector((state: RootState) => state.threadList.loading);

  const handleCreateThread = async () => {
    const resultAction = await dispatch(createThread({ title, body }));
    if (createThread.fulfilled.match(resultAction)) {
      navigate('/threads');
    }
  };

  return (
    <div>
      <h2>Create New Thread</h2>
      {error && !loading && <p>{error}</p>}
      {loading && !error && <p>Loading...</p>}
      <form>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button type="button" onClick={handleCreateThread}>
          Create Thread
        </button>
      </form>
      <Link to="/threads">
            <button>Back</button>
      </Link>
    </div>
  );
};

export default CreateThreadPage;
