import React from "react";

function Button({ btnText, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-5 py-2.5 rounded-2xl font-medium text-sm
                 bg-violet-600 text-white dark:bg-violet-500 dark:text-white
                 hover:bg-violet-700 dark:hover:bg-violet-400
                 transition-all duration-300 ease-in-out
                 shadow-md hover:shadow-lg
                 focus:outline-none focus:ring-2 focus:ring-offset-2
                 focus:ring-violet-500 dark:focus:ring-violet-300"
    >
      {btnText}
    </button>
  );
}

export default Button;
