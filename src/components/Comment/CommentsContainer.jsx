/* eslint-disable react/prop-types */
import CommentForm from "./CommentForm";

import { getCommentsData } from "../../data/comments";
import { useEffect, useState } from "react";
import Comment from "./Comment";

const CommentsContainer = ({ className, logginedUserId }) => {
  const [comments, setComments] = useState([]);
  const mainComments = comments.filter((comment) => comment.parent === null);
  const [affectedComment, setAffectedComment] = useState(null);

  useEffect(() => {
    (async () => {
      const commentData = await getCommentsData();
      setComments(commentData);
    })();
  }, []);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: "10",
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: "2022-12-31T17:22:05.092+0000",
    };
    setComments((currentState) => {
      return setComments(newComment, ...currentState);
    });
  };
  const updateCommentHandler = (value, commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment._id === commentId) {
        return { ...comment, desc: value };
      }
    });
    setComments(updatedComments);

    setAffectedComment(null);
  };

  const getRepliesHandler = (commentId) => {
    return comments
      .filter((comment) => comment.parrent === commentId)
      .sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
  };

  const deleteCommentHandler = (comentId) => {
    const updatedComment = comments.filter((comment) => {
      return comentId !== comment._id;
    });
    setComments(updatedComment);
  };
  return (
    <div className={`${className}`}>
      <CommentForm
        formCancelHandler={true}
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
      />
      <div className="space-y-4 mt-8">
        {mainComments.map((comment) => (
          <>
            <Comment
              key={comment._id}
              comment={comment}
              updateComment={updateCommentHandler}
              logginedUserId={logginedUserId}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              deleteComment={deleteCommentHandler}
              replies={getRepliesHandler(comment._id)}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
