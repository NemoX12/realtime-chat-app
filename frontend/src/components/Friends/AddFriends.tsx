import { useCallback, useState } from "react";
import { Search } from "lucide-react";

import FoundPerson from "./FoundPerson";
import type User from "../../lib/schemas/userSchema";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import Loader from "../Loader";

const AddFriends = () => {
  const [filteredUsers, setFilteredUsers] = useState<User[] | [] | null>(null);
  const [filter, setFilter] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  const { user: authUser } = useAuthStore();
  const { users, isGettingUsers } = useChatStore();

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      setInputError(null);
      e.preventDefault();
      if (filter === "") return;

      let id = null;

      if (filter.startsWith("#")) {
        if (filter.slice(1).length === 5) {
          id = filter.slice(1);
        } else {
          setInputError("Enter a correct ID or a username");
          return;
        }
      }

      if (!users) return;

      const output = users?.filter((user) => {
        if (!id) {
          const fullName = (user.firstName + " " + user.lastName).toLowerCase();

          //   TODO: prevent from getting symbols as a regexp pattern, like $ or ^
          const pattern = new RegExp(filter.toLowerCase().trim(), "g");

          return pattern.test(fullName) && user._id !== authUser?._id;
        }

        return id === user._id.slice(-5) && user._id !== authUser?._id;
      });

      setFilteredUsers(output);
    },
    [filter, users, authUser?._id]
  );

  return (
    <div className="flex flex-col justify-start items-start w-full h-full">
      <form className="relative w-full" onSubmit={handleSearch}>
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
            onChange={(e) => setFilter(e.target.value)}
          />

          {inputError && (
            <p className="absolute text-red-400 text-sm mt-1">{inputError}</p>
          )}
        </div>

        <button
          type="submit"
          className="duration-100 transition-all absolute top-1/2 -translate-y-1/2 right-0.5 cursor-pointer hover:bg-secondary_dark p-1 rounded-sm"
        >
          {isGettingUsers ? (
            <Loader className="text-label-text" />
          ) : (
            <Search className="text-label-text" />
          )}
        </button>
      </form>
      <div className="mt-6.5 w-full">
        {filteredUsers && (
          <>
            <h1 className="text-label-text text-lg font-semibold ">
              Found {filteredUsers.length} user(s):
            </h1>
            <ul className="overflow-y-auto mt-2.5 max-h-126">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => <FoundPerson key={user._id} user={user} />)
              ) : (
                <h1 className="text-center mt-4 text-label-text text-md">
                  There's no one with this username or an ID
                </h1>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default AddFriends;
