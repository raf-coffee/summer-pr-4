import { useState } from "react";
import { createPortal } from "react-dom";
import { completeTodo, deleteTodo } from "./store/todos/todosSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Form } from "./Form";

function App() {
  const [showModal, setShowModal] = useState(false);
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleCompleteTodo = (id: string) => {
    dispatch(completeTodo(id));
  };

  return (
    <main className="max-w-7xl mx-auto flex flex-col items-center min-h-dvh">
      <div>
        <button onClick={() => setShowModal(true)}>Добавить задачу</button>
        {showModal &&
          createPortal(
            <Form showModal={showModal} setShowModal={setShowModal} />,
            document.body
          )}
      </div>
      <h2 className="uppercase mt-10 mb-6">Список активных задач:</h2>
      <ul
        role="list"
        className="divide-y divide-gray-100 bg-white border-2 border-slate-600 p-4 rounded-md min-w-[700px]"
      >
        {todos.map((todo) => {
          if (todo.isActive) {
            return (
              <li key={todo.id} className="flex justify-between gap-x-8 py-5">
                <div
                  className="min-w-0 flex-auto"
                  onClick={() => handleCompleteTodo(todo.id)}
                >
                  <p className="font-semibold leading-6 text-gray-900">
                    {todo.title}
                  </p>
                  <p className="mt-1 text-sm truncate leading-5 text-gray-500">
                    {todo.body}
                  </p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              </li>
            );
          }
        })}
      </ul>
      <h2 className="uppercase mt-12 mb-6">Список выполненных задач:</h2>
      <ul
        role="list"
        className="divide-y divide-gray-100 bg-white border-2 border-slate-600 p-4 rounded-md min-w-[700px]"
      >
        {todos.map((todo) => {
          if (!todo.isActive) {
            return (
              <li key={todo.id} className="flex justify-between gap-x-8 py-5">
                <div
                  className="min-w-0 flex-auto"
                  onClick={() => handleCompleteTodo(todo.id)}
                >
                  <p className="font-semibold leading-6 text-gray-900">
                    {todo.title}
                  </p>
                  <p className="mt-1 text-sm truncate leading-5 text-gray-500">
                    {todo.body}
                  </p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </main>
  );
}
export default App;
