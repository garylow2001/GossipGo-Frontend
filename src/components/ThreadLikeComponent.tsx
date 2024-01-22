import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { createThreadLike, deleteThreadLike } from '../store/threads/threadLikeSlice';

interface ThreadLikeComponentProps {
    threadID: number;
    likesCount: number;
}

const ThreadLikeComponent: React.FC<ThreadLikeComponentProps> = ({ threadID, likesCount }) => {
    const user = useSelector((state: RootState) => state.user);
    const threadLikeState = useSelector((state: RootState) => state.threadLike);
    const { threadId, loading, createError, deleteError } = threadLikeState;
    const userHasLiked = user.currentUser?.thread_likes?.some(like => like.thread_id === threadID);
    const isFocused = threadId === threadID;
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
        <div>
            {loading && isFocused && <p>Loading...</p>}
            {createError && isFocused && <p className='text-secondary-alert'>{createError}</p>}
            {deleteError && isFocused && <p className='text-secondary-alert'>{deleteError}</p>}
            {(!isFocused || (!loading && !createError && !deleteError)) && <div className='flex flex-row items-center space-x-1'>
                <div className='hover:cursor-pointer' onClick={handleToggleLike}>
                    {userHasLiked ? <FaHeart /> : <FaRegHeart />}
                </div>
                <p className='pb-0.5'>{likesCount}</p>
            </div>
            }
        </div>
    )
}

export default ThreadLikeComponent
