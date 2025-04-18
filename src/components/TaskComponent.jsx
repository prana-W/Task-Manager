import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskFunction from "./TaskFunction";
import useTaskInfo from "../hooks/useTaskInfo";
import { toast } from "react-hot-toast";
import { deleteTodo, addTodo } from "../features/tasks/taskSlice";
import { useDispatch } from "react-redux";

function TaskComponent({ children, taskId }) {
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();
  const taskData = useTaskInfo(taskId);
  const isCompleted = taskData.status === "completed";
  const dispatch = useDispatch();

  const handleRestartTask = () => {
    dispatch(
      addTodo({
        taskId: Date.now(),
        taskName: taskData.taskName,
        timeAssigned: taskData.timeAssigned,
        timeRemaining: taskData.timeAssigned,
      })
    );
    dispatch(deleteTodo(taskData.taskId));
    toast.success(`${taskId.taskName} was added again!`);
  };

  const abortTask = () => {
    dispatch(deleteTodo(taskData.taskId));
    toast.success(`${taskData.taskName} task was deleted!`);
  };

  const openTaskManager = () => {
    if (!isCompleted) navigate(`/task/${taskId}`);
  };

  useEffect(() => {
    if (isCompleted) {
      const timeoutRef = setTimeout(() => {
        dispatch(deleteTodo(taskId));
      }, 5000);

      return () => clearTimeout(timeoutRef);
    }

    if (taskData.status === "failed") {
      setFailed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted, taskData.status]);

  if (!failed) {
    return (
      <div
        className={`bg-white dark:bg-gray-900 rounded-xl px-5 py-4 shadow-md border border-gray-200 dark:border-gray-700 transition-all
        flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm
        ${
          isCompleted
            ? "opacity-60 line-through cursor-not-allowed"
            : "text-gray-800 dark:text-gray-100"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 flex-1 justify-between w-full">
          <button
            onClick={openTaskManager}
            disabled={isCompleted}
            className={`px-4 py-2 min-w-[100px] text-center rounded-lg font-medium text-sm transition-all duration-200
            ${
              isCompleted
                ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-500"
                : "bg-violet-100 text-violet-800 hover:bg-violet-200"
            }`}
          >
            {children}
          </button>
          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            ⏳ {taskData.timeRemaining} mins left
          </span>
        </div>
        <TaskFunction taskId={taskId} />
      </div>
    );
  } else {
    return (
      <div
        className="bg-white dark:bg-gray-900 rounded-xl px-5 py-4 shadow-md border border-gray-200 dark:border-gray-700 transition-all
        flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-gray-800 dark:text-gray-100"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 flex-1 justify-between w-full">
          <p className="px-4 py-2 min-w-[100px] text-center bg-red-300 dark:bg-gray-700 rounded-md font-medium">
            {children}
          </p>
          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            ⚠️ Time Limit exceeded!
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            onClick={handleRestartTask}
            className="px-4 py-2 text-sm rounded-lg font-medium bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-400 dark:hover:bg-violet-300 dark:text-gray-900 transition-all"
          >
            Restart
          </button>
          <button
            onClick={abortTask}
            className="px-4 py-2 text-sm rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-300 dark:text-gray-900 transition-all"
          >
            Abort
          </button>
        </div>
      </div>
    );
  }
}

export default TaskComponent;
