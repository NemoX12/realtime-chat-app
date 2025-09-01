import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuthStore } from "./store/useAuthStore.ts";

import Home from "./pages/Home.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader.tsx";

const App = () => {
  const { user, checkAuth, isCheckingAuth } = useAuthStore();

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
    <div className="bg-main_dark w-full h-screen flex justify-center items-center font-[Roboto]">
      <Toaster />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to={"/signin"} />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path="/signin" element={!user ? <SignIn /> : <Navigate to={"/"} />} />
      </Routes>
    </div>
  );
};

export default App;
