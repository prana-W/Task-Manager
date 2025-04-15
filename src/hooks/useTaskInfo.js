import { useSelector } from "react-redux";

function useTaskInfo (taskId) {
    const taskData = useSelector((state) => state.task.tasks)

    const [task, setTask] = useState(taskData)

    
}