import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      taskName: "test_task",
      taskId: "test",
      status: "pending", //pending (when not started), ongoing (when started || resumed), paused (when started but paused), completed (when task is finished)
      timeAssigned: 100000, //total time asssigned in ms
      timeRemaining: 100000, //time remaining (timeAssigned - timeDedicated)
    },
    {
      taskName: "test_task_2",
      taskId: "test2",
      status: "pending", //pending, ongoing, paused
      timeAssigned: 1000, //total time asssigned in ms
      timeRemaining: 1000, //time remaining (timeAssigned - timeDedicated)
    },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTask = {
        taskName: null,
        taskId: null,
        status: "pending", //pending, ongoing, paused
        timeAssigned: null, //total time asssigned in ms
        timeRemaining: null, //time remaining (timeAssigned - timeDedicated)
      };

      state.tasks = [{ ...newTask, ...action.payload }, ...state.tasks];
    },
    editTodo: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.taskId == action.payload.taskId
          ? { ...task, taskName: action.payload.taskName }
          : task
      );
    },
    deleteTodo: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.taskId != action.payload);
    },

    editStatus: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.taskId == action.payload.taskId
          ? { ...task, status: action.payload.status }
          : task
      );
    },
    reduceTime: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.status == "ongoing") {
          const newTimeRemaining = task.timeRemaining - 1000;
          return { ...task, timeRemaining: newTimeRemaining };
        } else return task;
      });
    },
  },
});

export const { editTodo, editStatus, addTodo, deleteTodo, reduceTime } =
  taskSlice.actions;

export default taskSlice.reducer;
