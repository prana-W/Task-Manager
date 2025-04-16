import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editTodo } from "../features/tasks/taskSlice";
import useTaskInfo from "../hooks/useTaskInfo";

function TaskDashboard() {
  const [rectHeight, setRectHeight] = useState(100); //this helps us in changing the height of the rectangle depending on the amount of time we have

  const [isEdit, setIsEdit] = useState(false); //State of button (false -> not editable)

  const navigate = useNavigate();
  const taskId = useParams();
  const taskRef = useRef(null);
  const dispatch = useDispatch();

  //it returns the required task object
  const taskData = useTaskInfo(taskId.taskId);

  useEffect(() => {
    taskRef.current.value = taskData.taskName;
  }, []);

  //below is used to calculate the height of the rectangle dependening on the remaining time as compared to intial time
  useEffect(() => {
    const ratio = taskData.timeRemaining / taskData.timeAssigned;
    setRectHeight(ratio * 100);
  }, [taskData.timeRemaining]);

  const handleBtnLogic = () => {
    if (isEdit) {
      taskRef.current.readOnly = true;
      setIsEdit(false);

      dispatch(
        editTodo({ taskId: taskId.taskId, taskName: taskRef.current.value })
      );
    } else {
      taskRef.current.removeAttribute("readOnly");
      setIsEdit(true);
    }
  };

  const timeRemainingColor =
    taskData.timeRemaining < 10
      ? "text-red-500"
      : taskData.timeRemaining < 30
      ? "text-yellow-500"
      : "text-green-500";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <div className="w-full">
              <label
                htmlFor="taskInput"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Task:
              </label>
              <input
                id="taskInput"
                type="text"
                ref={taskRef}
                readOnly
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition duration-300"
                placeholder="Edit your task..."
                onClick={!isEdit ? handleBtnLogic : null}
              />
            </div>
            <button
              onClick={handleBtnLogic}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 w-full sm:w-auto ${
                isEdit
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isEdit ? "Save" : "Edit"}
            </button>
          </div>
          <div className="space-y-3 bg-gray-100 dark:bg-gray-900 p-6 rounded-2xl shadow-inner">
            <h2 className="text-lg font-semibold">
              Status:{" "}
              <span className="font-normal capitalize">{taskData.status}</span>
            </h2>
            <h2 className="text-lg font-semibold">
              Time allotted:{" "}
              <span className="font-normal">{taskData.timeAssigned} mins</span>
            </h2>
            <h2 className="text-lg font-semibold">
              Time remaining:{" "}
              <span className={`font-bold ${timeRemainingColor}`}>
                {taskData.timeRemaining} mins
              </span>
            </h2>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">
              Created on:{" "}
              <span>{new Date(taskData.taskId).toLocaleString()}</span>
            </h4>
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition-all"
          >
            ← Go Back
          </button>
        </div>

        <div className="flex justify-center items-center bg-white dark:bg-gray-900 p-6 rounded-2xl min-h-[300px]">
          <svg
            viewBox={`0 0 200 ${rectHeight}`}
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <rect
              width="100%"
              height="100%"
              fill="currentColor"
              className="text-green-400 dark:text-pink-500"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
export default TaskDashboard;
