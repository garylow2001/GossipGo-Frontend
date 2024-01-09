import React from 'react'
import { Comment, deleteComment,  } from '../store/comments/commentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import CustomButton from './CustomButton'

interface ViewCommentComponentProps {
    comment: Comment
    setEditCommentId: React.Dispatch<React.SetStateAction<number | null>>
}

const ViewCommentComponent:React.FC<ViewCommentComponentProps> = ({comment, setEditCommentId}) => {
    const currentUser = useSelector((state: RootState) => state.user.currentUser)
    const commentState = useSelector((state: RootState) => state.comment)
    const { deleteError, loading } = commentState
    const dispatch = useDispatch<AppDispatch>()

    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this comment?')
        if (confirmDelete) {
            const threadID = comment.thread_id.toString()
            const commentID = comment.comment_id.toString()
            dispatch(deleteComment({threadID: threadID, commentID: commentID}))
        }
    }

    return (
        <div>
            {loading && <p>Loading...</p>}
            {deleteError && <p>{deleteError}</p>}
            <p>{comment.body}</p>
            <p>Author: {comment.author.username}</p>
            {currentUser && currentUser.ID === comment.author.ID && (
                <>
                <CustomButton onClick={() => setEditCommentId(comment.ID)}>Update</CustomButton>
                <CustomButton onClick={handleDelete}>Delete</CustomButton>
                </>
            )}
        </div>
    )
}

export default ViewCommentComponent
