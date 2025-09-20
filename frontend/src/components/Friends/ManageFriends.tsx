import { useCallback, useContext, useEffect, useState } from "react";

import { useFriendsStore } from "../../store/useFriendsStore";
import Friend from "./Friend";
import type User from "../../lib/schemas/userSchema";
import { useAuthStore } from "../../store/useAuthStore";
import { PageContext } from "../../context/PageContext";
import { ArrowRight } from "lucide-react";

const ManageFriends = () => {
  const { friends } = useFriendsStore();

  const [filteredUsers, setFilteredUsers] = useState<User[] | [] | null>(friends);
  const [filter, setFilter] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  const { user } = useAuthStore();

  const pageContext = useContext(PageContext);

  const handleSearch = useCallback(() => {
    setInputError(null);

    if (filter === "") {
      setFilteredUsers(friends);
      return;
    }

    let id: string | null = null;

    if (filter.startsWith("#")) {
      if (filter.slice(1).length === 5) {
        id = filter.slice(1);
      } else {
        setInputError("Enter a correct ID or a username");
        return;
      }
    }

    if (!friends) return;

    const output = friends?.filter((friend) => {
      if (!id) {
        const fullName = (friend.firstName + " " + friend.lastName).toLowerCase();
        const searchTerm = filter.toLowerCase().trim();

        return fullName.includes(searchTerm) && friend._id !== user?._id;
      }

      return id === friend._id.slice(-5) && friend._id !== user?._id;
    });

    setFilteredUsers(output);
  }, [filter, friends, user?._id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timeout);
  }, [filter, handleSearch]);

  return (
    <div className="lg:max-w-1/3 sm:max-w-1/2 w-full h-full overflow-hidden">
      <button
        className="duration-150 transition-all sm:hidden flex text-spec-1-dark mt-2"
        onClick={() => pageContext?.setSelectedPage("add")}
      >
        Manage your friends <ArrowRight />
      </button>
      <div className="relative w-full sm:mt-0 mt-2 p-0.5">
        <input
          type="text"
          className={`w-full pl-1.5 pr-10 py-2 duration-100 transition-all bg-secondary_dark placeholder:text-label-text rounded-sm text-sm text-input-text 
                ${
                  inputError
                    ? "outline outline-red-400"
                    : "focus:outline outline-label-text"
                } 
                `}
          placeholder="Search by username or id #00000"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />

        {inputError && <p className="absolute text-red-400 text-sm mt-1">{inputError}</p>}
      </div>
      <div className="flex flex-col flex-1 min-h-0">
        <ul className="flex-1 overflow-y-auto min-h-0">
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers?.map((friend) => <Friend friend={friend} key={friend} />)
          ) : (
            <h1 className="text-center mt-4 text-label-text text-md">
              There's no one with this username or an ID
            </h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ManageFriends;
