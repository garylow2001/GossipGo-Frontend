import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addComment } from '../store/comments/commentSlice';
import CustomButton from '../components/CustomButton';
import PageTitle from '../components/PageTitle';

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
      <textarea
        rows={4}
        cols={50}
        placeholder="Type your comment here..."
        value={comment}
        onChange={handleCommentChange}
        className='w-3/4 p-2 border'
      ></textarea>
      <br />
      <CustomButton onClick={handleCommentSubmit}> Add Comment </CustomButton>
    </div>
  );
};

export default AddCommentComponent;
