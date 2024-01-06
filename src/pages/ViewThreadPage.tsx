import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ThreadState } from '../store/threads/threadListSlice';
import AddCommentComponent from '../components/AddCommentComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setComments } from '../store/comments/commentSlice';


const ThreadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<ThreadState | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await fetch(`http://localhost:3000/threads/${id}`);
        const data = await response.json();
        setThread(data);
        dispatch(setComments(data.comments || []));
        setUpdated(false);
      } catch (error: any) { // TODO: Replace this with a type guard
        console.error('Error fetching thread:', error.response?.data?.message || 'Unknown error');
        setThread(null);
      }
    };

    fetchThread();
  }, [id, updated]);

  if (!thread) {
    return <p>Thread not found</p>;
  }

  return (
    <div>
      <h2>{thread.title}</h2>
      <p>{thread.body}</p>
      <p>Author: {thread.author.username}</p>
      <h3>Comments</h3>
      <AddCommentComponent threadId={thread.ID} setUpdated={setUpdated}/>
      {thread.comments && thread.comments.map((comment) => (
        <div key={comment.ID}>
          <p>{comment.body}</p>
          <p>Author: {comment.author.username}</p>
        </div>
      ))}
      <Link to="/threads">
            <button>Back</button>
      </Link>
    </div>
  );
};

export default ThreadDetailPage;
