import { useChatStore } from "../../store/useChatStore";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ChatNavbar from "./ChatNavbar";

const Chat = () => {
  const { selectedChat } = useChatStore();

  return (
    <div className="w-full h-full flex flex-col justify-start items-start px-5 py-2.5">
      {selectedChat ? (
        <>
          <ChatNavbar />
          <ChatMessages />
          <ChatInput />
        </>
      ) : (
        <div>no chat</div>
      )}
    </div>
  );
};

export default Chat;
