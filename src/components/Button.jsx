import React from 'react';

function Button({btnText, onClick, type = 'button', className=""}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-5 py-2 rounded-2xl bg-primary-500 text-black 
                 dark:bg-primary-400 hover:bg-primary-600 dark:hover:bg-primary-500 
                 transition duration-200 shadow-sm 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                 dark:focus:ring-primary-400"
    >
      {btnText}
    </button>
  );
}

export default Button;