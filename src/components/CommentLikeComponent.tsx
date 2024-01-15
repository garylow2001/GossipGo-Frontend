import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { CommentLike } from '../store/comments/commentSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { createCommentLike, deleteCommentLike } from '../store/comments/commentLikeSlice';

interface CommentLikeComponentProps {
    likes: CommentLike[];
    threadID: number;
    commentID: number;
}
const CommentLikeComponent: React.FC<CommentLikeComponentProps> = ({ likes, threadID, commentID }) => {
    const user = useSelector((state: RootState) => state.user);
    const commentLikeState = useSelector((state: RootState) => state.commentLike);
    const { createError, deleteError } = commentLikeState;
    const likeCount = likes?.length || 0;
    const userHasLiked = likes?.some((like) => like.user_id === user.currentUser?.ID) || false;
    const dispatch = useDispatch<AppDispatch>();

    const handleLikeComment = () => {
        dispatch(createCommentLike({ threadID, commentID }));
    }

    const handleUnlikeComment = () => {
        dispatch(deleteCommentLike({ threadID, commentID }));
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

export default CommentLikeComponent
