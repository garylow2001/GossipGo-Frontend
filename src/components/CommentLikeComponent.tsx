import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Comment } from '../store/comments/commentSlice';
import { createCommentLike, deleteCommentLike } from '../store/comments/commentLikeSlice';

interface CommentLikeComponentProps {
    comment: Comment;
}
const CommentLikeComponent: React.FC<CommentLikeComponentProps> = ({ comment }) => {
    const user = useSelector((state: RootState) => state.user);
    const commentLikeState = useSelector((state: RootState) => state.commentLike);
    const { threadID, commentIDonThread, loading, createError, deleteError } = commentLikeState;
    const userHasLiked = user.currentUser?.comment_likes?.some(like => like.comment_id === comment.ID);
    const isFocused = threadID === comment.thread_id && commentIDonThread === comment.comment_id;
    const dispatch = useDispatch<AppDispatch>();

    const handleLikeComment = () => {
        const commentID = comment.comment_id
        const threadID = comment.thread_id
        dispatch(createCommentLike({ threadID, commentID }));
    }

    const handleUnlikeComment = () => {
        const commentID = comment.comment_id
        const threadID = comment.thread_id
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
        <div>
            {loading && isFocused && <p>Loading...</p>}
            {createError && isFocused && <p>{createError}</p>}
            {deleteError && isFocused && <p>{deleteError}</p>}
            {(!isFocused || (!loading && !createError && !deleteError)) && <div className='flex flex-row items-center space-x-1'>
                <div className='hover:cursor-pointer' onClick={handleToggleLike}>
                    {userHasLiked ? <FaHeart /> : <FaRegHeart />}
                </div>
                <p className='pb-0.5'>{comment.likes_count}</p>
            </div>}
        </div>
    )
}

export default CommentLikeComponent
