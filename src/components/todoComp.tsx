"use client";

import { useEffect, useState } from "react";

import Form from "./form";
import Header from "./manage/header";
import Sign from "./manage/sign";

import { connectMetaMask, signMessage } from "@/@utils/auth";
import { ToastShow } from "@/@entity/TodoList";
import ToastSucc from "./manage/toastSucc";
import ToastFailed from "./manage/toastFailed";
import { useAuth } from "./authContext";

const TodoComp: React.FC = () => {
  const { address, isAuthenticated, login, logout } = useAuth();
  const [isSignIn, setIsSign] = useState<boolean>(false);
  const [isSuccLogin, setIsSuccLogin] = useState<boolean>(false);

  const [isToastShow, setIsToastShow] = useState<ToastShow>({
    success: false,
    failed: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      setIsToastShow({
        success: true,
        failed: false,
      });

      setTimeout(() => {
        setIsToastShow({
          success: false,
          failed: false,
        });
      }, 2000);
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    const addr = await connectMetaMask();
    if (addr) {
      const address = `${addr}`;
      const signature = await signMessage(address);
      if (signature) {
        try {
          await login(address, signature);

          setIsSign(false);
        } catch (error) {
          console.error("Error during Axios request:", error);
          setIsToastShow({
            success: false,
            failed: true,
          });
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
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignPopup = () => {
    setIsSign(!isSignIn);
  };

  return (
    <div className="bg-[#ebebec] md:h-screen h-full">
      <Header onClick={handleSignPopup} logout={handleLogout} address={address} />
      <div className="2xl:p-[5em] p-[2em]">
        <Form onClick={handleSignPopup}  isAuthenticated={isAuthenticated} />
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
          <ToastSucc />
        </div>
      )}
      {isToastShow.failed && (
        <div className="fixed bottom-10 right-10 z-[10]">
          <ToastFailed />
        </div>
      )}
    </div>
  );
};

export default TodoComp;
