import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchThreadList } from '../store/threads/threadListSlice';
import { Link, useParams } from 'react-router-dom';
import { Thread } from '../store/threads/threadSlice';
import CustomButton from '../components/CustomButton';
import ThreadCard from '../components/ThreadCard';
import PageTitle from '../components/PageTitle';


const ThreadListView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { option } = useParams<{ option?: string }>();
  const threadList = useSelector((state: RootState) => state.threadList);

  useEffect(() => {
    if (!option) dispatch(fetchThreadList({}));
    dispatch(fetchThreadList({ option }));
  }, [dispatch, option]);

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <PageTitle>Threads Page</PageTitle>
      <Link to="/threads/new-thread">
        <CustomButton>Create New Thread</CustomButton>
      </Link>
      {threadList.loading && <p>Loading threads...</p>}
      {threadList.error && <p>Error fetching threads: {threadList.error}</p>}
      {threadList.threads.length === 0 && <p>No threads yet! Be the first to start a discussion!</p>}
      {threadList.threads.length > 0 && (
        <ul className='mt-4 w-full'>
          {threadList.threads.map((thread: Thread) => (
            <li key={thread.ID}>
              <ThreadCard
                thread={thread}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThreadListView;
