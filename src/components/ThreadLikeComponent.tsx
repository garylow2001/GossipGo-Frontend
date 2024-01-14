import React from 'react'
import { ThreadLike } from '../store/threads/threadSlice'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface ThreadLikeComponentProps {
    likes: ThreadLike[];
}

const ThreadLikeComponent: React.FC<ThreadLikeComponentProps> = ({ likes }) => {
    const user = useSelector((state: RootState) => state.user);
    const likeCount = likes?.length || 0;
    const userHasLiked = likes?.some((like) => like.user_id === user.currentUser?.ID) || false;

    return (
        <div className='flex flex-row items-center space-x-1'>
            {userHasLiked ? <FaHeart /> : <FaRegHeart />}
            <p className='pb-0.5'>{likeCount}</p>
        </div>
    )
}

export default ThreadLikeComponent
