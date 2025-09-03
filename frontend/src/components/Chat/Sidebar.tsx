import { useState, useEffect } from "react";
import { LogOut, Settings, UserPlus2 } from "lucide-react";

import ChatMiniature from "./ChatMiniature";
import { useFriendsStore } from "../../store/useFriendsStore";
import { useAuthStore } from "../../store/useAuthStore";
import Loader from "../Loader";

const Sidebar = () => {
  const [filteredFriends, setFilteredFriends] = useState("");

  const { friends, getFriends, isGettingFriends } = useFriendsStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  return (
    <div className="w-full flex flex-col justify-start items-start max-w-64 border-r border-spec-1-dark px-2.5 py-6">
      <div className="mb-2 w-full flex justify-between items-center gap-3 border-b border-spec-1-dark pb-3">
        <input
          type="text"
          placeholder="Find a chat"
          onChange={(e) => setFilteredFriends(e.target.value)}
          className="w-full px-1.5 py-1 duration-100 transition-all bg-spec-1-dark placeholder:text-label-text rounded-sm text-sm text-input-text outline-label-text focus:outline"
        />
        <button
          className="duration-150 transition-all p-1 hover:bg-spec-1-dark rounded-sm cursor-pointer"
          title="Add friend"
          aria-label="Add friend"
        >
          <UserPlus2 className="text-label-text" />
        </button>
      </div>
      <div className="w-full flex flex-1 flex-col justify-start items-center overflow-y-auto">
        {isGettingFriends ? (
          <Loader size={32} className="text-label-text my-auto" />
        ) : friends ? (
          friends
            .filter((friend) => {
              const fullName = `${friend.firstName} ${friend.lastName}`.toLowerCase();
              return fullName.includes(filteredFriends.toLowerCase());
            })
            .map((friend) => <ChatMiniature key={friend._id} user={friend} />)
        ) : (
          "No friends"
        )}
      </div>
      <div className="w-full p-3.5 flex justify-between border-t border-spec-1-dark">
        <button
          className="duration-150 transition-all p-1 rounded-sm hover:bg-spec-1-dark cursor-pointer"
          onClick={logout}
        >
          <LogOut className="text-label-text" />
        </button>
        <button className="duration-150 transition-all p-1 rounded-sm hover:bg-spec-1-dark cursor-pointer">
          <Settings className="text-label-text" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
