"use client";

import { useState } from "react";
import Sign from "./sign";
import ClearTask from "./clearTask";
import ToastSucc from "./toastSucc";
import ToastFailed from "./toastFailed";
import { TaskActive, ToastShow } from "@/@entity/TodoList";

export default function Form(props: { onCLick(): void }): JSX.Element {
  const [isTaskActive, setIsTaskActive] = useState<TaskActive>({
    all: false,
    active: false,
    completed: false,
  });
  const [isToastShow, setIsToastShow] = useState<ToastShow>({
    success: false,
    failed: false,
  });
  const [isClearTask, setIsClearTask] = useState<boolean>(false);

  const handleTaskActive = (key: "all" | "active" | "completed") => {
    setIsTaskActive({
      all: key === "all",
      active: key === "active",
      completed: key === "completed",
    });
  };

  const handleCelarTask = () => {
    setIsClearTask(!isClearTask);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="lg:w-1/2 w-full">
        <div className="p-5">
          <h5 className="text-[1.5em] font-[600]">Your Tasks</h5>
        </div>
        <div className="flex md:flex-row flex-col border border-gray-300 bg-[#F4F4F5] p-1">
          <button
            type="button"
            onClick={() => handleTaskActive("all")}
            className={`${
              isTaskActive.all ? "bg-white" : "bg-[#F4F4F5]"
            } flex flex-row justify-center items-center gap-[1em] px-8 py-3 w-full`}
          >
            <p className="text-center font-[600] text-[1em]">All</p>
            <p className="border border-gray-300 px-2 rounded-xl font-[600] text-[1em]">
              0
            </p>
          </button>
          <button
            type="button"
            onClick={() => handleTaskActive("active")}
            className={`${
              isTaskActive.active ? "bg-white" : "bg-[#F4F4F5]"
            } flex flex-row justify-center items-center gap-[1em] px-8 py-3 w-full`}
          >
            <p className="text-center font-[600] text-[1em]">Active</p>
            <p className="border border-gray-300 px-2 rounded-xl font-[600] text-[1em]">
              0
            </p>
          </button>
          <button
            type="button"
            onClick={() => handleTaskActive("completed")}
            className={`${
              isTaskActive.completed ? "bg-white" : "bg-[#F4F4F5]"
            } flex flex-row justify-center items-center gap-[1em] px-8 py-3 w-full`}
          >
            <p className="text-center font-[600] text-[1em]">Completed</p>
            <p className="border border-gray-300 px-2 rounded-xl font-[600] text-[1em]">
              0
            </p>
          </button>
        </div>

        <div className="flex md:flex-row flex-col gap-[1em] w-full py-5">
          <div className="w-full">
            <input
              type="text"
              placeholder="Add new tasks..."
              className="bg-white p-3.5 rounded-lg w-full"
            />
          </div>
          <div className="md:w-1/5 w-full">
            <button
              type="button"
              className="md:text-[1em] text-[0.85em] font-[500] text-nowrap bg-gray-400 md:px-5 px-3 py-3 text-white w-full rounded-lg"
            >
              Add Task
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full border border-gray-300 bg-[#F4F4F5] rounded-lg p-10 gap-[1em]">
          <div className="">
            <img src="images/lock.png" alt="lock" className="w-[5em]" />
          </div>
          <div className="flex flex-col justify-center items-center gap-[0.5em]">
            <p className="text-[1em] text-black">Sign in Required</p>
            <p className="text-[0.85em] text-gray-500">
              Hold on! You need to Sign In to create a task.
            </p>
            <div className="">
              <button
                type="button"
                onClick={props.onCLick}
                className="bg-black px-6 py-2 rounded-xl font-[400] text-[1em] text-white"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {isClearTask && <ClearTask onCLick={handleCelarTask} />}
      {isToastShow.success && (
        <div className="fixed bottom-10 md:right-7 z-[10]">
          <ToastSucc />
        </div>
      )}
      {isToastShow.failed && (
        <div className="fixed bottom-10 md:right-7 z-[10]">
          <ToastFailed />
        </div>
      )}
    </div>
  );
}
