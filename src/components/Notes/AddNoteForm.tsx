import {useForm} from "react-hook-form"
import { NoteFormData } from "../../types"
import ErrorMessage from "../Projects/ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { addNote } from "../../services/NotesAPI"
import { useLocation, useParams } from "react-router-dom"

export default function AddNoteForm() {
    const initialValues: NoteFormData = {
        content: ""
    }

    const params = useParams();
    const projectID = params.projectID!;
   
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskID = queryParams.get("viewTask")!;
    
    const {reset, register, handleSubmit, formState:{errors} } = useForm({defaultValues: initialValues})
    
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: addNote,
        onError: (error)=>{
            toast.error(error.message)
        },
        onSuccess: (result)=>{
            queryClient.invalidateQueries({ queryKey: ["task", taskID] })
            toast.success(result),
            reset()
        }
    })
    const handleAddNote = (formData: NoteFormData) => {
        const info = {
            formData,
            projectID,
            taskID
        }
        mutation.mutate(info)
    }

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3"
            noValidate
        >
            <div className="flex flex-col">
                <label htmlFor="content" className="font-bold">Crear Nota</label>
                <input 
                    type="text" 
                    id="content"
                    placeholder="Contenido de la nota"
                    className="w-full p-3 border border-gray-300 rounded-sm mt-1" 
                    {...register("content", {
                        required: "El contenido de la nota es obligatorio"
                    })}
                    />
                    {errors.content && (
                        <ErrorMessage>{errors.content.message}</ErrorMessage>
                    )}
            </div>

            <input 
                type="submit" 
                value="Crear Nota" 
                className="bg-purple-600 hover:bg-purple-700 w-full py-3 text-xl rounded-sm text-white font-semibold cursor-pointer transition-colors" 
            />
        </form>
    )
}
