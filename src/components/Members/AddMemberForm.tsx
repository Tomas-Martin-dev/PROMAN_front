import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ErrorMessage from "../Projects/ErrorMessage";
import { TeamMemberForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { searchMember } from "../../services/MembersAPI";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectID!
    

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: searchMember,
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = {
            projectId,
            formData
        }
        mutation.mutate(data)
    }

    const resetForm = ()=>{
        reset();
        mutation.reset();
    }
    return (
        <>

            <form
                className="mt-10 space-y-2"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-1">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="name"
                    >E-mail de Usuario</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="w-full p-3  border-gray-300 border rounded-sm"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-sm"
                    value='Buscar Usuario'
                />
            </form>
            {mutation.isPending && <p className="text-center mt-1">Cargando...</p>}
            {mutation.isError && <p className="text-center mt-1 text-red-800">{mutation.error.message}</p>}
            {mutation.data && <SearchResult data={mutation.data} reset={resetForm}/>}
        </>
    )
}