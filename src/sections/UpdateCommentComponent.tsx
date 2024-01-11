import React, { useState } from 'react'
import { Comment, updateComment } from '../store/comments/commentSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { useSelector } from 'react-redux'
import CustomButton from '../components/CustomButton'

interface UpdateCommentComponentProps {
    comment: Comment
    setEditCommentId: React.Dispatch<React.SetStateAction<number | null>>
}

const UpdateCommentComponent: React.FC<UpdateCommentComponentProps> = ({ comment, setEditCommentId }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [body, setBody] = useState(comment.body)
    const commentState = useSelector((state: RootState) => state.comment)
    const { updateError, loading } = commentState

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const threadID = comment.thread_id.toString()
        const commentID = comment.comment_id.toString()
        const resultAction = await dispatch(updateComment({ threadID: threadID, commentID: commentID, text: body }))
        if (updateComment.fulfilled.match(resultAction)) {
            setEditCommentId(null)
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-full">
            {loading && <p>Loading...</p>}
            {updateError && <p>Error updating comment: {updateError}</p>}
            <form onSubmit={handleSubmit} className='w-full p-2'>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded-md'
                />
                <div className="flex mt-2 gap-2">
                    <CustomButton type="submit">Save</CustomButton>
                    <CustomButton onClick={() => setEditCommentId(null)}>Cancel</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default UpdateCommentComponent
