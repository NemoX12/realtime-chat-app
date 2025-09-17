import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuthStore } from "./store/useAuthStore.ts";
import { PageContext } from "./context/PageContext.ts";

import Home from "./pages/Home.tsx";
import Friends from "./pages/Friends.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader.tsx";
import Settings from "./pages/Settings.tsx";

const App = () => {
  // selectedPage - responds for selected page in friends page on small devices
  const [selectedPage, setSelectedPage] = useState<"add" | "manage">("add");
  const [screen, setScreen] = useState<number>(0);

  const { user, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    const screenWidth = document.documentElement.clientWidth;

    setScreen(screenWidth);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !user) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-main_dark">
        <Loader size={48} className="text-label-brighter-text" />
      </div>
    );
  }

  return (
    <PageContext.Provider value={{ screen, selectedPage, setSelectedPage }}>
      <div className="bg-main_dark w-full h-screen flex justify-center items-center font-[Roboto]">
        <Toaster />

        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to={"/signin"} />} />
          <Route
            path="/friends"
            element={user ? <Friends /> : <Navigate to={"/signin"} />}
          />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Navigate to={"/signin"} />}
          />
          <Route path="/signup" element={!user ? <SignUp /> : <Navigate to={"/"} />} />
          <Route path="/signin" element={!user ? <SignIn /> : <Navigate to={"/"} />} />
        </Routes>
      </div>
    </PageContext.Provider>
  );
};

export default App;
