import renderName from "../../lib/renderName.ts";
import type User from "../../lib/schemas/userSchema.ts";
import { useAuthStore } from "../../store/useAuthStore.ts";
import { useChatStore } from "../../store/useChatStore.ts";

interface ChatMiniatureProps {
  user: User;
}

const ChatMiniature = ({ user }: ChatMiniatureProps) => {
  const { onlineUsers } = useAuthStore();
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
      <div className="relative">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={user.photoUrl !== "" ? user.photoUrl : "avatar_placeholder.png"}
          alt="user_avatar"
        />
        {onlineUsers.includes(user._id) && (
          <div className="absolute w-3 h-3 rounded-full bg-green-500 top-9 right-0"></div>
        )}
      </div>
      <h1
        className={`text-md
          ${selectedChat === user ? "text-secondary_dark" : "text-label-text"}
          `}
      >
        {renderName({ text: fullName })}
      </h1>
    </div>
  );
};

export default ChatMiniature;
