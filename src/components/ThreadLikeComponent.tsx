import React from 'react'
import { ThreadLike } from '../store/threads/threadSlice'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { createThreadLike, deleteThreadLike } from '../store/threads/threadLikeSlice';

interface ThreadLikeComponentProps {
    threadID: number;
    likes: ThreadLike[];
}

const ThreadLikeComponent: React.FC<ThreadLikeComponentProps> = ({ threadID, likes }) => {
    const user = useSelector((state: RootState) => state.user);
    const threadLikeState = useSelector((state: RootState) => state.threadLike);
    const { createError, deleteError } = threadLikeState;
    const likeCount = likes?.length || 0;
    const userHasLiked = likes?.some((like) => like.user_id === user.currentUser?.ID) || false;
    const dispatch = useDispatch<AppDispatch>();

    const handleLikeComment = () => {
        dispatch(createThreadLike(threadID));
    }

    const handleUnlikeComment = () => {
        dispatch(deleteThreadLike(threadID));
    }

    const handleToggleLike = () => {
        if (userHasLiked) {
            handleUnlikeComment();
        } else {
            handleLikeComment();
        }
    }

    return (
        <div className='flex flex-row items-center space-x-1'>
            {createError && <p>{createError}</p>}
            {deleteError && <p>{deleteError}</p>}
            <div className='hover:cursor-pointer' onClick={handleToggleLike}>
                {userHasLiked ? <FaHeart /> : <FaRegHeart />}
            </div>
            <p className='pb-0.5'>{likeCount}</p>
        </div>
    )
}

export default ThreadLikeComponent
