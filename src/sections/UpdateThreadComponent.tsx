import React from 'react'
import { updateThread } from '../store/threads/threadSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import CustomButton from '../components/CustomButton'

// TODO: Block out the save CustomButton if no changes have been made

interface UpdateThreadComponentProps {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ThreadFormData {
    title: string
    body: string
}

const UpdateThreadComponent: React.FC<UpdateThreadComponentProps> = ({ setIsEditing }) => {
    const dispatch = useDispatch<AppDispatch>()
    const threadState = useSelector((state: RootState) => state.thread)
    const { updateError, loading, thread } = threadState
    const [formData, setFormData] = React.useState<ThreadFormData>(thread ?
        {
            title: thread.title,
            body: thread.body
        } : {
            title: '',
            body: ''
        })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!thread) return // This should be unreachable as the form is not visible if there is no thread
        dispatch(updateThread({ ID: thread.ID, ...formData }))
        setIsEditing(false)
    }

    return (
        <div className="bg-white p-4 shadow-md mb-4">
            {loading && <p>Loading...</p>}
            {updateError && <p>Error updating thread: {updateError}</p>}
            {!thread && <p>Thread not found</p>}
            {thread && (
                <form onSubmit={handleSubmit} className='flex flex-col justify-between mb-2'>
                    <label className='mb-2'>
                        Title:
                        <input type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 w-full mt-1"
                        />
                    </label>
                    <label>
                        Body:
                        <textarea
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            rows={4}
                            style={{ resize: 'vertical' }}
                            className="border border-gray-300 rounded-md p-2 w-full mt-1"
                        />
                    </label>
                    <div className="flex gap-2 mt-4">
                        <CustomButton type="submit">Save</CustomButton>
                        <CustomButton onClick={() => setIsEditing(false)}>Cancel</CustomButton>
                    </div>
                </form>
            )}
        </div>
    )
}

export default UpdateThreadComponent
