"use client";

import { useState } from "react";
import Form from "./manage/form";
import Header from "./manage/header";
import Sign from "./manage/sign";

export default function TodoComp(): JSX.Element {
  const [isSignIn, setIsSign] = useState<boolean>(false);
  const handleSignPopup = () => {
    setIsSign(!isSignIn);
  };
  return (
    <div className="bg-[#ebebec] h-screen">
      <Header onClick={handleSignPopup} />
      <div className="p-[5em]">
        <Form onCLick={handleSignPopup} />
      </div>
      {isSignIn && <Sign onClick={handleSignPopup} />}
    </div>
  );
}
