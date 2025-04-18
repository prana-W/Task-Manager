import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";

function Stats() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-1 p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold">
            Stats page will be added in the future... (hopefully)
          </h1>
        </div>

        <Button
          btnText="← Go Back"
          onClick={() => {
            navigate("/");
          }}
        />
      </main>
    </div>
  );
}

export default Stats;
