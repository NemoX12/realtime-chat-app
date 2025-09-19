import { useContext, useState } from "react";
import { Trash2 } from "lucide-react";

import { getHM } from "../../lib/formatDate";
import type messageSchema from "../../lib/schemas/messageSchema";
import { useChatStore } from "../../store/useChatStore";
import { PageContext } from "../../context/PageContext";

interface MessageProps {
  message: messageSchema;
}

const Message = ({ message }: MessageProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const { selectedChat, selectImage, deleteMessage } = useChatStore();
  const pageContext = useContext(PageContext);

  const handleDeleteMessage = () => {
    deleteMessage({ id: message._id });
  };

  return (
    <div
      className={`flex items-center gap-1 ${
        message.receiverId === selectedChat?._id ? "self-end" : "flex-row-reverse"
      } `}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && message.receiverId === selectedChat?._id && (
        <button className="cursor-pointer" onClick={handleDeleteMessage}>
          <Trash2
            size={20}
            className="duration-150 transition-all text-label-text hover:text-label-brighter-text"
          />
        </button>
      )}
      <div
        className={`
        flex flex-col gap-1
        ${message.receiverId === selectedChat?._id ? " items-end" : "items-start"}
    `}
      >
        {message.attachments && (
          <div>
            <img
              src={message.attachments}
              alt="photoattachment"
              className={`${
                pageContext && pageContext.screen.width < 500
                  ? "max-w-48 max-h-38"
                  : "max-w-52 max-h-42"
              } 
              object-cover rounded-lg bg-spec-1-dark p-0.5 cursor-pointer
          ${
            message.content === "" &&
            (message.receiverId === selectedChat?._id
              ? "rounded-br-none"
              : "rounded-bl-none")
          }
          `}
              onClick={() => selectImage(message.attachments)}
            />
            {!message.content && (
              <p className="text-label-text text-xs text-right mt-0.5">
                {getHM({ timestamp: message.createdAt })}
              </p>
            )}
          </div>
        )}
        {message.content !== "" && (
          <div
            className={`px-2.5 py-2 bg-spec-1-dark text-input-text rounded-lg max-w-96 break-words
            ${
              message.receiverId === selectedChat?._id
                ? "rounded-br-none"
                : "rounded-bl-none"
            }
          `}
          >
            <p
              className={`${
                pageContext && pageContext?.screen.width < 500 ? "max-w-30" : "max-w-84"
              }`}
            >
              {message.content}
            </p>
            <p className="text-label-text text-xs text-right">
              {getHM({ timestamp: message.createdAt })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
