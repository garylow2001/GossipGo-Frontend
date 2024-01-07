import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ThreadState } from '../store/threads/threadListSlice';
import AddCommentComponent from '../components/AddCommentComponent';
import CommentList from '../components/CommentList';


const ThreadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<ThreadState | null>(null);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await fetch(`http://localhost:3000/threads/${id}`);
        const data = await response.json();
        setThread(data);
      } catch (error: any) { // TODO: Replace this with a type guard
        console.error('Error fetching thread:', error.response?.data?.message || 'Unknown error');
        setThread(null);
      }
    };

    fetchThread();
  }, [id]);

  if (!thread) {
    return <p>Thread not found</p>;
  }

  return (
    <div>
      <h2>{thread.title}</h2>
      <p>{thread.body}</p>
      <p>Author: {thread.author.username}</p>
      <h3>Comments</h3>
      <AddCommentComponent threadId={id || ''} />
      <CommentList threadId={id || ''} />
      <Link to="/threads">
            <button>Back</button>
      </Link>
    </div>
  );
};

export default ThreadDetailPage;
