import React, { useState } from 'react'
import { updateThread } from '../store/threads/threadSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import CustomButton from '../components/CustomButton'
import CategoryDropDown from '../components/CategoryDropDown'
import CustomLabel from '../components/CustomLabel'
import CustomTextArea from '../components/CustomTextArea'
import CustomInputText from '../components/CustomInputText'

// TODO: Block out the save CustomButton if no changes have been made

interface UpdateThreadComponentProps {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ThreadFormData {
    title: string
    body: string
    category: string | null
}

const UpdateThreadComponent: React.FC<UpdateThreadComponentProps> = ({ setIsEditing }) => {
    const dispatch = useDispatch<AppDispatch>()
    const threadState = useSelector((state: RootState) => state.thread)
    const { updateError, loading, thread } = threadState
    const [selectedCategory, setSelectedCategory] = useState<string | null>(thread ? thread.category : null)
    const [formData, setFormData] = useState<ThreadFormData>(thread ?
        {
            title: thread.title,
            body: thread.body,
            category: selectedCategory
        } : {
            title: '',
            body: '',
            category: null
        })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name: string; value: string }>) => {
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
            {updateError && <p className='text-secondary-alert'>Error updating thread: {updateError}</p>}
            {!thread && <p className='text-secondary-alert'>Thread not found</p>}
            {thread && (
                <form onSubmit={handleSubmit} className='flex flex-col justify-between mb-2'>
                    <CustomLabel variant='default'>Title:</CustomLabel>
                    <CustomInputText
                        variant='default'
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <CustomLabel variant='default'>Category:</CustomLabel>
                    <div className="relative inline-block text-left">
                        <CategoryDropDown
                            name="category"
                            onChange={handleChange}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </div>
                    <CustomLabel variant='default'>Body:</CustomLabel>
                    <CustomTextArea
                        variant='default'
                        size='default'
                        value={formData.body}
                        onChange={handleChange}
                        rows={3}
                        style={{ resize: 'vertical' }}
                    />
                    <div className="flex gap-2 mt-4">
                        <CustomButton type="submit">Save</CustomButton>
                        <CustomButton variant="plain" onClick={() => setIsEditing(false)}>Cancel</CustomButton>
                    </div>
                </form>
            )}
        </div>
    )
}

export default UpdateThreadComponent
