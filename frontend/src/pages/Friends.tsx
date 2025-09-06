import { useEffect } from "react";
import FriendRequests from "../components/Friends/FriendRequests";
import { useChatStore } from "../store/useChatStore";
import { useFriendsStore } from "../store/useFriendsStore";

const Friends = () => {
  const { getUsers } = useChatStore();
  const { getRequests, getFriends, subscribeFriends, unsubscribeFriends } =
    useFriendsStore();

  useEffect(() => {
    getUsers();
    getRequests();
    getFriends();

    subscribeFriends();
    return () => unsubscribeFriends();
  }, [getUsers, getRequests, getFriends, subscribeFriends, unsubscribeFriends]);

  return (
    <div className="w-full max-w-7xl h-full max-h-[724px] bg-secondary_dark rounded-xl flex p-3">
      <FriendRequests />
    </div>
  );
};

export default Friends;
