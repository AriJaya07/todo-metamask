import { DataTodo } from "@/@entity/TodoList";
import axios from "axios";
import { useMutation } from "react-query";

export const MutationAddTask = useMutation(async (newTask: DataTodo) => {
  try {
    const response = await axios.post("/api/todos", newTask);
    if (response.status === 200) {
      return response.data;
    } else {
      return "";
    }
  } catch (error) {
    console.error(error);
    return "";
  }
});

export const MutationUpdateTask = useMutation(
  async ({ id, status }: { id: number; status: string }) => {
    try {
      const response = await axios.put("/api/todos", { id, status });
      if (response.status === 200) {
        return response.data;
      } else {
        return "";
      }
    } catch (error) {
      console.error(error);
      return "";
    }
  }
);

export const MutationDeleteAll = useMutation(async () => {
  try {
    const dataLocal = localStorage.getItem("user");
    if (dataLocal) {
      const userData = JSON.parse(dataLocal);
      const response = await axios.delete("/api/todos", {
        params: { userId: userData.user.id },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return "";
      }
    }
  } catch (error) {
    console.error(error);
    return "";
  }
});
