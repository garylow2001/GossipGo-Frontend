import React from 'react'
import { updateThread } from '../store/threads/threadSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'

// TODO: Block out the save button if no changes have been made

interface UpdateThreadComponentProps {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ThreadFormData {
    title: string
    body: string
}

const UpdateThreadComponent:React.FC<UpdateThreadComponentProps> = ({setIsEditing}) => {
    const dispatch = useDispatch<AppDispatch>()
    const threadState = useSelector((state: RootState) => state.thread)
    const { error, loading, thread } = threadState
    const [formData, setFormData] = React.useState<ThreadFormData>(thread ? 
        {
        title: thread.title,
        body: thread.body
        } : {
        title: '',
        body: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!thread) return // This should be unreachable as the form is not visible if there is no thread
        dispatch(updateThread({ID: thread.ID, ...formData}))
        setIsEditing(false)
    }

    return (
        <div>
            {loading && !error && <p>Loading...</p>}
            {error && !loading && <p>{error}</p>}
            {!thread && <p>Thread not found</p>}
            {thread && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange} />
                    </label>
                    <label>
                        Body:
                        <input type="text" 
                        name="body"
                        value={formData.body}
                        onChange={handleChange} />
                    </label>
                    <button type="submit">Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            )}
        </div>
    )
}

export default UpdateThreadComponent
