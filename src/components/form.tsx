"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import ClearTask from "./manage/clearTask";
import ToastSucc from "./manage/toastSucc";
import ToastFailed from "./manage/toastFailed";
import { DataTodo, TaskActive, ToastShow } from "@/@entity/TodoList";
import LockSign from "./manage/lockSign";
import SuccSign from "./manage/succSign";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

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

  const { data: filterData = [], refetch } = useQuery(
    "todos",
    async () => {
      try {
        const dataLocal = localStorage.getItem("user");
        if (dataLocal) {
          const userData = JSON.parse(dataLocal);
          const response = await axios.get("/api/todos", {
            params: { userId: userData.user.id },
          });

          if (response.status === 200) {
            return response.data.todos;
          } else {
            return [];
          }
        }
        return [];
      } catch (error) {
        console.error(error);
      }
    },
    {
      enabled: props.isAuthenticated,
    }
  );

  // Mutation to add a task
  const MutationAddTask = useMutation(
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
  const MutationUpdateTask = useMutation(
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
  const MutationDeleteAll = useMutation(
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
      },
      onError: () => {
        console.error("internal server error");
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
      status: isTaskActive.all
        ? "active"
        : isTaskActive.active
        ? "active"
        : isTaskActive.completed
        ? "completed"
        : "active",
      createdAt: new Date().toISOString(),
    };

    try {
      MutationAddTask.mutate(newTask);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsToastShow({
          success: false,
          failed: false,
        });
      }, 2000);
    }

    setTextInput({
      task: "",
      status: "",
    });
  };

  const handlePutTodo = async (id: number, status: string) => {
    const newStatus = status === "active" ? "active" : "completed";

    try {
      MutationUpdateTask.mutate({ id, status: newStatus });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsToastShow({
          success: false,
          failed: false,
        });
      }, 2000);
    }
  };

  const handleDeleteAll = async () => {
    setIsClearTask(true);

    try {
      MutationDeleteAll.mutate();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCelarTask = () => {
    setIsClearTask(!isClearTask);
  };

  const handleOnChangeInput = (event: any) => {
    const { name, value } = event.target;
    setTextInput((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnCheckBox = async (id: number, status: string) => {
    const newStatus = status === "active" ? "active" : "completed";

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
            className={`${
              props.isAuthenticated && isTaskActive.all
                ? "bg-white"
                : "bg-[#F4F4F5]"
            } flex flex-row justify-center items-center gap-[1em] px-8 py-3 w-full`}
            disabled={!props.isAuthenticated}
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
            className={`${
              props.isAuthenticated && isTaskActive.active
                ? "bg-white"
                : "bg-[#F4F4F5]"
            } flex flex-row justify-center items-center gap-[1em] px-8 py-3 w-full`}
            disabled={!props.isAuthenticated}
          >
            <p className="text-center font-[600] text-[1em]">Active</p>
            <div className="border border-gray-300 px-2 rounded-xl font-[600] text-[1em]">
              {props.isAuthenticated && filterData && filterData.length > 0 ? (
                <p>
                  {
                    filterData.filter(
                      (item: DataTodo) => item.status === "active"
                    ).length
                  }
                </p>
              ) : (
                <p>0</p>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleTaskActive("completed")}
            className={`${
              props.isAuthenticated && isTaskActive.completed
                ? "bg-white"
                : "bg-[#F4F4F5]"
            } flex flex-row justify-center items-center gap-[1em] px-8 py-3 w-full`}
            disabled={!props.isAuthenticated}
          >
            <p className="text-center font-[600] text-[1em]">Completed</p>
            <div className="border border-gray-300 px-2 rounded-xl font-[600] text-[1em]">
              {props.isAuthenticated && filterData && filterData.length > 0 ? (
                <p>
                  {/* Count items where status is "active" */}
                  {
                    filterData.filter(
                      (item: DataTodo) => item.status === "completed"
                    ).length
                  }
                </p>
              ) : (
                <p>0</p>
              )}
            </div>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex md:flex-row flex-col gap-[1em] w-full py-5"
        >
          <div className="w-full">
            <div className="flex flex-col gap-[1em]">
              <input
                type="text"
                name="task"
                value={textInput.task}
                onChange={handleOnChangeInput}
                placeholder="Add new tasks..."
                className="bg-white p-3 rounded-lg w-full focus:outline-none"
                disabled={!props.isAuthenticated}
                required
              />
              <div className="w-full">
                {props.isAuthenticated &&
                filterData &&
                filterData.length > 0 ? (
                  <div className="">
                    {isTaskActive.all ? (
                      <span className="flex flex-row gap-[0.5em] text-[0.85em] font-[400]">
                        Active Task{" "}
                        <p className="bg-black px-2.5 py-0.5 rounded-xl text-[0.75em] font-[500] text-white">
                          {
                            filterData.filter(
                              (item: DataTodo) => item.status === "active"
                            ).length
                          }
                        </p>
                      </span>
                    ) : isTaskActive.active ? (
                      <span className="flex flex-row gap-[0.5em] text-[0.85em] font-[400]">
                        Active Task{" "}
                        <p className="bg-black px-2.5 py-0.5 rounded-xl text-[0.75em] font-[500] text-white">
                          {
                            filterData.filter(
                              (item: DataTodo) => item.status === "active"
                            ).length
                          }
                        </p>
                      </span>
                    ) : isTaskActive.completed ? (
                      <span className="flex flex-row gap-[0.5em] text-[0.85em] font-[400]">
                        Completed Task{" "}
                        <p className="bg-black px-2.5 py-0.5 rounded-xl text-[0.75em] font-[500] text-white">
                          {
                            filterData.filter(
                              (item: DataTodo) => item.status === "completed"
                            ).length
                          }
                        </p>
                      </span>
                    ) : (
                      ""
                    )}{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-[1em] md:w-1/5 w-full">
            <button
              type="submit"
              disabled={!props.isAuthenticated}
              className="md:text-[1em] text-[0.85em] font-[500] text-nowrap bg-gray-400 md:px-5 px-3 py-3 text-white w-full rounded-lg"
            >
              Add Task
            </button>
            {props.isAuthenticated && filterData && filterData.length > 0 ? (
              <button
                type="button"
                onClick={handleCelarTask}
                className="text-[0.85em] text-black font-[500]"
                disabled={!props.isAuthenticated}
              >
                Clear Completed
              </button>
            ) : (
              ""
            )}
          </div>
        </form>

        {!props.isAuthenticated && <LockSign onClick={props.onClick} />}
        {props.isAuthenticated && (
          <SuccSign data={dataFilterTodo} setData={handleOnCheckBox} />
        )}
      </div>

      {isClearTask && (
        <ClearTask onClick={handleCelarTask} onDeleteAll={handleDeleteAll} />
      )}
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
