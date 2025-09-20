import { useContext, useState, type ReactNode } from "react";
import AddFriends from "./AddFriends";
import ManageRequests from "./ManageRequests";
import { ArrowRight } from "lucide-react";
import { PageContext } from "../../context/PageContext";

const FriendRequests = () => {
  const [activeTab, setActiveTab] = useState<ReactNode>(<AddFriends />);
  const [activeTabNumber, setActiveTabNumber] = useState<number>(1);

  const pageContext = useContext(PageContext);

  return (
    <div className="lg:max-w-1/3 sm:max-w-1/2 w-full flex flex-col">
      <button
        className="duration-150 transition-all sm:hidden flex text-spec-1-dark mt-2"
        onClick={() => pageContext?.setSelectedPage("manage")}
      >
        Manage your friends <ArrowRight />
      </button>
      <div className="flex my-2">
        <button
          className={`duration-100 transition-all w-full px-1.5 py-2 lg:text-base text-sm bg-secondary_dark hover:bg-spec-1-dark 
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
          className={`duration-100 transition-all w-full px-1.5 py-2 lg:text-base text-sm bg-secondary_dark hover:bg-spec-1-dark 
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
