import { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import Message from "./Message";
import Loader from "../Loader";
import { getDayLabel } from "../../lib/formatDate";

const ChatMessages = () => {
  const {
    getMessages,
    isGettingMessages,
    messages,
    selectedChat,
    subscribeMessages,
    unsubscribeMessages,
  } = useChatStore();
  const endOfMessages = useRef<HTMLDivElement>(null);

  const firstLoadRef = useRef(true);

  useEffect(() => {
    getMessages({ id: selectedChat?._id });

    subscribeMessages();

    return () => unsubscribeMessages();
  }, [getMessages, selectedChat, subscribeMessages, unsubscribeMessages]);

  useEffect(() => {
    if (!messages) return;

    const behavior = firstLoadRef.current ? "auto" : "smooth";
    endOfMessages.current?.scrollIntoView({ behavior });

    if (firstLoadRef.current) firstLoadRef.current = false;
  }, [messages]);

  if (isGettingMessages) {
    return (
      <div className="w-full flex-1 flex justify-center items-center">
        <Loader size={36} className="text-label-text" />
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <p className="my-auto mx-auto text-lg text-label-text">
        Start your conversation with this user right now
      </p>
    );
  }

  let lastDate: string | null = null;

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="flex-1 px-5 py-2.5 w-full flex flex-col items-start justify-start gap-3.5 overflow-y-auto">
      {sortedMessages.map((message) => {
        const currentDate = getDayLabel(message.createdAt);
        const showDate = currentDate !== lastDate;
        lastDate = currentDate;

        return (
          <div key={message._id} className="w-full flex flex-col items-start">
            {showDate && (
              <div className="my-3 flex items-center w-full">
                <div className="flex-1 border-t border-spec-1-dark" />
                <span className="px-3 text-sm text-label-text">{currentDate}</span>
                <div className="flex-1 border-t border-spec-1-dark" />
              </div>
            )}
            <Message message={message} />
          </div>
        );
      })}
      <div ref={endOfMessages}></div>
    </div>
  );
};

export default ChatMessages;
