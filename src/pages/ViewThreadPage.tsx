import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddCommentComponent from '../sections/AddCommentComponent';
import CommentList from '../sections/CommentList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import ViewThreadComponent from '../sections/ViewThreadComponent';
import UpdateThreadComponent from '../sections/UpdateThreadComponent';
import { fetchThread } from '../store/threads/threadSlice';
import CustomButton from '../components/CustomButton';
import MainLayout from '../layouts/MainLayout';


const ViewThreadPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const threadState = useSelector((state: RootState) => state.thread);
  const thread = threadState.thread;

  useEffect(() => {
    dispatch(fetchThread(id || ''));
  }, [dispatch, id]);

  if (!thread) {
    return <p>Thread not found</p>;
  }

  return (
    <MainLayout>
      {isEditing
        ? <UpdateThreadComponent setIsEditing={setIsEditing} />
        : <ViewThreadComponent currentUser={currentUser} setIsEditing={setIsEditing} />
      }
      <AddCommentComponent threadId={id || ''} />
      <CommentList threadId={id || ''} />
      <div className='flex justify-center'>
        <Link to="/threads">
          <CustomButton>Back</CustomButton>
        </Link>
      </div>
    </MainLayout>
  );
};

export default ViewThreadPage;
