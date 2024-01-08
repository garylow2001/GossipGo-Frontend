import React from 'react'
import { User } from '../store/user/userSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

interface ViewThreadComponentProps {
    currentUser: User | null
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const ViewThreadComponent:React.FC<ViewThreadComponentProps> = ({currentUser, setIsEditing}) => {
  const threadState = useSelector((state: RootState) => state.thread)
  const { error, loading, thread } = threadState
  return (
    <div>
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>{error}</p>}
      {!thread && <p>Thread not found</p>}
      {thread && (
        <>
          <h2>{thread.title}</h2>
          <p>{thread.body}</p>
          <p>Author: {thread.author.username}</p>
          {currentUser && currentUser.ID === thread.author.ID && (
            <button onClick={() => setIsEditing(true)}>Update</button>
          )}
        </>
      )}
    </div>
  )
}

export default ViewThreadComponent
