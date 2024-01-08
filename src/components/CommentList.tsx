import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { fetchComments } from '../store/comments/commentListSlice'
import ViewCommentComponent from './ViewCommentComponent'
import UpdateCommentComponent from './UpdateCommentComponent'

interface CommentListProps {
    threadId: string
}

const CommentList:React.FC<CommentListProps> = ({threadId}) => {
    const dispatch = useDispatch<AppDispatch>()
    const [editCommentId, setEditCommentId] = useState<number | null>(null)
    const commentListState = useSelector((state: RootState) => state.commentList)
    const { comments, loading, error } = commentListState

    useEffect(() => {
        dispatch(fetchComments(threadId))
    }, [dispatch, threadId])

    return (
        <div>
            <h2>Comments</h2>
            {loading && <p>Loading comments...</p>}
            {error && <p>Error fetching comments: {error}</p>}
            {comments.map((comment) => (
                <div key={comment.ID} style={{borderBottom: '1px solid #000'}}>
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
