import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createThread } from '../store/threads/threadListSlice';
import { AppDispatch } from '../store/store';

const CreateThreadPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleCreateThread = () => {
    dispatch(createThread({ title, body }));
    navigate('/threads');
  };

  return (
    <div>
      <h2>Create New Thread</h2>
      <form>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button type="button" onClick={handleCreateThread}>
          Create Thread
        </button>
      </form>
    </div>
  );
};

export default CreateThreadPage;
