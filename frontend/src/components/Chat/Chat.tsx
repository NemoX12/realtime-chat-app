import { useChatStore } from "../../store/useChatStore";
import ChatInput from "./ChatInput";

const Chat = () => {
  const { selectedChat } = useChatStore();

  const fullName = `${selectedChat?.firstName} ${selectedChat?.lastName}`;

  return (
    <div className="w-full h-full flex flex-col justify-start items-start px-5 py-2.5">
      {selectedChat ? (
        <>
          <div>
            <div className="flex justify-start items-center gap-2.5">
              <img
                className="w-12 h-12 rounded-full"
                src={
                  selectedChat?.photoUrl
                    ? selectedChat.photoUrl
                    : "avatar_placeholder.png"
                }
                alt="user_avatar"
              />
              <h1 className="text-label-brighter-text">{fullName}</h1>
            </div>
          </div>
          <div className="flex-1">fads</div>

          {/* Chat input */}
          <ChatInput />
        </>
      ) : (
        <div>no chat</div>
      )}
    </div>
  );
};

export default Chat;
