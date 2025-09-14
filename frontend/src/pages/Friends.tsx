import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FriendRequests from "../components/Friends/FriendRequests";
import { useChatStore } from "../store/useChatStore";
import { useFriendsStore } from "../store/useFriendsStore";
import ManageFriends from "../components/Friends/ManageFriends";
import { PageContext } from "../context/FriendContext";

const Friends = () => {
  const [selectedPage, setSelectedPage] = useState<"add" | "manage">("add");
  const [screen, setScreen] = useState<number>(0);

  const { getUsers } = useChatStore();
  const { getRequests, getFriends, subscribeFriends, unsubscribeFriends } =
    useFriendsStore();

  const navigate = useNavigate();

  useEffect(() => {
    const screenWidth = document.documentElement.clientWidth;

    setScreen(screenWidth);
  }, []);

  useEffect(() => {
    getUsers();
    getRequests();
    getFriends();

    subscribeFriends();
    return () => unsubscribeFriends();
  }, [getUsers, getRequests, getFriends, subscribeFriends, unsubscribeFriends]);

  return (
    <div className="relative w-full h-full flex sm:justify-between justify-center lg:gap-0 gap-14 p-8">
      <button
        className="duration-150 transition-all absolute top-2.5 left-2.5 cursor-pointer text-label-text hover:text-label-brighter-text"
        onClick={() => navigate("/")}
      >
        <X />
      </button>
      <PageContext.Provider value={{ screen, setSelectedPage }}>
        {screen >= 640 ? (
          <>
            <FriendRequests />
            <ManageFriends />
          </>
        ) : selectedPage === "add" ? (
          <FriendRequests />
        ) : (
          <ManageFriends />
        )}
      </PageContext.Provider>
    </div>
  );
};

export default Friends;
