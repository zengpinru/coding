// 利用 hooks 实现一个小型的 redux
import { createContext, useReducer, useContext } from "react";

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

function reducer(state, aciton) {
  return state;
}

const initValue = {};

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

export default function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initValue);
  return (
    <TasksContext.Provider value={state}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
