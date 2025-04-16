import React from "react";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

function About() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold text-center text-primary-600 dark:text-primary-400">
          About This Project
        </h1>
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">👋 About Me</h2>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Hi! I'm a Web Engineer passionate about building meaningful digital
            tools. I love working with JavaScript, React, and modern web
            technologies. This task manager is a part of my journey into
            building useful, elegant UIs and exploring state management using
            Redux Toolkit.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">🌐 Connect with Me</h2>
          <div className="flex gap-6 mt-3 text-2xl">
            <a
              href="https://linkedin.com/in/pranaw-kumar-710331215"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/prana-w"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <FaGlobe />
            </a>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">🧠 Project Details</h2>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            This task manager app was built with React, Redux Toolkit, and
            Tailwind CSS. It includes dark/light mode support, custom hooks, and
            a minimal UI design that focuses on productivity. The app structure
            follows scalable patterns and emphasizes clean state management
            practices.
          </p>
        </section>
      </div>
    </main>
  );
}

export default About;
