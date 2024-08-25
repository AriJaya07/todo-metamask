"use client";

import { useState } from "react";

import Form from "./form";
import Header from "./manage/header";
import Sign from "./manage/sign";
import ToastSucc from "./manage/toastSucc";
import ToastFailed from "./manage/toastFailed";
import { useAuth } from "./authContext";
import { ToastShow } from "@/@entity/TodoList";
import { connectMetaMask, signMessage } from "@/@utils/auth";

const TodoComp: React.FC = () => {
  const { address, isAuthenticated, login, logout } = useAuth();
  const [isSignIn, setIsSign] = useState<boolean>(false);

  const [isToastShow, setIsToastShow] = useState<ToastShow>({
    success: false,
    failed: false,
  });

  const [textToast, setTextToast] = useState<string[]>(["", ""]);

  const handleLogin = async () => {
    const addr = await connectMetaMask();
    if (addr) {
      const address = `${addr}`;
      const signature = await signMessage(address);
      if (signature) {
        try {
          await login(address, signature);
          setIsSign(false);

          setIsToastShow({ success: true, failed: false });
          setTextToast([
            "Login User Successfully",
            "All Done! Your user was successfully login",
          ]);
        } catch (error) {
          console.error("Error during Axios request:", error);

          setIsToastShow({ success: false, failed: true });
          setTextToast([
            "Error Login User",
            "Oops! Something went wrong. Unable to login user.",
          ]);
        } finally {
          setTimeout(() => {
            setIsToastShow({
              success: false,
              failed: false,
            });
          }, 2000);
        }
      }
    }
  };

  const handleLogout = () => {
    try {
      logout();

      setIsToastShow({ success: true, failed: false });
      setTextToast([
        "Logout User Successfully",
        "All Done! Your account was successfully logout",
      ]);
    } catch (e) {
      console.error(e);

      setIsToastShow({ success: false, failed: true });
      setTextToast([
        "Error Logout User",
        "Oops! Something went wrong. Unable to logout account.",
      ]);
    } finally {
      setTimeout(() => {
        setIsToastShow({
          success: false,
          failed: false,
        });
      }, 2000);
    }
  };

  const handleSignPopup = () => {
    setIsSign(!isSignIn);
  };

  return (
    <div className="bg-[#ebebec] min-h-screen">
      <Header
        onClick={handleSignPopup}
        logout={handleLogout}
        address={address}
      />
      <div className="2xl:p-[5em] p-[2em]">
        <Form
          onClick={handleSignPopup}
          isAuthenticated={isAuthenticated}
          logout={logout}
        />
      </div>

      {isSignIn && (
        <Sign
          onClick={handleSignPopup}
          handleLogin={handleLogin}
          address={address}
        />
      )}

      {isToastShow.success && (
        <div className="fixed bottom-10 right-10 z-[10]">
          <ToastSucc message={textToast} />
        </div>
      )}
      {isToastShow.failed && (
        <div className="fixed bottom-10 right-10 z-[10]">
          <ToastFailed message={textToast} />
        </div>
      )}
    </div>
  );
};

export default TodoComp;
