import { Navigate, useParams } from "react-router-dom"
import { getProjectId } from "../../services/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import EditProjectForm from "../../components/Projects/EditProjectForm";

export default function EditProjectView() {
    const params = useParams();
    const projectID = params.projectID!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["editProject", projectID],
        queryFn: ()=> getProjectId(projectID),
        retry: false
    })

    if (isLoading) return "Cargando...."
    if (isError) return <Navigate to={"/404"}/>
    if(data) return <EditProjectForm data={data} id={projectID}/>
}
