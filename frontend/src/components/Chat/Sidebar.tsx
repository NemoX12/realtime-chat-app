import { useEffect } from "react";
import { LogOut, Settings } from "lucide-react";

import ChatMiniature from "./ChatMiniature";
import { useFriendsStore } from "../../store/useFriendsStore";
import { useAuthStore } from "../../store/useAuthStore";
import Loader from "../Loader";

const Sidebar = () => {
  const { friends, getFriends, isGettingFriends } = useFriendsStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  return (
    <div className="w-full flex flex-col justify-start items-start max-w-64 border-r border-spec-1-dark px-2.5 py-6">
      <div className="w-full flex flex-1 flex-col justify-start items-center">
        {isGettingFriends ? (
          <Loader size={32} className="text-label-text my-auto" />
        ) : friends ? (
          friends.map((friend) => <ChatMiniature key={friend._id} user={friend} />)
        ) : (
          "No friends"
        )}
      </div>
      <div className="w-full p-3.5  flex justify-between">
        <LogOut
          onClick={logout}
          className="duration-150 transition-all text-label-text hover:text-spec-1-dark cursor-pointer"
        />
        <Settings className="duration-150 transition-all text-label-text hover:text-spec-1-dark cursor-pointer" />
      </div>
    </div>
  );
};

export default Sidebar;
