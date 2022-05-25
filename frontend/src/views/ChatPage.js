import { Box } from "@chakra-ui/layout";
import React from "react";
import { ChatBox } from "../components/ChatComponent/ChatBox";
import { MyChat } from "../components/ChatComponent/MyChat";
import { SideDrawer } from "../components/ChatComponent/SideDrawer";
import { ChatState } from "../context/ChatProvider";

export const ChatPage = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        h={"91.5vh"}
        p={"10px"}
      >
        {user && <MyChat />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};
