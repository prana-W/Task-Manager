import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      taskName: "Click any task to open the dashboard",
      taskId: 1744836532410,
      status: "pending", //pending (when not started), ongoing (when started || resumed), paused (when started but paused), completed (when task is finished)
      timeAssigned: 10000, //total time asssigned in ms
      timeRemaining: 10000, //time remaining (timeAssigned - timeDedicated)
    },
    {
      taskName: "Completed task are auto deleted in 5 seconds",
      taskId: 1744836542689,
      status: "pending",
      timeAssigned: 50000,
      timeRemaining: 50000,
    },
  ],

  lastSeen: null, //If user is online -> this is the current time; if user is offline -> this is the time the user was last seen

  //this is the statistics of the user (will be implemented in the future, hopefully...)

  // statistics: {
  //   timeDedicated: null, //net time spent on tasks
  //   timeOverspent: null, //extra time spent on tasks (actual-target)
  //   timeSaved: null, //time saved on tasks (target-actual)
  //   tasksCompleted: null, //total number of tasks that was completed
  // },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    //add a new task
    addTodo: (state, action) => {
      const newTask = {
        taskName: "",
        taskId: "",
        status: "pending",
        timeAssigned: "",
        timeRemaining: "",
      };
      state.tasks = [{ ...newTask, ...action.payload }, ...state.tasks];
    },

    //edit the taskName of a particular task/todo
    editTodo: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.taskId == action.payload.taskId
          ? { ...task, taskName: action.payload.taskName }
          : task
      );
    },
    //delete a particular todo/task
    deleteTodo: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.taskId != action.payload);
    },
    // update the status of a particular task
    editStatus: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.taskId == action.payload.taskId
          ? { ...task, status: action.payload.status }
          : task
      );
    },
    //updates the time in the ongoing tasks when user is online
    reduceTime: (state) => {
      state.tasks = state.tasks.map((task) => {
        if (task.status == "ongoing") {
          let newTimeRemaining = Number((task.timeRemaining - 0.01).toFixed(2));
          if (newTimeRemaining <= 0) {
            return { ...task, status: "failed", timeRemaining: 0 };
          } else return { ...task, timeRemaining: newTimeRemaining };
        } else return task;
      });
    },

    //update the time in every ongoing to compensate for the offline time
    updateOfflineTime: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.status == "ongoing") {
          let newTimeRemaining = Number(task.timeRemaining - action.payload);

          if (newTimeRemaining <= 0) {
            newTimeRemaining = 0;
            return { ...task, status: "failed", timeRemaining: 0 };
          } else return { ...task, timeRemaining: newTimeRemaining };
        } else return task;
      });
    },

    //update the last seen time
    updateLastSeen: (state, action) => {
      state.lastSeen = action.payload;
    },
  },
});

export const {
  editTodo,
  editStatus,
  addTodo,
  deleteTodo,
  reduceTime,
  updateOfflineTime,
  updateLastSeen,
} = taskSlice.actions;

export default taskSlice.reducer;
