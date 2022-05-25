import { Box, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./Profile";
import { useNavigate } from "react-router-dom";

export const SideDrawer = () => {
  const { user } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const navigator = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigator("/");
  };
  return (
    <Box
      display={"flex"}
      justifyContent="space-between"
      alignContent={"center"}
      bg={"white"}
      width="100%"
      p={" 5px 10px 5 px 10px"}
      borderWidth="5px"
    >
      {/* <Tooltip label="Search users to chat" hasArrow placement="botton-end"> */}
      <Button variant={"ghost"}>
        <i className="fas fa-search"></i>
        <Text d={{ base: "none", md: "flex" }} px={4}>
          Search User
        </Text>
      </Button>
      {/* </Tooltip> */}
      <Text fontSize="2xl" fontWeight={"bold"} fontFamily="Work sans">
        MERN Chat App
      </Text>
      <div>
        <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize="2xl" m={1} />
          </MenuButton>
          {/* <MenuList></MenuList> */}
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar
              size="sm"
              cursor={"pointer"}
              name={user.name}
              src={user.picture}
            />
          </MenuButton>
          <MenuList>
            <ProfileModal user={user}>
              <MenuItem>My Profile</MenuItem>{" "}
            </ProfileModal>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
  );
};
