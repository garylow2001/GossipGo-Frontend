import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { createThread } from '../store/threads/threadSlice';
import CustomButton from '../components/CustomButton';
import MainLayout from '../layouts/MainLayout';
import PageTitle from '../components/PageTitle';
import CategoryDropDown from '../components/CategoryDropDown';
import CustomTextArea from '../components/CustomTextArea';
import CustomLabel from '../components/CustomLabel';

const CreateThreadPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.thread.createError);
  const loading = useSelector((state: RootState) => state.thread.loading);

  const handleCreateThread = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const category = selectedCategory === 'None' ? null : selectedCategory;
    const resultAction = await dispatch(createThread({ title, body, category }));
    if (createThread.fulfilled.match(resultAction)) {
      navigate('/threads/sort/recent');
    }
  };

  return (
    <MainLayout>
      <div className='flex flex-col items-center justify-top w-full h-full'>
        <PageTitle>Create New Thread</PageTitle>
        {error && !loading && <p>{error}</p>}
        {loading && !error && <p>Loading...</p>}
        <form onSubmit={handleCreateThread} className='space-y-4 w-full'>
          <CustomLabel variant='default'>Title:</CustomLabel>
          <CustomTextArea
            variant='default'
            size='default'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={1}
            style={{ resize: 'vertical' }}
          />
          <CustomLabel variant='default'>Category:</CustomLabel>
          <CategoryDropDown selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <CustomLabel variant='default'>Body:</CustomLabel>
          <CustomTextArea
            variant='default'
            size='default'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            style={{ resize: 'vertical' }}
          />
          <CustomButton type="submit">
            Create Thread
          </CustomButton>
        </form>
        <Link to="/threads" className='block mt-4'>
          <CustomButton variant="plain">Back</CustomButton>
        </Link>
      </div>
    </MainLayout>
  );
};

export default CreateThreadPage;
