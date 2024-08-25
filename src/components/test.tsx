"use client";

import { FormEvent, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import ClearTask from "./manage/clearTask";
import ToastSucc from "./manage/toastSucc";
import ToastFailed from "./manage/toastFailed";
import { DataTodo, TaskActive, ToastShow } from "@/@entity/TodoList";
import LockSign from "./manage/lockSign";
import SuccSign from "./manage/succSign";

interface InputList {
  task: string;
  status: string;
}

export default function Form(props: {
  onClick(): void;
  isAuthenticated: boolean;
  logout(): void;
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

  const queryClient = useQueryClient();

  // Fetch todos
  const { data: filterData = [], refetch } = useQuery(
    "todos",
    async () => {
      const dataLocal = localStorage.getItem("user");
      if (dataLocal) {
        const userData = JSON.parse(dataLocal);
        const response = await axios.get("/api/todos", {
          params: { userId: userData.user.id },
        });
        return response.data.todos;
      }
      return [];
    },
    {
      enabled: props.isAuthenticated,
    }
  );

  // Mutation to add a task
  const mutationAddTask = useMutation(
    async (newTask: DataTodo) => {
      const response = await axios.post("/api/todos", newTask);
      return response.data;
    },
    {
      onSuccess: () => {
        refetch();
        setIsToastShow({ success: true, failed: false });
        setTextInput({ task: "", status: "" });
      },
      onError: () => {
        setIsToastShow({ success: false, failed: true });
      },
    }
  );

  // Mutation to update a task
  const mutationUpdateTask = useMutation(
    async ({ id, status }: { id: number; status: string }) => {
      const response = await axios.put("/api/todos", { id, status });
      return response.data;
    },
    {
      onSuccess: () => {
        refetch();
        setIsToastShow({ success: true, failed: false });
      },
      onError: () => {
        setIsToastShow({ success: false, failed: true });
      },
    }
  );

  // Mutation to delete all tasks
  const mutationDeleteAll = useMutation(
    async () => {
      const dataLocal = localStorage.getItem("user");
      if (dataLocal) {
        const userData = JSON.parse(dataLocal);
        const response = await axios.delete("/api/todos", {
          params: { userId: userData.user.id },
        });
        return response.data;
      }
    },
    {
      onSuccess: () => {
        setIsClearTask(false);
        props.logout();
        localStorage.removeItem("user");
        setIsToastShow({ success: true, failed: false });
      },
      onError: () => {
        setIsToastShow({ success: false, failed: true });
      },
    }
  );

  const handleTaskActive = (key: "all" | "active" | "completed") => {
    setIsTaskActive({
      all: key === "all",
      active: key === "active",
      completed: key === "completed",
    });
  };

  const dataFilterTodo = useMemo(() => {
    if (isTaskActive.all) {
      return filterData;
    } else if (isTaskActive.active) {
      return filterData.filter((item: DataTodo) => item.status === "active");
    } else if (isTaskActive.completed) {
      return filterData.filter((item: DataTodo) => item.status === "completed");
    }
    return filterData;
  }, [filterData, isTaskActive]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const dataLocal = localStorage.getItem("user");
    let userId: number = 0;

    if (dataLocal) {
      const userData = JSON.parse(dataLocal);
      userId = userData.user.id;
    }

    const newTask: DataTodo = {
      userId,
      title: textInput.task,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    mutationAddTask.mutate(newTask);
  };

  const handlePutTodo = (id: number, status: string) => {
    const newStatus = status === "active" ? "active" : "completed";
    mutationUpdateTask.mutate({ id, status: newStatus });
  };

  const handleDeleteAll = () => {
    mutationDeleteAll.mutate();
  };

  const handleCelarTask = () => {
    setIsClearTask(!isClearTask);
  };

  const handleOnChangeInput = (event: any) => {
    const { name, value } = event.target;
    setTextInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnCheckBox = async (id: number, status: string) => {
    const newStatus = status === "active" ? "completed" : "active";
    await handlePutTodo(id, newStatus);
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
            className={`${isTaskActive.all ? "bg-white" : "bg-[#F4F4F5]"} flex flex-row justify-center items-center gap-[1em] px-8 py-3 w-full`}
          >
            <p className="text-center font-[600] text-[1em]">All</p>
            <div className="border border-gray-300 px-2 rounded-xl font-[600] text-[1em]">
              {props.isAuthenticated && filterData && filterData.length > 0 ? (
                <p>{filterData.length}</p>
              ) : (
                <p>0</p>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleTaskActive("active")}
            className={`${isTaskActive.active ? "bg-white" : "bg-[#F4F4F5]"} flex flex-row justify-center items-center gap-[1em] px-8 py-3 w-full`}
          >
            <p className="text-center font-[600] text-[1em]">Active</p>
            <div className="border border-gray-300 px-2 rounded-xl font-[600] text-[1em]">
              {props.isAuthenticated && filterData && filterData.length > 0 ? (
                <p>{filterData.filter((item: DataTodo) => item.status === "active").length}</p>
              ) : (
                <p>0</p>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleTaskActive("completed")}
            className={`${isTaskActive.completed ? "bg-white" : "bg-[#F4F4F5]"} flex flex-row justify-center items-center gap-[1em] px-8 py-3 w-full`}
          >
            <p className="text-center font-[600] text-[1em]">Completed</p>
            <div className="border border-gray-300 px-2 rounded-xl font-[600] text-[1em]">
              {props.isAuthenticated && filterData && filterData.length > 0 ? (
                <p>{filterData.filter((item: DataTodo) => item.status === "completed").length}</p>
              ) : (
                <p>0</p>
              )}
            </div>
          </button>
        </div>
        {isClearTask && (
          <ClearTask
            onClick={handleCelarTask}
            onDeleteAll={handleDeleteAll}
          />
        )}
        <div className="relative mt-2 bg-[#ffffff] p-5 shadow-sm">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="task"
              value={textInput.task}
              onChange={handleOnChangeInput}
              placeholder="Enter your task..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add Task
            </button>
          </form>
          <div className="absolute top-0 right-0 p-2">
            <button
              type="button"
              onClick={handleCelarTask}
              className="text-red-500"
            >
              Clear All
            </button>
          </div>
        </div>
        <div className="mt-5">
          {dataFilterTodo.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            dataFilterTodo.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between p-2 border-b border-gray-200">
                <input
                  type="checkbox"
                  checked={item.status === "completed"}
                  onChange={() => handleOnCheckBox(item.id, item.status)}
                />
                <p className={item.status === "completed" ? "line-through" : ""}>
                  {item.title}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      {isToastShow.success && <ToastSucc />}
      {isToastShow.failed && <ToastFailed />}
    </div>
  );
}
