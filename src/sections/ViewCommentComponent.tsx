import React from 'react'
import { Comment, deleteComment, } from '../store/comments/commentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import CustomButton from '../components/CustomButton'
import CommentLikeComponent from '../components/CommentLikeComponent'
import { formatTime } from '../utils/utils'

interface ViewCommentComponentProps {
    comment: Comment
    setEditCommentId: React.Dispatch<React.SetStateAction<number | null>>
}

const ViewCommentComponent: React.FC<ViewCommentComponentProps> = ({ comment, setEditCommentId }) => {
    const currentUser = useSelector((state: RootState) => state.user.currentUser)
    const commentState = useSelector((state: RootState) => state.comment)
    const { deleteError, loading } = commentState
    const dispatch = useDispatch<AppDispatch>()

    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this comment?')
        if (confirmDelete) {
            const threadID = comment.thread_id.toString()
            const commentID = comment.comment_id.toString()
            dispatch(deleteComment({ threadID: threadID, commentID: commentID }))
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col gap-4">
            {loading && <p>Loading...</p>}
            {deleteError && <p>{deleteError}</p>}
            <div className="flex items-center justify-between mb-2">
                <div className='flex flex-row items-center'>
                    <img
                        src="/blankprofile.png"
                        alt="Profile"
                        className="w-8 h-8 rounded-full mr-2 object-cover object-top"
                    />
                    <span className="font-medium">{comment.author.username}</span>
                </div>
                <span className="ml-2">{formatTime(comment.CreatedAt, comment.UpdatedAt)}</span>
            </div>
            <p>{comment.body}</p>
            <CommentLikeComponent comment={comment} />
            {currentUser && currentUser.ID === comment.author.ID && (
                <div className="flex gap-2">
                    <CustomButton onClick={() => setEditCommentId(comment.ID)}>Update</CustomButton>
                    <CustomButton variant="alert" onClick={handleDelete}>Delete</CustomButton>
                </div>
            )}
        </div>
    )
}

export default ViewCommentComponent
