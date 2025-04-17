import React, { useState, useRef } from "react";
import { Input, Button, TaskComponent } from "../components/index";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../assets/task_brief.svg";
import { addTodo } from "../features/tasks/taskSlice";
import {toast} from 'react-hot-toast'

function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const [taskName, setTaskName] = useState(null);
  const [timeAssigned, setTimeAssigned] = useState(null);
  const [inputTxt, setInputTxt] = useState("Enter your task...");
  const [btnTxt, setBtnTxt] = useState("Add");
  const taskRef = useRef(null);

  const addTimeLimit = (e) => {
    e.preventDefault();
    if (!taskRef.current.value) return;

    const taskId = Date.now();

    dispatch(
      addTodo({
        taskName,
        timeAssigned,
        taskId,
        timeRemaining: timeAssigned,
      })
    );

    toast.success (`${taskName} was added successfully!`)
  
    taskRef.current.value = "";
    setBtnTxt("Add");
    setInputTxt("Enter your task...");
    setTaskName(null);
    setTimeAssigned(null);
  };

  const addTask = (e) => {
    try {
      e.preventDefault();
    } catch (error) {
      console.log(error.message);
    }

    if (!taskRef.current.value) return;

    setBtnTxt("Set");
    setInputTxt("Add Time limit (in minutes)");
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-12 items-center md:items-start">
        <div className="flex justify-center md:justify-start md:w-1/4">
          <img
            src={Logo}
            alt="Logo"
            className="w-40 h-40 sm:w-48 sm:h-48 transition-transform transform hover:scale-105 dark:filter dark:brightness-125"
          />
        </div>

        <div className="w-full md:w-2/3 space-y-6">
          <form
          name="task_data"
            className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 py-2 flex flex-col sm:flex-row items-center gap-3"
            onSubmit={(e) => {
              btnTxt === "Add" ? addTask(e) : addTimeLimit(e);
            }}
          >
            <Input
              type={btnTxt === "Add" ? "text" : "number"}
              placeholder={inputTxt}
              ref={taskRef}
              onChange={(e) => {
                btnTxt === "Add"
                  ? setTaskName(e.target.value)
                  : setTimeAssigned(e.target.value);
              }}
            />
            <Button
              btnText={btnTxt}
              onClick={btnTxt === "Add" ? addTask : addTimeLimit}
  
            />
          </form>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm h-[400px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Your Tasks</h2>
            <ul className="space-y-2">
              {tasks && tasks.length > 0 ? (
                tasks.map((task) => (
                  <TaskComponent
                    taskId={task.taskId}
                    key={task.taskId}
                  >
                    {task.taskName}
                  </TaskComponent>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No tasks yet.
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
