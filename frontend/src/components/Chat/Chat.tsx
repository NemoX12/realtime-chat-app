import { useContext, useEffect } from "react";

import { useChatStore } from "../../store/useChatStore";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ChatNavbar from "./ChatNavbar";
import { useFriendsStore } from "../../store/useFriendsStore";
import { PageContext } from "../../context/PageContext";

const Chat = () => {
  const { selectedChat } = useChatStore();
  const { subscribeFriends, unsubscribeFriends } = useFriendsStore();

  const pageContext = useContext(PageContext);

  useEffect(() => {
    subscribeFriends();

    return () => unsubscribeFriends();
  });

  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      {selectedChat ? (
        <>
          <ChatNavbar />
          <ChatMessages />
          <ChatInput />
        </>
      ) : (
        <div className="self-center my-auto">
          <h1
            className={`text-label-text 
            ${pageContext && pageContext.screen.width < 500 ? "text-sm" : "text-lg"} 
            font-semibold`}
          >
            Begin chatting by selecting a chat
          </h1>
        </div>
      )}
    </div>
  );
};

export default Chat;
