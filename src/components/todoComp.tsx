"use client";

import { useState } from "react";
import axios from "axios";

import Form from "./manage/form";
import Header from "./manage/header";
import Sign from "./manage/sign";

import { connectMetaMask, signMessage } from "@/@utils/auth";
import { ToastShow } from "@/@entity/TodoList";
import ToastSucc from "./manage/toastSucc";
import ToastFailed from "./manage/toastFailed";

export default function TodoComp(): JSX.Element {
  const [isSignIn, setIsSign] = useState<boolean>(false);

  const [isToastShow, setIsToastShow] = useState<ToastShow>({
    success: false,
    failed: false,
  });

  const [address, setAddress] = useState<any>(null);

  const handleLogin = async () => {
    const addr = await connectMetaMask();
    if (addr) {
      setAddress(addr);
      const address = `${addr}`;
      const signature = await signMessage(address);
      try {
        const res = await axios.post('/api/auth', { address, signature });
  
        // Axios automatically parses JSON responses
        // console.log(res, "Response Data");
  
        if (res.status === 200) {
          setIsToastShow({
            success: true,
            failed: false,
          });
        } else {
          setIsToastShow({
            success: false,
            failed: true,
          });
        }
  
        setTimeout(() => {
          setIsToastShow({
            success: false,
            failed: false,
          });
        }, 2000);
        setIsSign(false);
      } catch (error) {
        console.error("Error during Axios request:", error);
        setIsToastShow({
          success: false,
          failed: true,
        });
      }
    }
  };

  const handleSignPopup = () => {
    setIsSign(!isSignIn);
  };
  return (
    <div className="bg-[#ebebec] md:h-screen h-full">
      <Header onClick={handleSignPopup} address={address} />
      <div className="2xl:p-[5em] p-[2em]">
        <Form onCLick={handleSignPopup} />
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
}