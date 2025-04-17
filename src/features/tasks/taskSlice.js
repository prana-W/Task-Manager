import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  tasks: [
    {
      taskName: "I am a test task",
      taskId: 1744836532410,
      status: "pending", //pending (when not started), ongoing (when started || resumed), paused (when started but paused), completed (when task is finished)
      timeAssigned: 100000, //total time asssigned in ms
      timeRemaining: 100000, //time remaining (timeAssigned - timeDedicated)
    },
    {
      taskName: "I am another test task",
      taskId: 1744836542689,
      status: "pending",
      timeAssigned: 500000,
      timeRemaining: 500000,
    },
  ],
  statistics: {
    timeDedicated: null, //net time spent on tasks
    timeOverspent: null, //extra time spent on tasks (actual-target)
    timeSaved: null, //time saved on tasks (target-actual)
    tasksCompleted: null, //total number of tasks that was completed
  },
  lastSeen: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTask = {
        taskName: null,
        taskId: null,
        status: "pending",
        timeAssigned: null,
        timeRemaining: null,
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
          let newTimeRemaining = task.timeRemaining - 1;

          //todo: handle when time hits 0 

          if (newTimeRemaining <= 0) {
            newTimeRemaining = 0;
          }
          return { ...task, timeRemaining: newTimeRemaining };
        } else return task;
      });

      state.lastSeen = action.payload
    },
    updateOfflineTime: (state, action) => {
      state.tasks = state.tasks.map ((task) => {
        if (task.status == "ongoing") {
          let newTimeRemaining = task.timeRemaining - action.payload

          if (newTimeRemaining <= 0) {
            newTimeRemaining = 0
          }

          return {...task, timeRemaining: newTimeRemaining}
        } else return task
      })
    }
    // updateLastSeen: (state, action) => {
    //   state.lastSeen = action.payload //hopefully Date.now()
    // }
  },
});

export const { editTodo, editStatus, addTodo, deleteTodo, reduceTime, updateOfflineTime } =
  taskSlice.actions;

export default taskSlice.reducer;
