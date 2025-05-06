import { useForm } from "react-hook-form";
import { UserRegisterForm } from "../../types";
import ErrorMessage from "../../components/Projects/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createAccount } from "../../services/AuthAPI";
import { useState } from "react";

export default function RegisterView() {

    const initialValues: UserRegisterForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }
    const [disabled, setDisabled] = useState(false);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegisterForm>({ defaultValues: initialValues });
    const navigate = useNavigate();
    const password = watch('password');

    const mutation = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (result) => {
            setDisabled(true);
            toast.success(result);
            reset();
            setTimeout(() => {
                navigate("/auth/login");
            }, 1200);
        },
    });

    const handleRegister = (formData: UserRegisterForm) => {
        mutation.mutate(formData)
    }
    return (
        <>
            <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
            <p className="text-2xl font-light text-white mt-2 pl-1">
                Llena el formulario para {''}
                <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10  bg-white mt-10 rounded-md"
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
                        className="w-full p-3  border-gray-300 border rounded-sm"
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

                <div className="flex flex-col gap-1">
                    <label
                        className="font-normal text-2xl"
                    >Nombre</label>
                    <input
                        type="name"
                        placeholder="Nombre de Registro"
                        className="w-full p-3  border-gray-300 border rounded-sm"
                        {...register("name", {
                            required: "El Nombre de usuario es obligatorio",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border rounded-sm"
                        {...register("password", {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 8,
                                message: 'El Password debe ser mínimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        className="font-normal text-2xl"
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full p-3  border-gray-300 border rounded-sm"
                        {...register("password_confirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: value => value === password || 'Los Passwords no son iguales'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Registrarme'
                    disabled={disabled}
                    className={`bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 transition-colors text-white font-bold rounded-sm text-xl cursor-pointer disabled:bg-gray-500 disabled:cursor-default`}
                />
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link to={"/auth/login"} className="text-center text-gray-300 font-normal hover:text-gray-200">
                    ¿Tienes Cuenta? Inicia Sesión
                </Link>
                <Link to={"/auth/forgot-password"} className="text-center text-gray-300 font-normal hover:text-gray-200">
                    ¿Olvidaste tu Password? Restablecer
                </Link>
            </nav>
        </>
    )
}