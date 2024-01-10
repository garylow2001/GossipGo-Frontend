import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';

interface ThreadCardProps {
    threadID: number;
    username: string;
    title: string;
    body: string;
}

const ThreadCard: React.FC<ThreadCardProps> = ({ username, title, body, threadID }) => {
    return (
        <div className="bg-white p-4 mb-4 shadow-md rounded-md w-full">
            <div className="flex items-center mb-2">
                <img
                    src="blankprofile.png"
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-2 object-cover object-top"
                />
                <span className="font-bold">{username}</span>
            </div>
            <h2 className="text-xl font-semibold m-2">{title}</h2>
            <p className="text-md m-2 pb-2 text-gray-700">{body}</p>
            <Link to={`/threads/${threadID}`}>
                <CustomButton>View</CustomButton>
            </Link>
        </div>
    );
};

export default ThreadCard;
