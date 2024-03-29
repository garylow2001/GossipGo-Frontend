import React from 'react'
import { User } from '../store/user/userSlice'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { useDispatch } from 'react-redux'
import { deleteThread } from '../store/threads/threadSlice'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../components/CustomButton'
import { formatTime } from '../utils/utils'
import ThreadLikeComponent from '../components/ThreadLikeComponent'

interface ViewThreadComponentProps {
  currentUser: User | null
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const ViewThreadComponent: React.FC<ViewThreadComponentProps> = ({ currentUser, setIsEditing }) => {
  const threadState = useSelector((state: RootState) => state.thread)
  const { ID, likes_count } = threadState.thread!
  const threadID = ID
  const threadLikesCount = likes_count
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { fetchError, deleteError, loading, thread } = threadState

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this thread?')
    if (confirmDelete) {
      if (!thread) return; // This should never happen as delete CustomButton not shown if thread is null
      const actionResult = await dispatch(deleteThread(thread.ID.toString()))
      if (deleteThread.fulfilled.match(actionResult)) {
        navigate('/threads')
      }
    }
  }

  return (
    <div className="bg-white p-4 shadow-md mb-4">
      {loading && <p>Loading...</p>}
      {fetchError && <p className='text-secondary-alert'>Error fetching thread: {fetchError}</p>}
      {deleteError && <p className='text-secondary-alert'>Error deleting thread: {deleteError}</p>}
      {!thread && <p className='text-secondary-alert'>Thread not found</p>}
      {thread && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className='flex flex-row items-center'>
              <img
                src="/blankprofile.png"
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2 object-cover object-top"
              />
              <span className="font-medium">{thread.author.username}</span>
              {thread.category && <p className="text-sm mx-2 text-secondary-button">{thread.category}</p>}
            </div>
            <span className="ml-2">{formatTime(thread.CreatedAt, thread.UpdatedAt)}</span>
          </div>
          <h2 className="text-xl font-bold mb-2">{thread.title}</h2>
          <p className="mb-4">{thread.body}</p>
          <ThreadLikeComponent threadID={threadID} likesCount={threadLikesCount} />
          {currentUser && currentUser.ID === thread.author.ID && (
            <div className="flex gap-2 mt-4">
              <CustomButton onClick={() => setIsEditing(true)}>Update</CustomButton>
              <CustomButton variant="alert" onClick={handleDelete}>Delete</CustomButton>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ViewThreadComponent
