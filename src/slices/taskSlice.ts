import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    viewTask(state, action: PayloadAction<Task>) {
      const updatedTask = action.payload;
      state.tasks = state.tasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      );
    },
  },
});

export const { setTasks, viewTask } = tasksSlice.actions;
export default tasksSlice.reducer;
