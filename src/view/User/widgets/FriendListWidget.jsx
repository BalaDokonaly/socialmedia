import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../../../components/WidgetWrapper";
import FrdRequest from "../../../components/FrdRequest";
import { useChangeConnectionStatus } from "../../../hooks/profile";

const FriendListWidget = ({data}) => {
  const { palette } = useTheme();
  const {mutate} = useChangeConnectionStatus()

  const changeConnectionStatusFn = (id,status) => {
    mutate({id: id, status})
  }

  return (
    <WidgetWrapper sx={{maxHeight:"400px", overflow:"scroll"}}>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "0.3rem" }}
      >
        Friend Requests
      </Typography>
      <Box display="flex" flexDirection="column" gap="0.2rem">
        {data && data.map((e, i) => {
          return (
            <FrdRequest key={e._id} changeConnectionStatusFn={changeConnectionStatusFn} data = {e} />
          );
        })}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
