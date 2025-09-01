import type User from "../../lib/schemas/userSchema.ts";
import { useChatStore } from "../../store/useChatStore.ts";

interface ChatMiniatureProps {
  user: User;
}

const ChatMiniature = ({ user }: ChatMiniatureProps) => {
  const { selectedChat, selectChat } = useChatStore();
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div
      className={`w-full cursor-pointer duration-150 transition-all rounded-lg flex justify-start gap-2.5 items-center px-2.5 py-1.5 
        ${selectedChat === user ? "bg-label-text" : "bg-secondary_dark"} 
        ${selectedChat !== user ? "hover:bg-spec-1-dark" : ""}
        `}
      onClick={() => selectChat(user)}
    >
      <img
        className="w-12 h-12 rounded-full"
        src={selectedChat?.photoUrl ? selectedChat.photoUrl : "avatar_placeholder.png"}
        alt="user_avatar"
      />
      <h1
        className={`text-md 
          ${selectedChat === user ? "text-secondary_dark" : "text-label-text"}
          `}
      >
        {fullName}
      </h1>
    </div>
  );
};

export default ChatMiniature;
