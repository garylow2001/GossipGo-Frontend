import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addComment } from '../store/comments/commentSlice';
import CustomButton from '../components/CustomButton';
import PageTitle from '../components/PageTitle';
import CustomTextArea from '../components/CustomTextArea';

// TODO: should not submit empty comment

interface AddCommentComponentProps {
  threadId: string;
}

const AddCommentComponent: React.FC<AddCommentComponentProps> = ({ threadId }) => {
  const [comment, setComment] = useState('');
  const commentState = useSelector((state: RootState) => state.comment);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, createError } = commentState;

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    dispatch(addComment({
      text: comment,
      id: threadId,
    }))
      .then(() => {
        setComment('');
      })
  };

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <PageTitle>Add Comment</PageTitle>
      {loading && <p>Adding comment...</p>}
      {createError && <p>Error adding comment: {createError}</p>}
      <CustomTextArea
        variant='default'
        size='half'
        placeholder='Type your comment here...'
        rows={4}
        cols={50}
        value={comment}
        onChange={handleCommentChange}
      />
      <br />
      <CustomButton onClick={handleCommentSubmit}> Add Comment </CustomButton>
    </div>
  );
};

export default AddCommentComponent;
