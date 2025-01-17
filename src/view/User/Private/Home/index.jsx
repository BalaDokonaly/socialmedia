import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar/index";
import UserWidget from "../../widgets/UserWidget";
import MyPostWidget from "../../Private/Posts/MyPostWidget";
import PostWidget from "../../Private/Posts/PostWidget";
import AdvertWidget from "../../widgets/AdvertWidget";
import FriendListWidget from "../../widgets/FriendListWidget";
import { useSelector } from "react-redux";
import ChatLayout from "../chat/index";
import OptionalTab from "../Tabs/Tabs";
import Profile from "../../../../components/Profile/Profile";
import EditProfile from "../../../../components/EditProfile/EditProfile";
import { useGetAllFrdRequestByUserId } from "../../../../hooks/user";

const searchItems = [
  {
    _id: 1,
    name: "Mahendra",
    profilePic:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
  },
  {
    _id: 2,
    name: "Rohit",
    profilePic:
      "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp",
  },
  {
    _id: 2,
    name: "Rohit",
    profilePic:
      "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp",
  },
  {
    _id: 2,
    name: "Rohit",
    profilePic:
      "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp",
  },
  {
    _id: 2,
    name: "Rohit",
    profilePic:
      "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp",
  },
];
import {
  useGetForYouPost,
  useGetFriendsPost,
  useGetNewsPosts,
  useGetPagePost,
  useGetTrendingPosts,
} from "../../../../hooks/posts";
import AddSchedule from "../schedule/AddSchedule";
import ScheduleList from "../schedule/ScheduleList";
import Myqa from "../Qa/MyQaPost";
import { useGetProfile } from "../../../../hooks/profile";
import { useGetAllQa } from "../../../../hooks/qa";
import QaWidget from "../Qa/QaPost";
import PagePost from "../CompanyPage/PagePost";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { userId } = useSelector((state) => state.profile.profileData);
  const chat = useSelector((state) => state.chat);
  const dashboardView = useSelector((state) => state.profile.dashboardView);
  const { data: frdRequestData, isLoading: frdRequestLoading } =
    useGetAllFrdRequestByUserId(userId);

  const { tabView } = useSelector((state) => state.profile);
  const { sideView } = useSelector((state) => state.profile);

  const { data: trendingPost } = useGetTrendingPosts(tabView);
  const { data: friendPostData } = useGetFriendsPost(tabView, { userId });
  const { data: newsPostData } = useGetNewsPosts(tabView);
  const { data: pagePostData } = useGetPagePost(tabView);
  console.log(pagePostData)
  const { data: allQaData } = useGetAllQa(tabView);
  const { data: forYouData } = useGetForYouPost(tabView, {
    state: "Tamilnadu",
    country: "India",
  });
  const { data } = useGetProfile(userId);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="1rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "23%" : undefined}>
          <UserWidget
            image={
              "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
            }
          />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "50%" : undefined}
          mt={isNonMobileScreens ? undefined : "1rem"}
        >
          {(dashboardView === "home" || dashboardView === "news") && (
            <>
              <MyPostWidget />
              {dashboardView === "home" && (
                <Box fullWidth width="100%">
                  <OptionalTab />
                </Box>
              )}
              <Box
                sx={{
                  maxHeight: "45vh",
                  overflowY: "scroll",
                }}
              >
                {tabView === "trending" &&
                  trendingPost &&
                  trendingPost.map((data) => (
                    <PostWidget key={data._id} postData={data} />
                  ))}
                {tabView === "forYou" &&
                  forYouData &&
                  forYouData.map((data) => (
                    <PostWidget key={data._id} postData={data} />
                  ))}
                {tabView === "friend" &&
                  friendPostData &&
                  friendPostData.map((data) => (
                    <PostWidget key={data._id} postData={data} />
                  ))}
                {tabView === "news" &&
                  newsPostData &&
                  newsPostData.map((data) => (
                    <PostWidget key={data._id} postData={data} />
                  ))}
              </Box>
            </>
          )}
          {dashboardView === "schedule" && (
            <Box>
              {data?.pageData != null && <AddSchedule />}
              <ScheduleList />
            </Box>
          )}
          {dashboardView === "profile" && <Profile />}
          {dashboardView === "pages" && (
            <>
              <MyPostWidget />
              <Box
                sx={{
                  maxHeight: "45vh",
                  overflowY: "scroll",
                }}
              >
                {console.log(pagePostData)}
                {
                  pagePostData &&
                  pagePostData.map((data) => (
                    <PostWidget key={data._id} postData={data} />
                  ))}
              </Box>
            </>
          )}
          {dashboardView === "qa" && (
            <>
              <Myqa />
              <Box
                sx={{
                  maxHeight: "45vh",
                  overflowY: "scroll",
                }}
              >
                {
                  allQaData &&
                  allQaData.map((data) => (
                    <QaWidget key={data._id} postData={data} />
                  ))}
              </Box>
            </>
          )}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="25%">
            {sideView === "companyPage" && (
              <>
                <AdvertWidget /> <Box m="2rem 0" />
                <FriendListWidget data={frdRequestData} />
              </>
            )}
            {sideView === "chat" && <ChatLayout />}
            {sideView === "editprofile" && <EditProfile />}
            {sideView === "createcompany" && <CreateCompany />}
            {sideView === "pagesotp" && <PagesOTP />}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
