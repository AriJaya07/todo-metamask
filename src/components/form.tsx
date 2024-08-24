"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ClearTask from "./manage/clearTask";
import ToastSucc from "./manage/toastSucc";
import ToastFailed from "./manage/toastFailed";
import { DataTodo, TaskActive, ToastShow } from "@/@entity/TodoList";
import LockSign from "./manage/lockSign";
import SuccSign from "./manage/succSign";
import axios from "axios";

interface InputList {
  task: string;
  status: string;
}

export default function Form(props: {
  onCLick(): void;
  isAuthenticated: boolean;
}): JSX.Element {
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
  const [textInput, setTextInput] = useState<InputList>({
    task: "",
    status: "",
  });

  const [filterData, setFilterData] = useState<DataTodo[]>([]);

  const handleTaskActive = (key: "all" | "active" | "completed") => {
    setIsTaskActive({
      all: key === "all",
      active: key === "active",
      completed: key === "completed",
    });
  };

  useEffect(() => {
    if (isTaskActive.all) {
      setFilterData(filterData);
    } else if (isTaskActive.active) {
      setFilterData(filterData.filter((item) => item.status === "active"));
    } else if (isTaskActive.completed) {
      setFilterData(filterData.filter((item) => item.status === "completed"));
    }
  }, [isTaskActive]);

  useEffect(() => {
    if (props.isAuthenticated) {
      setIsTaskActive({
        all: true,
        active: false,
        completed: false,
      });
    }
  }, [props.isAuthenticated]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const dataLocal = localStorage.getItem("user");
    let userId: number = 0;

    if (dataLocal) {
      const userData = JSON.parse(dataLocal);
      userId = userData.user.id;
    }

    const newTask: DataTodo = {
      userId: userId,
      title: textInput.task,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post("/api/todos", newTask);

      if (response.status === 200) {
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
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setIsToastShow({
          success: false,
          failed: false,
        });
      }, 2000);
    }

    setFilterData((prevData) => [...prevData, newTask]);

    setTextInput({
      task: "",
      status: "",
    });
  };

  const handleCelarTask = () => {
    setIsClearTask(!isClearTask);
  };

  const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTextInput((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
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
              {filterData.length}
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
              {filterData.filter((item) => item.status === "active").length}
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
              {filterData.filter((item) => item.status === "completed").length}
            </p>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex md:flex-row flex-col gap-[1em] w-full py-5"
        >
          <div className="w-full">
            <input
              type="text"
              name="task"
              value={textInput.task}
              onChange={handleOnChangeInput}
              placeholder="Add new tasks..."
              className="bg-white p-3.5 rounded-lg w-full"
              disabled={!props.isAuthenticated}
            />
          </div>
          <div className="md:w-1/5 w-full">
            <button
              type="submit"
              disabled={!props.isAuthenticated}
              className="md:text-[1em] text-[0.85em] font-[500] text-nowrap bg-gray-400 md:px-5 px-3 py-3 text-white w-full rounded-lg"
            >
              Add Task
            </button>
          </div>
        </form>

        {!props.isAuthenticated && <LockSign onClick={props.onCLick} />}
        {props.isAuthenticated && (
          <SuccSign data={filterData} setData={setFilterData} />
        )}
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
