import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchThreadList } from '../store/threads/threadListSlice';
import { Link } from 'react-router-dom';
import { Thread } from '../store/threads/threadSlice';
import { logout } from '../store/auth/authSlice';


const ThreadListView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const threadList = useSelector((state: RootState) => state.threadList);

  useEffect(() => {
    dispatch(fetchThreadList());
  }, [dispatch]);

  return (
    <div>
      <h2>Threads Page</h2>
      <Link to="/threads/new-thread">
            <button>Create New Thread</button>
      </Link>
      <Link to="/auth/login">
        <button>Login</button>
      </Link>
      <button onClick={() => dispatch(logout())}>Logout</button>
      {threadList.loading && <p>Loading threads...</p>}
      {threadList.error && <p>Error fetching threads: {threadList.error}</p>}
      {threadList.threads.length === 0 && <p>No threads yet! Be the first to start a discussion!</p>}
      {threadList.threads.length > 0 && (
        <ul>
          {threadList.threads.map((thread: Thread) => (
            <li key={thread.ID}>
              <h3>{thread.title}</h3>
              <p>{thread.body}</p>
              <p>Author: {thread.author.username}</p>
              <Link to={`/threads/${thread.ID}`}>
                  <button>View</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThreadListView;
