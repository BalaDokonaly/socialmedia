import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";

import InputField from "./InputField";
import { useInsertComment, useInsertReply } from "../../hooks/likeComment";
import { useSelector } from "react-redux";
import {
  useReplyPostComment,
  useUpdatePostComment,
} from "../../hooks/schedule";

function CommentInputBox({ type, postData, replyId, insertAt, scheduleId }) {
  const { palette } = useTheme();
  const { userId } = useSelector((state) => state.profile.profileData);
  const dark = palette.neutral.dark;
  const currentUser = "juliusomo";
  const newId = 5;
  const [text, setText] = useState("");
  const inputField = useRef(null);
  const dashboardView = useSelector((state) => state.profile.dashboardView);
  console.log(dashboardView, "fff");
  const { mutate: insertComment, isloading: insertCommentLoading } =
    useInsertComment();
  const { mutate: insertReply, isloading: insertReplyLoading } =
    useInsertReply();
  const { mutate: insertScheduleReply } = useReplyPostComment();
  const { mutate: commentMutate } = useUpdatePostComment();
  useEffect(() => {
    if (insertCommentLoading || insertReplyLoading) {
      setText("");
    }
  }, [insertCommentLoading, insertReplyLoading]);
  function handleSubmit() {
    console.log(postData, "ggg");
    if (type === "comment") {
      if (dashboardView === "schedule") {
        const newComment = {
          scheduleId,
          userId: userId,
          message: text,
        };
        setText("");
        return commentMutate(newComment);
      } else {
        const newComment = {
          postId: postData?._id,
          userId: userId,
          message: text,
        };
        setText("");
        return insertComment(newComment);
      }
    } else if (type === "reply") {
      const newReply = {
        commentId: replyId?._id,
        userId: userId,
        message: text,
      };
      setText("");
      if (dashboardView === "schedule") {
        return insertScheduleReply(newReply);
      } else {
        return insertComment(newReply);
      }
    }
  }

  return (
    <>
      <Box
        id={type === "reply" ? "replyBox" : ""}
        sx={{
          display: { laptop: "flex", mobile: "block" },
          width: "100%",
          borderRadius: "4px",
          mt: 1,
        }}
      >
        {
          <>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Avatar
                sx={{ width: 40, height: 40, mr: 1 }}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={1}
                variant="standard"
                placeholder="Comment Your Thought..."
                sx={{
                  width: "100%",
                  mt: 1,
                  // backgroundColor: palette.neutral.light,
                  borderRadius: "1rem",
                }}
                onChange={(e) => setText(e.target.value)}
                type={type}
                value={text}
              />
              <IconButton onClick={handleSubmit}>
                <IoIosSend size={30} />
              </IconButton>
            </Box>
          </>
        }
      </Box>
    </>
  );
}

export default CommentInputBox;
