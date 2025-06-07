"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import axios from "axios";

import ChartTask from "./manage/chartTask";
import ClearTask from "./manage/clearTask";
import ToastSucc from "./manage/toastSucc";
import ToastFailed from "./manage/toastFailed";
import LockSign from "./manage/lockSign";
import SuccSign from "./manage/succSign";
import { DataTodo, TaskActive, ToastShow } from "@/@entity/TodoList";

export default function Form(props: {
  onClick(): void;
  isAuthenticated: boolean;
  logout(): void;
}): JSX.Element {
  const { register, handleSubmit, reset } = useForm();

  const [isTaskActive, setIsTaskActive] = useState<TaskActive>({
    all: false,
    active: false,
    completed: false,
    chart: false,
  });

  const [isToastShow, setIsToastShow] = useState<ToastShow>({
    success: false,
    failed: false,
  });

  const [isClearTask, setIsClearTask] = useState<boolean>(false);
  const [textToast, setTextToast] = useState<string[]>(["", ""]);

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
        setTextToast([
          "Create Task Successfully",
          "All Done! Your task was successfully created",
        ]);
      },
      onError: () => {
        setIsToastShow({ success: false, failed: true });
        setTextToast([
          "Error Creating Task",
          "Oops! Something went wrong. Unable to create task.",
        ]);
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
        setTextToast([
          "Update Task Successfully",
          "All Done! Your task was successfully updated",
        ]);
      },
      onError: () => {
        setIsToastShow({ success: false, failed: true });
        setTextToast([
          "Error Creating Task",
          "Oops! Something went wrong. Unable to update task.",
        ]);
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
        setIsToastShow({ success: true, failed: false });
        setTextToast([
          "Delete User Successfully",
          "All Done! Your user was successfully delete",
        ]);
      },
      onError: () => {
        setIsToastShow({ success: false, failed: true });
        setTextToast([
          "Error Delete User",
          "Oops! Something went wrong. Unable to delete user.",
        ]);
      },
    }
  );

  const handleTaskActive = (key: "all" | "active" | "completed" | "chart") => {
    setIsTaskActive({
      all: key === "all",
      active: key === "active",
      completed: key === "completed",
      chart: key === "chart",
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
        chart: false,
      });
    }
  }, [props.isAuthenticated]);

  const onSubmit = async (data: any) => {
    const dataLocal = localStorage.getItem("user");
    let userId: number = 0;

    if (dataLocal) {
      const userData = JSON.parse(dataLocal);
      userId = userData.user.id;
    }

    const newTask: DataTodo = {
      userId: userId,
      title: data.task,
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

    reset({ task: "" });
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
    } finally {
      setTimeout(() => {
        setIsToastShow({
          success: false,
          failed: false,
        });
      }, 2000);
    }
  };

  const handleCelarTask = () => {
    setIsClearTask(!isClearTask);
  };

  const handleOnCheckBox = async (id: number, status: string) => {
    const newStatus = status === "active" ? "active" : "completed";

    await handlePutTodo(id, newStatus);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-[5rem] lg:w-3/4 w-full">
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
          <button
            type="button"
            onClick={() => handleTaskActive("chart")}
            className={`${
              props.isAuthenticated && isTaskActive.chart
                ? "bg-white"
                : "bg-[#F4F4F5]"
            } flex flex-row justify-center items-center gap-[1em] px-8 py-3 w-full`}
            disabled={!props.isAuthenticated}
          >
            <p className="text-center font-[600] text-[1em]">Chart</p>
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="flex md:flex-row flex-col gap-[1em] w-full py-5"
        >
          <div className="w-full">
            <div className="flex md:flex-col flex-col-reverse gap-[1em]">
              <input
                type="text"
                {...register("task", { required: true })}
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
        {props.isAuthenticated &&
          (!isTaskActive.chart ? (
            <SuccSign data={dataFilterTodo} setData={handleOnCheckBox} />
          ) : (
            <ChartTask filterData={filterData} />
          ))}
      </div>

      {isClearTask && (
        <ClearTask onClick={handleCelarTask} onDeleteAll={handleDeleteAll} />
      )}
      {isToastShow.success && (
        <div className="fixed bottom-10 md:right-7 z-[10]">
          <ToastSucc message={textToast} />
        </div>
      )}
      {isToastShow.failed && (
        <div className="fixed bottom-10 md:right-7 z-[10]">
          <ToastFailed message={textToast} />
        </div>
      )}
    </div>
  );
}
