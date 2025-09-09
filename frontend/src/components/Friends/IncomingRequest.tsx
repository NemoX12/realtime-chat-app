import { useEffect, useState } from "react";
import { UserCheck, UserX } from "lucide-react";

import type Request from "../../lib/schemas/friendRequestSchema";
import { useChatStore } from "../../store/useChatStore";
import type User from "../../lib/schemas/userSchema";
import { useFriendsStore } from "../../store/useFriendsStore";
import Loader from "../Loader";
import renderName from "../../lib/renderName";

interface IncomingProps {
  request: Request;
}

const IncomingRequest = ({ request }: IncomingProps) => {
  const [sender, setSender] = useState<User | null>(null);
  const { manageRequest, isManagingRequest } = useFriendsStore();
  const { users } = useChatStore();

  const fullName = `${sender?.firstName} ${sender?.lastName}`;

  useEffect(() => {
    if (!users) return;

    const found = users.find((user) => user._id === request.senderId);

    if (!found) return;

    setSender(found);
  }, [request.senderId, users]);

  const handleManageRequest = (action: string) => {
    manageRequest({ action, id: request._id });
  };

  return (
    <li className="border-b border-spec-1-dark px-3 py-3.5 w-full flex justify-between items-center">
      <div className="flex justify-start items-center gap-2.5">
        <img
          src={sender?.photoUrl ? sender.photoUrl : "avatar_placeholder.png"}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h1 className="text-label-brighter-text text-lg">
            {renderName({ text: fullName })}
          </h1>
          <p className="text-label-text text-sm">#{request._id.slice(-5)}</p>
        </div>
      </div>
      <div className="flex justify-end items-center gap-2.5">
        {isManagingRequest === request._id ? (
          <Loader className="text-label-text" />
        ) : (
          <>
            <button
              className="duration-150 transition-all p-1 hover:bg-spec-1-dark rounded-sm cursor-pointer"
              title="Accept Request"
              aria-label="Accept Request"
              onClick={() => handleManageRequest("accept")}
            >
              <UserCheck className="text-label-text" />
            </button>
            <button
              className="duration-150 transition-all p-1 hover:bg-spec-1-dark rounded-sm cursor-pointer"
              title="Decline Request"
              aria-label="Decline Request"
              onClick={() => handleManageRequest("decline")}
            >
              <UserX className="text-label-text" />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default IncomingRequest;
