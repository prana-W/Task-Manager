import React, { useEffect, useState } from "react";
import { Button, Input } from ".";
import useTaskInfo from "../hooks/useTaskInfo";
import { useDispatch, useSelector } from "react-redux";
import { editStatus } from "../features/tasks/taskSlice";
import { toast } from "react-hot-toast";

function TaskFunction({ taskId }) {
  const [btnTxt, setBtnTxt] = useState("Start");
  const [isComplete, setIsComplete] = useState(false);
  const taskData = useTaskInfo(taskId);
  const dispatch = useDispatch();

  //making initial render based on status
  useEffect(() => {
    if (taskData.status != "completed") setIsComplete(false);

    if (taskData.status == "pending") setBtnTxt("Start");
    else if (taskData.status == "ongoing") setBtnTxt("Pause");
    else if (taskData.status == "paused") setBtnTxt("Resume");
    else if (taskData.status == "completed") {
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
    if (btnTxt == "Start") {
      setBtnTxt("Pause");
      toast.success("Task has been marked as started!");
      dispatch(editStatus({ taskId, status: "ongoing" }));
    } else if (btnTxt == "Pause") {
      setBtnTxt("Resume");
      toast.success("Task was paused!");
      dispatch(editStatus({ taskId, status: "paused" }));
    } else if (btnTxt == "Resume") {
      toast.success("Task was resumed!");
      setBtnTxt("Pause");
      dispatch(editStatus({ taskId, status: "ongoing" }));
    }
  };

  return (
    <>
      <button onClick={handleStatusChange}>{btnTxt}</button>
      <input
        id={taskId}
        type="checkbox"
        checked={isComplete}
        onChange={handleComplete}
      />
      <label htmlFor={taskId}>{isComplete ? "Completed" : "Complete"}</label>
    </>
  );
}

export default TaskFunction;
