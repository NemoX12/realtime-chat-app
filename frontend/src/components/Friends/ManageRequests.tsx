import { useState, useEffect } from "react";
import { useFriendsStore } from "../../store/useFriendsStore";
import { useAuthStore } from "../../store/useAuthStore";
import type Request from "../../lib/schemas/friendRequestSchema";
import IncomingRequest from "./IncomingRequest";

const ManageRequests = () => {
  const [incomingRequests, setIncomingRequests] = useState<Request[] | []>([]);

  const { friendRequests } = useFriendsStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const myRequests = friendRequests?.filter(
      (request) => request.receiverId === user?._id
    );

    if (!myRequests) return;

    setIncomingRequests(myRequests);
  }, [friendRequests, user?._id]);

  return (
    <>
      {incomingRequests.length > 0 ? (
        <ul className="overflow-y-auto h-full">
          {incomingRequests.map((request) => (
            <IncomingRequest key={request._id} request={request} />
          ))}
        </ul>
      ) : (
        <h1 className="text-center my-auto text-label-text text-lg font-semibold">
          You have no incoming requests
        </h1>
      )}
    </>
  );
};

export default ManageRequests;
