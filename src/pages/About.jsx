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
            Hey there! I'm an aspiring web developer currently in my first year
            at the National Institute of Technology, Jamshedpur. I'm passionate
            about building clean, responsive, and useful web applications. I’m
            well-versed in HTML, CSS, Tailwind CSS, JavaScript, C, C++, React,
            React-Redux (with Redux Toolkit), Redux Persist, Git, GitHub, and
            Appwrite.
            <br />
            <br />
            I began learning React on April 19, 2025, and built this project to
            solidify my understanding and put my skills into action. It’s been a
            rewarding journey exploring the practical side of state management,
            UI structuring, and persistence in modern web apps.
            <br />
            <br />
            This project lets users add tasks with a defined time limit. Tasks
            can be started, paused, resumed, and marked as completed. Thanks to
            Redux Persist, your tasks and timers continue to function even when
            you're offline. Clicking on any task gives you a focused dashboard
            view to track its progress.
            <br />
            <br />
            And for those like me who love working into the night — yes, there's
            full dark mode support too 😉.
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
