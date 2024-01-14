import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CommentLike } from '../store/comments/commentSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface CommentLikeComponentProps {
    likes: CommentLike[];
}
const CommentLikeComponent: React.FC<CommentLikeComponentProps> = ({ likes }) => {
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

export default CommentLikeComponent
