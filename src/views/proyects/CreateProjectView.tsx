import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "../../components/Projects/ProjectForm";
import { InitialProjectFormType } from "../../types";
import { createProject } from "../../services/ProjectAPI";
import { toast } from "react-toastify";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query"
import { formatErrorMessages } from "../../utils/apiErrorFormat";

export default function CreateProjectView() {
    const initialValues: InitialProjectFormType = {
        projectName: "",
        clientName: "",
        descrption: ""
    }

    const navigate = useNavigate();

    const [disabled, setDisabled] = useState(false)

    const mutation = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error( formatErrorMessages(error) );
        },
        onSuccess: (result) => {
            toast.success(result?.data);
            setDisabled(true)
            setTimeout(() => {
                navigate("/")
            }, 2000);
        }
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { initialValues } });

    const handleForm = (data: { initialValues: InitialProjectFormType }) => mutation.mutate(data);

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Nuevo Proyecto</h1>
                <p className="text-2xl font-light text-gray-600 mt-5">Completa el siguiente Formulario para crear un proyecto</p>
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
                        value={"Crear Proyecto"}
                        disabled={disabled}
                        className={`rounded-md px-10 py-3 bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold transition-colors cursor-pointer w-full ${disabled && "disabled:bg-gray-500 disabled:cursor-default disabled:shadow-inner"}`}
                    />
                </form>
            </div>
        </>
    )
}
