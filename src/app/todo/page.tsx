"use client";

import TodoComp from "@/components/todoComp";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  //   const [todos, setTodos] = useState<Todo[]>([]);

  //   useEffect(() => {
  //     async function fetchTodos() {
  //       const res = await fetch('localhost:3000/api/todos');
  //       const data = await res.json();
  //       setTodos(data.todos);
  //     }

  //     fetchTodos();
  //   }, []);

  return (
    <div>
      <TodoComp />
    </div>
  );
}
