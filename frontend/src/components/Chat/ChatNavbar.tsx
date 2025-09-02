import { X } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";

const ChatNavbar = () => {
  const { selectedChat, closeChat } = useChatStore();

  const fullName = `${selectedChat?.firstName} ${selectedChat?.lastName}`;

  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-2.5">
        <img
          className="w-12 h-12 rounded-full"
          src={selectedChat?.photoUrl ? selectedChat.photoUrl : "avatar_placeholder.png"}
          alt="user_avatar"
        />
        <h1 className="text-label-brighter-text">{fullName}</h1>
      </div>
      <button className="text-label-text cursor-pointer" onClick={closeChat}>
        <X />
      </button>
    </div>
  );
};

export default ChatNavbar;
