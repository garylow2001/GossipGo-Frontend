import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SingleThreadState } from '../store/threads/threadListSlice';


const ThreadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<SingleThreadState | null>(null);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await fetch(`http://localhost:3000/threads/${id}`);
        const data = await response.json();
        setThread(data);
      } catch (error: any) {
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
