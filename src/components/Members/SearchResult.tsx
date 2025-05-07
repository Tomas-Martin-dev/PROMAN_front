import { useMutation, useQueryClient } from "@tanstack/react-query";
import { user } from "../../types";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addMemberTeam } from "../../services/MembersAPI";

type Props = {
    data: user,
    reset: () => void
}
export default function SearchResult({ data, reset }: Props) {
    const params = useParams()
    const projectId = params.projectID!

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: addMemberTeam,
        onSuccess: (result)=>{
            toast.success(result),
            queryClient.invalidateQueries({queryKey: ["members", projectId]})
            reset();
        },
        onError: (error)=> {
            toast.error(error.message)
        }
    })

    const handleClick = async () => {
        const info = {
            projectId,
            id: data._id
        }
        mutation.mutate(info)
    }
    return (
        <>
            <p className="mt-8 text-center font-medium">Resultado:</p>
            <div className="flex justify-between items-center bg-gray-50 w-full px-3 py-2 rounded-md shadow-xs mt-2">
                <p>{data.name}</p>
                <button
                onClick={handleClick}
                    className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-semibold rounded-sm cursor-pointer transition-colors"
                >Agregar al Proyecto
                </button>
            </div>
        </>
    )
}
