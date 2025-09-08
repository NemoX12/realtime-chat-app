import { useRef, useState } from "react";
import { Paperclip, Send, X } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import Loader from "../Loader";

interface MessageProps {
  receiverId: string | null;
  content: string;
}

const ChatInput = () => {
  const [messageContent, setMessageContent] = useState<MessageProps>({
    receiverId: null,
    content: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { selectedChat, isSendingMessage, sendMessage } = useChatStore();

  const handleInput = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const lineHeight = 22;
      const maxHeight = lineHeight * 3;
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    }
    setMessageContent((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = () => {
    if (!selectedChat) return;

    if (!imagePreview && messageContent.content === "") return;

    const messageToSend = {
      receiverId: selectedChat._id,
      content: messageContent.content,
      attachments: imagePreview,
    };

    sendMessage(messageToSend);

    setMessageContent({
      receiverId: null,
      content: "",
    });
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full relative flex flex-col items-stretch px-5 py-2.5">
      {imagePreview && (
        <div className="mb-2 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview"
              className="max-h-32 rounded-lg border border-spec-1-dark"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 cursor-pointer"
              aria-label="remove image"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        </div>
      )}
      <div className="w-full relative flex items-center">
        <textarea
          ref={textareaRef}
          rows={1}
          value={messageContent.content}
          onChange={(e) => handleInput(e)}
          placeholder="Message..."
          className="flex-1 min-h-[44px] px-3 py-2 pr-24 rounded-lg bg-spec-1-dark text-input-text text-sm placeholder:text-secondary_dark outline-none resize-none leading-relaxed no-scrollbar"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <Paperclip
              size={22}
              className="text-label-text cursor-pointer hover:text-label-brighter-text duration-150 transition-all"
            />
          </button>
          <button
            type="button"
            className="bg-label-brighter-text hover:bg-label-text p-1.5 rounded-sm text-spec-1-dark cursor-pointer hover:-spec-1-dark duration-150 transition-all"
            onClick={handleSendMessage}
          >
            {isSendingMessage ? <Loader /> : <Send size={22} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
