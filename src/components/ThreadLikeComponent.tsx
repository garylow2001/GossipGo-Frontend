import React, { useEffect, useState } from 'react'
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

    const [localLikesCount, setLocalLikesCount] = useState(likesCount);
    const [localUserHasLiked, setLocalUserHasLiked] = useState(userHasLiked);

    useEffect(() => {
        setLocalUserHasLiked(userHasLiked);
    }, [userHasLiked]);

    const handleLikeComment = () => {
        dispatch(createThreadLike(threadID));
        setLocalLikesCount(localLikesCount + 1);
    }

    const handleUnlikeComment = () => {
        dispatch(deleteThreadLike(threadID));
        setLocalLikesCount(localLikesCount - 1);
    }

    const handleToggleLike = () => {
        if (localUserHasLiked) {
            handleUnlikeComment();
        } else {
            handleLikeComment();
        }
    }

    return (
        <div>
            {loading && isFocused && <p>Loading...</p>}
            {createError && isFocused && <p>{createError}</p>}
            {deleteError && isFocused && <p>{deleteError}</p>}
            {(!isFocused || (!loading && !createError && !deleteError)) && <div className='flex flex-row items-center space-x-1'>
                <div className='hover:cursor-pointer' onClick={handleToggleLike}>
                    {userHasLiked ? <FaHeart /> : <FaRegHeart />}
                </div>
                <p className='pb-0.5'>{localLikesCount}</p>
            </div>
            }
        </div>
    )
}

export default ThreadLikeComponent
