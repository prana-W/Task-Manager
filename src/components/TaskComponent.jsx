import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskFunction from "./TaskFunction";
import useTaskInfo from "../hooks/useTaskInfo";
import { toast } from "react-hot-toast";
import { deleteTodo } from "../features/tasks/taskSlice";
import { useDispatch } from "react-redux";

function TaskComponent({ children, taskId }) {
  const navigate = useNavigate();
  const taskData = useTaskInfo(taskId);
  const isCompleted = taskData.status === "completed";
  const openTaskManager = () => {
    if (!isCompleted) navigate(`/task/${taskId}`);
  };

  const dispatch = useDispatch();

  let timeoutRef;

  //todo: add message when todo time hits 0

  useEffect(() => {
    if (isCompleted) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-xs w-full bg-yellow-300 dark:bg-yellow-500 text-black shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <p className="text-sm font-medium">⚠️ {taskData.taskName} was marked as completed!</p>
            <p className="mt-1 text-sm">Task will be automatically removed in 5 seconds...</p>
          </div>
          <div className="flex border-l border-black/10 dark:border-white/20">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-black dark:text-black hover:bg-yellow-400 dark:hover:bg-yellow-400 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ));
      timeoutRef = setTimeout(() => {
        dispatch(deleteTodo(taskId));
      }, 5000);
    }


    return () => clearTimeout(timeoutRef);
  }, [isCompleted]);

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
  );
}

export default TaskComponent;
