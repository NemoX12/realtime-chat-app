import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useAuthStore } from "./store/useAuthStore.ts";

import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  /* const { user, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(user); */

  return (
    <div className="bg-main_dark w-full h-screen flex justify-center items-center font-[Roboto]">
      <Toaster />
      <Routes>
        {/* <Route path="/" element={<div>Hello, {user?.fullName}</div>} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;
