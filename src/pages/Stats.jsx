import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";

function Stats() {
  
  const navigate = useNavigate();




  return (
    <>
      <main className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-12 items-center md:items-start">
          <h1 className="content-center">
            Stats page will be added in the future... (hopefully)
          </h1>
        </div>
      </main>
      <Button btnText='Go Back' onClick={() => {
        navigate('/')
      }} />
    </>
  );
}

export default Stats;
