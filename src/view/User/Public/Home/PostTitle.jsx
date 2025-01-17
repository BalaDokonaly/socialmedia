import { PersonAddOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../../../components/FlexBetween";
import Avatar from '@mui/material/Avatar';
import { useSelector } from "react-redux";
import {
  DeleteOutlined,
} from "@mui/icons-material";
import moment from "moment";

const PostTitle = ({ data }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <Avatar sx={{ width: 40, height: 40 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Box onClick={() => { }}>
          <Typography
            color={main}
            variant="h5"
            fontWeight="400"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {data?.fullName}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {data?.designation}
          </Typography>
        </Box>
          <Typography color={medium} fontSize="0.75rem">
            {moment(data?.createdAt).format('MMM Do YYYY, h:mm a')}
          </Typography>
      </FlexBetween>
    </FlexBetween>
  );
};

export default PostTitle;
