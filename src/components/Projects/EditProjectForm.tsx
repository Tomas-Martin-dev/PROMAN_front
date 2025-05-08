import { Link, useNavigate} from "react-router-dom";
import ProjectForm from "../Projects/ProjectForm";
import { EditFormProps, InitialProjectFormType } from "../../types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putProjectId } from "../../services/ProjectAPI";
import { toast } from "react-toastify";
import { formatErrorMessages } from "../../utils/apiErrorFormat";


export default function EditProjectForm({data, id} : EditFormProps) {
    const initialValues = {
        projectName: data.projectName,
        clientName: data.clientName,
        descrption: data.descrption
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: {initialValues} });

    const navigate = useNavigate();
    
    const [disabled, setDisabled] = useState(false)
    
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: putProjectId,
        onError: (error) => {
            toast.error(formatErrorMessages(error));
        },
        onSuccess: (result) => {
            queryClient.invalidateQueries({queryKey:["editProject", id]})
            queryClient.invalidateQueries({queryKey:["projects"]})
            toast.success(result);
            setDisabled(true)
            setTimeout(() => {
                navigate("/")
            }, 2000);
        }
    })
    const handleForm = (formData: { initialValues: InitialProjectFormType }) => {

        const data = {
            formData,
            id
        }
        mutation.mutate(data);
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Edita "{data.projectName}"</h1>
                <p className="text-2xl font-light text-gray-600 mt-5">Completa el siguiente Formulario con los nuevos datos</p>
                <nav className="my-5">
                    <Link
                        className="rounded-md px-10 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold transition-colors cursor-pointer"
                        to={"/"}
                    >Mis Proyectos
                    </Link>
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm
                        errors={errors}
                        register={register}
                    />

                    <input
                        type="submit"
                        value={"Guardar Cambios"}
                        disabled={disabled}
                        className={`rounded-md px-10 py-3 bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold transition-colors cursor-pointer w-full ${disabled && "disabled:bg-gray-500 disabled:cursor-default disabled:shadow-inner"}`}
                    />
                </form>
            </div>
        </>
    )
}
