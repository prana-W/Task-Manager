import React from "react";

function Input({ type = "text", label, placeholder, ref, ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        className="w-full px-4 py-2 rounded-2xl border border-gray-300 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                   placeholder-gray-400 dark:placeholder-gray-500 
                   focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 
                   transition duration-200"
        {...props}
      />
    </div>
  );
}

export default Input;
