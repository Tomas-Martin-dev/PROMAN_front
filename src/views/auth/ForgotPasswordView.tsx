import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "../../components/Projects/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { ForgotPass } from "../../services/AuthAPI";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: ''
    }
    const [disabled, setDisabled] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: ForgotPass,
        onError: (error)=>{
            toast.error(error.message);
        },
        onSuccess: (result)=>{
            toast.success(result);
            reset();
            setDisabled(true);
            setTimeout(() => {
                navigate("/auth/login")
            }, 3000);
        }
    })

    const handleForgotPassword = (formData: ForgotPasswordForm) => { mutation.mutate(formData)}

    return (
        <>
            <h1 className="text-5xl font-black text-white">Restablecer Password</h1>
            <p className="text-2xl font-light text-white mt-2 pl-1">
                Llena el formulario para {''}
                <span className=" text-fuchsia-500 font-bold"> recuperar tu cuenta</span>
            </p>
            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-4 p-10 rounded-md bg-white mt-4"
                noValidate
            >
                <div className="flex flex-col gap-1">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3 rounded-lg border-gray-300 border"
                        {...register("email", {
                            required: "El Email de registro es obligatorio",
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
                    value='Enviar Instrucciones'
                    disabled={disabled}
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 transition-colors text-white font-semibold rounded-sm text-xl cursor-pointer disabled:bg-gray-500 disabled:cursor-default"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/login'
                    className="text-center text-gray-300 font-normal"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>

                <Link
                    to='/auth/register'
                    className="text-center text-gray-300 font-normal"
                >
                    ¿No tienes cuenta? Crea una
                </Link>
            </nav>
        </>
    )
}