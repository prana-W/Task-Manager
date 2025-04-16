import React, { useEffect, useState } from "react";
import { Button, Input } from ".";
import useTaskInfo from "../hooks/useTaskInfo";
import { useDispatch, useSelector } from "react-redux";
import { editStatus } from "../features/tasks/taskSlice";
import { toast } from 'react-hot-toast';

//todo: improve TaskFunction 
//first call status and then make the changes accordingly, in the UI

function TaskFunction({ taskId }) {
  const [btnTxt, setBtnTxt] = useState("Start");
  const [isComplete, setIsComplete] = useState(false);
  const taskData = useTaskInfo(taskId);
  const dispatch = useDispatch();

  useEffect(() => {
    let status = null;

    if (isComplete) status = "completed";
    else if (btnTxt == "Start") status = "pending";
    else if (btnTxt == "Pause") status = "ongoing";
    else if (btnTxt == "Resume") status = "paused";
    else return;

    dispatch(editStatus({ taskId, status }));

    status = null;
  }, [taskId, isComplete, btnTxt]);

  const handleComplete = () => {
    setIsComplete((prev) => !prev);
  };

  const handleStatusChange = () => {
    if (isComplete) return;
    if (btnTxt == "Start") {
      setBtnTxt("Pause");
      toast.success ('Task has been marked as started!')
    } else if (btnTxt == "Pause") {
      setBtnTxt("Resume");
      toast.success ('Task was paused!')
    } else if (btnTxt == "Resume") {
      toast.success ('Task was resumed!')
      setBtnTxt("Pause");
    }
  };

  return (
    <>
      <button onClick={handleStatusChange}>{btnTxt}</button>
      <input
        id={taskId}
        type="checkbox"
        defaultChecked={isComplete}
        onChange={handleComplete}
      />
      <label htmlFor={taskId}>{isComplete ? "Completed" : "Complete"}</label>
    </>
  );
}

export default TaskFunction;
