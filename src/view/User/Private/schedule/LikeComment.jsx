import { useState } from "react";
import FlexBetween from "../../../../components/FlexBetween";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import {
  useGetAllMyCommentAndReply,
  useUpdateScheduleLikes,
} from "../../../../hooks/schedule";
import { useSelector } from "react-redux";
import Loader from "../../../../components/Loader/Loader";
import CommentInputBox from "../../../../components/Comments/CommentInputBox";
import CommentBox from "../../../../components/Comments/CommentBox";

const LikeComment = (props) => {
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const [isComments, setIsComments] = useState(false);
  const [selected, setSelected] = useState(0); //0 for none, -id for edit, id for reply

  const { mutate } = useUpdateScheduleLikes();
  const { data: commentReplyData, isLoading: commentReplyLoading } =
    useGetAllMyCommentAndReply(props?.scheduleId);

  const { userId } = useSelector((state) => state.profile.profileData);

  const likemutate = () => {
    let payload = {};
    payload.scheduleId = props?.scheduleId;
    payload.userId = userId;
    payload.status = 1;
    mutate(payload);
  };
  const disLikemutate = () => {
    let payload = {};
    payload.scheduleId = props?.scheduleId;
    payload.userId = userId;
    payload.status = 2;
    mutate(payload);
  };

  if (commentReplyLoading) {
    return <Loader />;
  }

  function addIdsToComments(commentReplyData, parentId = null) {
    let count = 1;
    if (commentReplyData != null) {
      return commentReplyData.map((comment, index) => {
        commentReplyData[index].id = count;
        count++;
        if (comment.replies.length > 0) {
          for (let i = 0; i < commentReplyData[index].replies.length; i++) {
            comment.replies[i].id = count;
            count++;
          }
        }

        return comment;
      });
    } else {
      return [];
    }
  }

  const isUserLiked = () => {
    let data = props?.postData.likedBy;
    return data.filter((i) => {
      return i === userId;
    });
  };


  return (
    <Box gap="1rem">
      <FlexBetween>
        {isUserLiked().length > 0 ? (
          <IconButton>
            <FavoriteOutlined
              sx={{ color: primary }}
              onClick={() => disLikemutate()}
            />
          </IconButton>
        ) : (
          <IconButton>
            <FavoriteBorderOutlined onClick={() => likemutate()} />
          </IconButton>
        )}

        <Typography>
          {props?.postData?.likes === 1
            ? `1 like`
            : `${props?.postData?.likes} likes`}
        </Typography>
      </FlexBetween>

      <FlexBetween gap="0.3rem">
        <Box
          onClick={() => {
            setIsComments(!isComments);
          }}
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <IconButton>
            <ChatBubbleOutlineOutlined />
          </IconButton>
          <Typography sx={{ cursor: "pointer" }}>{"comments"}</Typography>
        </Box>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <Divider />
          <Box>
            {isComments && (
              <Box mt="0.5rem">
                <Box>
                  <Divider />
                  <Stack>
                    <CommentInputBox
                      type="comment"
                      postData={commentReplyData}
                      scheduleId={props?.scheduleId}
                    />
                    {addIdsToComments(commentReplyData)?.map((c) => {
                      return (
                        <CommentBox
                          key={c.id}
                          postData={c}
                          selected={selected}
                          setSelected={setSelected}
                          reorderedComments={addIdsToComments(commentReplyData)}
                          {...c}
                        />
                      );
                    })}
                  </Stack>
                </Box>
                <Divider />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LikeComment;
