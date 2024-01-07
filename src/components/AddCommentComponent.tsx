import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addComment } from '../store/comments/commentSlice';

interface AddCommentComponentProps {
  threadId: string;
}

const AddCommentComponent: React.FC<AddCommentComponentProps> = ({ threadId }) => {
  const [comment, setComment] = useState('');
  const commentState = useSelector((state: RootState) => state.comments);
  const dispatch = useDispatch<AppDispatch>();

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
    <div>
      <h3>Add a Comment</h3>
      {commentState.error && <p>Error adding comment: {commentState.error}</p>}
      <textarea
        rows={4}
        cols={50}
        placeholder="Type your comment here..."
        value={comment}
        onChange={handleCommentChange}
      ></textarea>
      <br />
      <button onClick={handleCommentSubmit}>Add Comment</button>
    </div>
  );
};

export default AddCommentComponent;
