import { useLocation, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { Note } from "../../types"
import { formatDate } from "../../utils/formatFecha"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { deleteNote } from "../../services/NotesAPI"

type Props = {
    note: Note
}
export default function NoteDetail({ note }: Props) {
    const { data } = useAuth()

    const params = useParams();
    const projectID = params.projectID!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskID = queryParams.get("viewTask")!;

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (result) => {
            queryClient.invalidateQueries({ queryKey: ["task", taskID] })
            toast.success(result)
        }
    })

    const handleClick = () => {
        const info = {
            noteID: note._id,
            projectID,
            taskID
        };
        mutation.mutate(info)
    }
    
    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} - <span className="font-semibold">{note.createdBy.name}</span>
                </p>
                <p className="text-sm text-gray-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>
            {note.createdBy._id === data?._id && (
                <div>
                    <button
                        className="cursor-pointer text-red-600 px-3 py-2 bg-red-50 hover:bg-red-100 rounded-sm shadow-xs transition-colors"
                        onClick={handleClick}
                    >Eliminar Nota</button>
                </div>
            )}
        </div>
    )
}
