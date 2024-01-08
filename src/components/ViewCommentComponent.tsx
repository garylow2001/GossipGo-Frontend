import React from 'react'
import { Comment } from '../store/comments/commentSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

interface ViewCommentComponentProps {
    comment: Comment
    setEditCommentId: React.Dispatch<React.SetStateAction<number | null>>
}

const ViewCommentComponent:React.FC<ViewCommentComponentProps> = ({comment, setEditCommentId}) => {
    const currentUser = useSelector((state: RootState) => state.auth.user)
    return (
        <div>
            <p>{comment.body}</p>
            <p>Author: {comment.author.username}</p>
            {currentUser && currentUser.ID === comment.author.ID && (
                <button onClick={() => setEditCommentId(comment.ID)}>Update</button>
            )}
        </div>
    )
}

export default ViewCommentComponent
