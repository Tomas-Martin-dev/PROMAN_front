import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { getProjectId } from "../../services/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import AddTaskModal from "../../components/Task/AddTaskModal";
import TaskDetails from "../../components/Task/TaskDetails";
import TaskModalDetails from "../../components/Task/TaskModalDetails";
import TaskDataforEdit from "../../components/Task/TaskDataforEdit";
import { useAuth } from "../../hooks/useAuth";
import { isManager } from "../../utils/policeies";
import { useMemo } from "react";

export default function ProjectView() {
    const navigate = useNavigate();

    const params = useParams();
    const projectID = params.projectID!;

    const { data: userLogin, isLoading: authLoading } = useAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["editProject", projectID],
        queryFn: ()=> getProjectId(projectID),
        retry: false
    })
    
    const canEdit = useMemo(()=> data?.manager === userLogin?._id ,[data, userLogin]);

    if (isLoading && authLoading) return "Cargando...."
    if (isError) return <Navigate to={"/404"}/>
    if(data && userLogin) return (
        <>
            <h1 className="text-5xl font-bold">{data.projectName}</h1>
            <p className="text-2xl font-light mt-3 text-gray-600">{data.descrption}</p>
            {isManager(data.manager, userLogin?._id) ? (
                <nav className="my-5 flex gap-3">
                    <button
                        className="rounded-md px-10 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold transition-colors cursor-pointer"
                        type="button"
                        onClick={()=> navigate("?newTask=true")}
                    >Agregar Tarea
                    </button>
                    <Link 
                        to={"team"}
                        className="rounded-md px-10 py-3 bg-sky-700 hover:bg-sky-800 text-white text-lg font-semibold transition-colors cursor-pointer"
                    >
                    Colaboradores
                    </Link>
                </nav>
            ): ""
            }
            <TaskDetails 
                data={data.tasks}
                canEdit={canEdit}
            />
            <AddTaskModal/>
            <TaskDataforEdit/>
            <TaskModalDetails/>
        </>
    )
}