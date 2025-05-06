import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getProjectId } from "../../services/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import AddTaskModal from "../../components/Task/AddTaskModal";
import TaskDetails from "../../components/Task/TaskDetails";
import TaskModalDetails from "../../components/Task/TaskModalDetails";
import TaskDataforEdit from "../../components/Task/TaskDataforEdit";

export default function ProjectView() {
    const navigate = useNavigate();

    const params = useParams();
    const projectID = params.projectID!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["editProject", projectID],
        queryFn: ()=> getProjectId(projectID),
        retry: false
    })

    if (isLoading) return "Cargando...."
    if (isError) return <Navigate to={"/404"}/>
    if(data) return (
        <>
            <h1 className="text-5xl font-bold">{data.projectName}</h1>
            <p className="text-2xl font-light mt-3 text-gray-600">{data.descrption}</p>

            <nav className="my-5 flex gap-3">
                <button
                    className="rounded-md px-10 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-black transition-colors cursor-pointer"
                    type="button"
                    onClick={()=> navigate("?newTask=true")}
                >Agregar Tarea
                </button>
            </nav>
            <TaskDetails data={data.tasks}/>
            <AddTaskModal/>
            <TaskDataforEdit/>
            <TaskModalDetails/>
        </>
    )
}