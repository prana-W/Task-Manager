### High Priority

- On completing task, wait for 20 seconds, then delete it permanently (give notificatin)

- Add a custom task by default, saying clicking on me takes you to dashboard

- When task is completed, notify the user

- Also change last_seen when dipatching reduceTime, and then do when the user logs back on

- Persist theme as well (use reducer)

- Improve time period in intervals, to update on each 10 seconds

- Improve rectanguar inndicator







### Task Manager

- Add tasks
- Complete tasks
- Edit Tasks
- Start Task (starts the timer)
- Pause Task (pause any ongoing task)
- Set Deadlines (shows time remaining to do the task)
- Add Theme Toggle

### Todo

- Stats Page (show total tasks completed, time dedicated, excess time spent, time saved)

- Implement delete task functionality to the task dashboard
- Add filter for tasks (latest to oldest, oldest to latest)
- Implement local storage for theme
- Implement local storage for storing tasks
- Implement start/pause/complete functionality to the tasks

- Add a session page and only include tips 2-3 times on first time session

### Documnetations

- In home page, user can add tasks firstly and then set the number of hours needed to complete the task.

- After adding both, a task is successfully created and added on the page (with latest to oldest)

## Important Logic

### Reducing time when the task is active (ongoing)

- Add a seperate useEffect in App.jsx (Don't add any dependancies in here)

- Make a intervalReference as a global variable (using let keyword)
- clearInterval (intervalReference) on start of the seperate useEffect
- Then start a setInterval and add a reference to the intervalReference. Inside setInterval, we add function and set an interval of x ms.
- In the function, we simmple call a reducer, reduceTime, which maps the entire array of tasks, finds task which has status = 'ongoing' and then reduce that task's timeRemaining by required time frame.
- Doing this causes the entire UI everywhere to update the remaining time.

### To-Change

- time period in setInterval in App.jsx and taskSlice.js
- time perios in setInterrval in App.jsx for local storage
