import Sidebar from "../components/Chat/Sidebar";
import Chat from "../components/Chat/Chat";
import { useChatStore } from "../store/useChatStore";
import ExpandedImage from "../components/Chat/ExpandedImage";

const Home = () => {
  const { selectedImage } = useChatStore();

  return (
    <>
      {selectedImage && <ExpandedImage />}
      <div className="w-full h-full flex">
        <Sidebar />
        <Chat />
      </div>
    </>
  );
};

export default Home;
