import React, { useEffect, useState } from "react";
import useTaskInfo from "../hooks/useTaskInfo";
import { useDispatch } from "react-redux";
import { editStatus } from "../features/tasks/taskSlice";
import { toast } from "react-hot-toast";

function TaskFunction({ taskId }) {
  const [btnTxt, setBtnTxt] = useState("Start");
  const [isComplete, setIsComplete] = useState(false);
  const taskData = useTaskInfo(taskId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (taskData.status !== "completed") setIsComplete(false);

    if (taskData.status === "pending") setBtnTxt("Start");
    else if (taskData.status === "ongoing") setBtnTxt("Pause");
    else if (taskData.status === "paused") setBtnTxt("Resume");
    else if (taskData.status === "completed") {
      setBtnTxt(null);
      setIsComplete(true);
    }
  }, []);

  const handleComplete = () => {
    setIsComplete((prev) => !prev);
    if (!isComplete) {
      setBtnTxt(null);
      dispatch(editStatus({ taskId, status: "completed" }));
    } else {
      setBtnTxt("Resume");
      dispatch(editStatus({ taskId, status: "paused" }));
    }
  };
  const handleStatusChange = () => {
    if (isComplete) return;
    if (btnTxt === "Start") {
      setBtnTxt("Pause");
      toast.success("Task has been marked as started!");
      dispatch(editStatus({ taskId, status: "ongoing" }));
    } else if (btnTxt === "Pause") {
      setBtnTxt("Resume");
      toast.success("Task was paused!");
      dispatch(editStatus({ taskId, status: "paused" }));
    } else if (btnTxt === "Resume") {
      toast.success("Task was resumed!");
      setBtnTxt("Pause");
      dispatch(editStatus({ taskId, status: "ongoing" }));
    }
  };

  const getBtnColor = () => {
    if (btnTxt === "Start") return "bg-blue-500 hover:bg-blue-600";
    if (btnTxt === "Pause")
      return "bg-yellow-400 hover:bg-yellow-500 text-gray-900";
    if (btnTxt === "Resume") return "bg-green-500 hover:bg-green-600";
    return "";
  };

  return (
    <div className="flex items-center gap-3 text-sm">
      {btnTxt && (
        <button
          onClick={handleStatusChange}
          className={`px-3 py-1 text-white rounded transition-all duration-200 ${getBtnColor()}`}
        >
          {btnTxt}
        </button>
      )}

      <div className="flex items-center gap-1">
        <input
          id={taskId}
          type="checkbox"
          checked={isComplete}
          onChange={handleComplete}
          className="accent-green-500 w-4 h-4"
        />
        <label
          htmlFor={taskId}
          className="text-gray-600 dark:text-gray-300 text-xs select-none"
        >
          {isComplete ? "Completed" : "Complete"}
        </label>
      </div>
    </div>
  );
}

export default TaskFunction;
