## Below is only for the reference of the owner of the Toh, Do!


# Documnetations

- In home page, user can add tasks firstly and then set the number of hours needed to complete the task.

- After adding both, a task is successfully created and added on the page (with latest to oldest)

# Important Logics

### Reducing time when the task is active (ongoing)

- Add a seperate useEffect in App.jsx (Don't add any dependancies in here)

- Make a intervalReference as a global variable (using let keyword)
- clearInterval (intervalReference) on start of the seperate useEffect
- Then start a setInterval and add a reference to the intervalReference. Inside setInterval, we add function and set an interval of x ms.
- In the function, we simmple call a reducer, reduceTime, which maps the entire array of tasks, finds task which has status = 'ongoing' and then reduce that task's timeRemaining by required time frame.
- Doing this causes the entire UI everywhere to update the remaining time.

