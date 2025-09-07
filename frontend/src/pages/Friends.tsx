import { useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FriendRequests from "../components/Friends/FriendRequests";
import { useChatStore } from "../store/useChatStore";
import { useFriendsStore } from "../store/useFriendsStore";
import ManageFriends from "../components/Friends/ManageFriends";

const Friends = () => {
  const { getUsers } = useChatStore();
  const { getRequests, getFriends, subscribeFriends, unsubscribeFriends } =
    useFriendsStore();

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    getRequests();
    getFriends();

    subscribeFriends();
    return () => unsubscribeFriends();
  }, [getUsers, getRequests, getFriends, subscribeFriends, unsubscribeFriends]);

  return (
    <div className="relative w-full max-w-7xl h-full max-h-[724px] bg-secondary_dark rounded-xl flex justify-between p-8">
      <button
        className="duration-150 transition-all absolute top-2.5 left-2.5 cursor-pointer text-label-text hover:text-label-brighter-text"
        onClick={() => navigate("/")}
      >
        <X />
      </button>
      <FriendRequests />
      <ManageFriends />
    </div>
  );
};

export default Friends;
