import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TodosState {
  id: string;
  title: string;
  body: string;
  isActive: boolean;
}

const initialState: TodosState[] = [
  {
    id: uuidv4(),
    title: "Поработать над задачей",
    body: "Ознакомиться с требованиями, найти решение и оформить с краткими пояснениями",
    isActive: true,
  },
  {
    id: uuidv4(),
    title: "Провести встречу с коллегами",
    body: "Обсудить прогресс по текущим задачам",
    isActive: true,
  },
  {
    id: uuidv4(),
    title: "Сходить в спортзал",
    body: "Пресс качат, бегит, турник, анжуманя",
    isActive: true,
  },
];

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodosState>) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find((item) => item.id === action.payload);
      if (todo) {
        todo.isActive = !todo.isActive;
      }
    },
  },
});

export const { addTodo, deleteTodo, completeTodo } = todosSlice.actions;
export default todosSlice.reducer;
