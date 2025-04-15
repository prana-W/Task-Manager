import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-extrabold text-primary-600 dark:text-primary-400">
          404
        </h1>
        <p className="text-xl font-semibold">Page Not Found</p>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          The page you're looking for doesn’t exist or has been moved. Let's get
          you back on track.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 font-medium rounded-xl shadow transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default ErrorPage;
