import React from 'react'
import { User } from '../store/user/userSlice'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { useDispatch } from 'react-redux'
import { deleteThread } from '../store/threads/threadSlice'
import { useNavigate } from 'react-router-dom'

interface ViewThreadComponentProps {
    currentUser: User | null
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const ViewThreadComponent:React.FC<ViewThreadComponentProps> = ({currentUser, setIsEditing}) => {
  const threadState = useSelector((state: RootState) => state.thread)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { fetchError, deleteError, loading, thread } = threadState

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this thread?')
    if (confirmDelete) {
      if (!thread) return; // This should never happen as delete button not shown if thread is null
      const actionResult = await dispatch(deleteThread(thread.ID.toString()))
      if (deleteThread.fulfilled.match(actionResult)) {
        navigate('/threads')
      }
    }
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {fetchError && <p>Error fetching thread: {fetchError}</p>}
      {deleteError && <p>Error deleting thread: {deleteError}</p>}
      {!thread && <p>Thread not found</p>}
      {thread && (
        <>
          <h2>{thread.title}</h2>
          <p>{thread.body}</p>
          <p>Author: {thread.author.username}</p>
          {currentUser && currentUser.ID === thread.author.ID && (
            <>
            <button onClick={() => setIsEditing(true)}>Update</button>
            <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default ViewThreadComponent
