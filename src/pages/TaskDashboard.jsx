import React from "react";
import { useParams } from "react-router-dom";
import { Input, Button } from "../components";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { editTodo } from "../features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";

//todo: Propagate changes when task is edited (in all places)

function TaskDashboard() {
  const [isEdit, setIsEdit] = useState(false); //State of button (false -> not editable)

  const navigate = useNavigate();
  const taskId = useParams();
  const taskRef = useRef(null);
  const dispatch = useDispatch();
  const tasksList = useSelector((state) => state.task.tasks); //this is an array containing objects of tasks data

  //reauiredTaskData[0] gives us the object of the actual task required
  const requiredTaskData = tasksList.filter(
    (task) => task.taskId == taskId.taskId
  );

  useEffect(() => {
    taskRef.current.value = requiredTaskData[0].taskName;
  }, []);

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

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <Input
          label="Task: "
          placeholder="Edit your task..."
          ref={taskRef}
          readOnly
          onClick={!isEdit ? handleBtnLogic : null}
        />
        <Button btnText={isEdit ? "Save" : "Edit"} onClick={handleBtnLogic} />
      </div>

      <div className="mt-6 space-y-3 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 rounded-2xl shadow-inner">
        <h2 className="text-lg font-semibold">
          Status:{" "}
          <span className="font-normal">{requiredTaskData[0].status}</span>
        </h2>
        <h2 className="text-lg font-semibold">
          Time allotted:{" "}
          <span className="font-normal">
            {requiredTaskData[0].timeAssigned} hrs
          </span>
        </h2>
        <h2 className="text-lg font-semibold">
          Time remaining:{" "}
          <span className="font-normal">
            {requiredTaskData[0].timeRemaining} hrs
          </span>
        </h2>
        <h4 className="text-sm text-gray-600 dark:text-gray-400">
          Created on:{" "}
          <span>{new Date(requiredTaskData[0].taskId).toString()}</span>
        </h4>
      </div>
      <br />
      <Button
        btnText="Go Back"
        onClick={() => {
          navigate("/");
        }}
      ></Button>
    </>
  );
}

export default TaskDashboard;
