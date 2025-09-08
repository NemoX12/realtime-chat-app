import { useState, type ReactNode } from "react";
import AddFriends from "./AddFriends";
import ManageRequests from "./ManageRequests";

const FriendRequests = () => {
  const [activeTab, setActiveTab] = useState<ReactNode>(<AddFriends />);
  const [activeTabNumber, setActiveTabNumber] = useState<number>(1);

  return (
    <div className="max-w-96 w-full flex flex-col">
      <div className="flex my-2">
        <button
          className={`duration-100 transition-all w-full px-1.5 py-2 bg-secondary_dark hover:bg-spec-1-dark 
            ${activeTabNumber === 1 ? "bg-spec-1-dark" : ""} 
            text-label-text cursor-pointer`}
          onClick={() => {
            setActiveTab(<AddFriends />);
            setActiveTabNumber(1);
          }}
        >
          Add Friends
        </button>
        <button
          className={`duration-100 transition-all w-full px-1.5 py-2 bg-secondary_dark hover:bg-spec-1-dark 
            ${activeTabNumber === 2 ? "bg-spec-1-dark" : ""}
            text-label-text cursor-pointer`}
          onClick={() => {
            setActiveTab(<ManageRequests />);
            setActiveTabNumber(2);
          }}
        >
          Manage Requests
        </button>
      </div>
      {activeTab}
    </div>
  );
};

export default FriendRequests;
