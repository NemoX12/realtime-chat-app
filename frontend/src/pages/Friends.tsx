import { useEffect, useContext } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FriendRequests from "../components/Friends/FriendRequests";
import { useChatStore } from "../store/useChatStore";
import { useFriendsStore } from "../store/useFriendsStore";
import ManageFriends from "../components/Friends/ManageFriends";
import { PageContext } from "../context/PageContext";

const Friends = () => {
  const { getUsers } = useChatStore();
  const { getRequests, getFriends, subscribeFriends, unsubscribeFriends } =
    useFriendsStore();

  const pageContext = useContext(PageContext);

  const navigate = useNavigate();

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
      {pageContext && pageContext.screen >= 640 ? (
        <>
          <FriendRequests />
          <ManageFriends />
        </>
      ) : pageContext && pageContext.selectedPage === "add" ? (
        <FriendRequests />
      ) : (
        <ManageFriends />
      )}
    </div>
  );
};

export default Friends;
