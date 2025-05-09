import { useForm } from "react-hook-form"
import ErrorMessage from "../Projects/ErrorMessage"
import { user, UserProfileForm } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../../services/AuthAPI"
import { toast } from "react-toastify"

export default function ProfileForm({data}: {data:user}) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateProfile,
        onError: (error)=> {
            toast.error(error.message)
        },
        onSuccess: (result)=> {
            toast.success(result)
            queryClient.invalidateQueries({queryKey: ["user"]})
        }
    })
    const handleEditProfile = (formData: UserProfileForm) => {
        mutation.mutate(formData)
    }

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">Mi Perfil</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Aquí puedes actualizar tu información</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-3  border border-gray-200 rounded-sm"
                            {...register("name", {
                                required: "Nombre de usuario es obligatoro",
                            })}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >E-mail</label>
                        <input
                            id="text"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full p-3  border border-gray-200 rounded-sm"
                            {...register("email", {
                                required: "EL e-mail es obligatorio",
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
                        value='Guardar Cambios'
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase rounded-sm font-semibold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}