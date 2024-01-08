import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddCommentComponent from '../components/AddCommentComponent';
import CommentList from '../components/CommentList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import ViewThreadComponent from '../components/ViewThreadComponent';
import UpdateThreadComponent from '../components/UpdateThreadComponent';
import { fetchThread } from '../store/threads/threadSlice';


const ViewThreadPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const [thread, setThread] = useState<Thread | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const threadState = useSelector((state: RootState) => state.thread);
  const { error, loading, thread } = threadState;

  useEffect(() => {
    dispatch(fetchThread(id || ''));
  }, [dispatch, id]);

  if (!thread) {
    return <p>Thread not found</p>;
  }

  return (
    <div>
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>{error}</p>}
      {isEditing 
        ? <UpdateThreadComponent setIsEditing={setIsEditing} />
        : <ViewThreadComponent currentUser={currentUser} setIsEditing={setIsEditing} />
      }
      <h3>Comments</h3>
      <AddCommentComponent threadId={id || ''} />
      <CommentList threadId={id || ''} />
      <Link to="/threads">
            <button>Back</button>
      </Link>
    </div>
  );
};

export default ViewThreadPage;
