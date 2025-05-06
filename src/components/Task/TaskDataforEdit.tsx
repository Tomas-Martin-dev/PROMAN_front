import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom"
import { getTaskId } from "../../services/TaskAPI";
import { toast } from "react-toastify";
import EditTaskModal from "./EditTaskModal";

export default function TaskDataforEdit() {
    const params = useParams();
    const projectId = params.projectID!;
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskID =  queryParams.get("editTask")!;
    
    const { data, isError } = useQuery({
      queryKey: ["task", taskID],
      queryFn: ()=> getTaskId(projectId, taskID),
      enabled: !!taskID,
      retry: false
    })

    if (isError) {
        toast.error("Tarea no encontrada", { toastId: "error"});
        return <Navigate to={`/projects/${projectId}`} />
    }
    
    if (data) return <EditTaskModal data={data}/>
}
