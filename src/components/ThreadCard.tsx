import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';
import { formatTime } from '../utils/utils';
import { Thread } from '../store/threads/threadSlice';
import ThreadLikeComponent from './ThreadLikeComponent';

interface ThreadCardProps {
    thread: Thread;
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
    return (
        <div className="bg-white p-4 mb-4 shadow-md rounded-md w-full">
            <div className="flex items-center justify-between mb-2">
                <div className='flex flex-row items-center'>
                    <img
                        src="/blankprofile.png"
                        alt="Profile"
                        className="w-8 h-8 rounded-full mr-2 object-cover object-top"
                    />
                    <span className="font-medium">{thread.author.username}</span>
                </div>
                <span className="ml-2">{formatTime(thread.CreatedAt, thread.UpdatedAt)}</span>
            </div>
            <h2 className="text-xl font-semibold m-2">{thread.title}</h2>
            <p className="text-md m-2 pb-2 text-gray-700">{thread.body}</p>
            <div className='flex flex-row justify-between'>
                <ThreadLikeComponent threadID={thread.ID} likesCount={thread.likes_count} />
                <Link to={`/threads/${thread.ID}`}>
                    <CustomButton>View</CustomButton>
                </Link>
            </div>
        </div>
    );
};

export default ThreadCard;
