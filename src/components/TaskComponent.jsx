import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function TaskComponent({ children, taskId }) {
  const navigate = useNavigate();
  const taskList = useSelector((state) => state.task.tasks);

  const taskData = taskList.filter((task) => task.taskId == taskId);

  const openTaskManager = () => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm text-gray-800 dark:text-gray-200">
      <button
        onDoubleClick={openTaskManager}
        className="px-3 py-1 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white rounded-md hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors duration-200"
      >
        {children}
      </button>
      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">
        ⏳ {taskData[0].timeRemaining} hrs left
      </span>
    </div>
  );
}

export default TaskComponent;
