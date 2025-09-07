import { useCallback, useEffect, useState } from "react";

import { useFriendsStore } from "../../store/useFriendsStore";
import Friend from "./Friend";
import type User from "../../lib/schemas/userSchema";
import { useAuthStore } from "../../store/useAuthStore";

const ManageFriends = () => {
  const { friends } = useFriendsStore();

  const [filteredUsers, setFilteredUsers] = useState<User[] | [] | null>(friends);
  const [filter, setFilter] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  const { user } = useAuthStore();

  const handleSearch = useCallback(() => {
    setInputError(null);

    if (filter === "") {
      setFilteredUsers(friends);
      return;
    }

    let id = null;

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

        //   TODO: prevent from getting symbols as a regexp pattern, like $ or ^
        const pattern = new RegExp(filter.toLowerCase().trim(), "g");

        return pattern.test(fullName) && friend._id !== user?._id;
      }

      return id === friend._id.slice(-5) && friend._id !== user?._id;
    });

    setFilteredUsers(output);
    // TODO: filter added friends
  }, [filter, friends, user?._id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [filter, handleSearch]);

  return (
    <div className="max-w-96 w-full">
      <div className="relative w-full">
        <div>
          <input
            type="text"
            className={`w-full pl-1.5 pr-10 py-2 duration-100 transition-all bg-spec-1-dark placeholder:text-label-text rounded-sm text-sm text-input-text 
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

          {inputError && (
            <p className="absolute text-red-400 text-sm mt-1">{inputError}</p>
          )}
        </div>
      </div>
      <ul className="overflow-y-auto w-full mt-6.5 max-h-150">
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers?.map((friend) => <Friend key={friend._id} friend={friend} />)
        ) : (
          <h1 className="text-center mt-4 text-label-text text-md">
            There's no one with this username or an ID
          </h1>
        )}
      </ul>
    </div>
  );
};

export default ManageFriends;
