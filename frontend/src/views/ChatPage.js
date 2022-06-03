import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import { ChatBox } from "../components/ChatComponent/ChatBox";
import { MyChat } from "../components/ChatComponent/MyChat";
import { SideDrawer } from "../components/ChatComponent/SideDrawer";
import { ChatState } from "../context/ChatProvider";

export const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent={"space-between"}
        width={"100%"}
        height={"91.5vh"}
        p={"10px"}
      >
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};
