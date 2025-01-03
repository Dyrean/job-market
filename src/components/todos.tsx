"use client";

import { useQuery } from "@tanstack/react-query";
import type { Todo } from "@/types/todo";

async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  return res.json();
}

export default function Todos() {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) {
    return <div>Loading todos...</div>;
  }

  if (error) {
    return <div>Error loading todos: {error.message}</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Todos Example with React Query
      </h2>
      <ul className="space-y-2">
        {todos?.slice(0, 5).map((todo) => (
          <li
            key={todo.id}
            className="p-4 rounded-lg bg-white shadow dark:bg-gray-800"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="h-4 w-4"
              />
              <span
                className={todo.completed ? "line-through text-gray-500" : ""}
              >
                {todo.title}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
