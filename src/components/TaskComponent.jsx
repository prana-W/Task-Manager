import React from "react";
import { useNavigate } from "react-router-dom";
import TaskFunction from "./TaskFunction";
import useTaskInfo from "../hooks/useTaskInfo";

function TaskComponent({ children, taskId }) {
  const navigate = useNavigate();
  const taskData = useTaskInfo(taskId);
  const isCompleted = taskData.status === "completed"
  const openTaskManager = () => {
    if (!isCompleted) navigate(`/task/${taskId}`);
  }
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-md border border-gray-200 dark:border-gray-700 transition-all 
      flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm 
      ${
        isCompleted
          ? "opacity-60 line-through cursor-not-allowed"
          : "text-gray-800 dark:text-gray-200"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between flex-1">
        <button
          onDoubleClick={openTaskManager}
          disabled={isCompleted}
          className={`px-3 py-1 min-w-[90px] text-center rounded-md transition-colors duration-200 text-sm font-medium
            ${
              isCompleted
                ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                : "bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white hover:bg-blue-200 dark:hover:bg-blue-600"
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
  )
}

export default TaskComponent;
