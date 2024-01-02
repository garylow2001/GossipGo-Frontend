import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchThreadList, SingleThreadState } from '../store/threads/threadListSlice';
import { Link } from 'react-router-dom';


const ViewThreadsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const threadList = useSelector((state: RootState) => state.threadList);

  useEffect(() => {
    // Fetch threads when the component mounts
    dispatch(fetchThreadList());
  }, [dispatch]);

  return (
    <div>
      <h2>Threads Page</h2>
      {threadList.loading && <p>Loading threads...</p>}
      {threadList.error && <p>Error fetching threads: {threadList.error}</p>}
      {threadList.threads && (
        <ul>
          <Link to="/new-thread">
            <button>Create New Thread</button>
          </Link>
          {threadList.threads.map((thread: SingleThreadState) => (
            <li key={thread.ID}>
              <h3>{thread.title}</h3>
              <p>{thread.body}</p>
              <p>Author: {thread.author.username}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewThreadsPage;
