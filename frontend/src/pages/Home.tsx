import Sidebar from "../components/Chat/Sidebar";
import Chat from "../components/Chat/Chat";

const Home = () => {
  return (
    <div className="w-full max-w-7xl h-full max-h-[724px] bg-secondary_dark rounded-xl flex">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Home;
