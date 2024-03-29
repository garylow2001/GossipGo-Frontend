import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { fetchComments } from '../store/comments/commentListSlice'
import ViewCommentComponent from './ViewCommentComponent'
import UpdateCommentComponent from './UpdateCommentComponent'
import PageTitle from '../components/PageTitle'

interface CommentListProps {
    threadId: string
}

const CommentList: React.FC<CommentListProps> = ({ threadId }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [editCommentId, setEditCommentId] = useState<number | null>(null)
    const commentListState = useSelector((state: RootState) => state.commentList)
    const { comments, loading, error } = commentListState

    useEffect(() => {
        dispatch(fetchComments(threadId))
    }, [dispatch, threadId])

    return (
        <div className='flex flex-col items-center justify-center p-4'>
            <PageTitle>Comments</PageTitle>
            {loading && <p>Loading comments...</p>}
            {error && <p className='text-secondary-alert'>Error fetching comments: {error}</p>}
            {comments.length === 0 && <p>No comments yet! Be the first to share your thoughts!</p>}
            {comments.length > 0 && comments.map((comment) => (
                <div key={comment.ID} className='w-full'>
                    {editCommentId === comment.ID
                        ? <UpdateCommentComponent comment={comment} setEditCommentId={setEditCommentId} />
                        : <ViewCommentComponent comment={comment} setEditCommentId={setEditCommentId} />
                    }
                </div>
            ))}
        </div>
    )
}

export default CommentList
