import React, { useState } from 'react'
import { Comment, updateComment } from '../store/comments/commentSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { useSelector } from 'react-redux'
import CustomButton from './CustomButton'

interface UpdateCommentComponentProps {
    comment: Comment
    setEditCommentId: React.Dispatch<React.SetStateAction<number | null>>
}

const UpdateCommentComponent:React.FC<UpdateCommentComponentProps> = ({comment, setEditCommentId}) => {
    const dispatch = useDispatch<AppDispatch>()
    const [body, setBody] = useState(comment.body)
    const commentState =useSelector((state: RootState) => state.comment)
    const { updateError, loading } = commentState

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const threadID = comment.thread_id.toString()
        const commentID = comment.comment_id.toString()
        const resultAction = await dispatch(updateComment({threadID: threadID, commentID: commentID, text: body}))
        if (updateComment.fulfilled.match(resultAction)) {
            setEditCommentId(null)
        }
    }
    
    return (
        <div>
        {loading && <p>Loading...</p>}
        {updateError && <p>Error updating comment: {updateError}</p>}
        <form onSubmit={handleSubmit}>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} />
            <CustomButton type="submit">Save</CustomButton>
            <CustomButton onClick={() => setEditCommentId(null)}>Cancel</CustomButton>
        </form>
        </div>
    )
}

export default UpdateCommentComponent
