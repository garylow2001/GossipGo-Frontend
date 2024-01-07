import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { fetchComments } from '../store/comments/commentListSlice'

interface CommentListProps {
    threadId: string
}

const CommentList:React.FC<CommentListProps> = ({threadId}) => {
    const dispatch = useDispatch<AppDispatch>()
    const commentListState = useSelector((state: RootState) => state.commentList)

    useEffect(() => {
        dispatch(fetchComments(threadId))
    }, [threadId])

    return (
        <div>
            <h2>Comments</h2>
            {commentListState.loading && <p>Loading comments...</p>}
            {commentListState.error && <p>Error fetching comments: {commentListState.error}</p>}
            {commentListState.comments.map((comment) => (
                <div key={comment.ID}>
                    <p>{comment.body}</p>
                    <p>Author: {comment.author.username}</p>
                </div>
                
            ))}
        </div>
    )
}

export default CommentList
