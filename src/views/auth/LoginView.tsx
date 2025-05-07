import { useForm } from "react-hook-form";
import { UserLoginForm } from "../../types";
import ErrorMessage from "../../components/Projects/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Login } from "../../services/AuthAPI";
// import { useEffect } from "react";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: Login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Autenticado OK");
      setTimeout(() => {
        navigate("/")
      }, 1500);
    }
  });

  const handleLogin = (formData: UserLoginForm) => mutation.mutate(formData)

  // useEffect(()=>{
  //   localStorage.removeItem("AuthUser");
  // },[])

  return (
    <>
      <h2 className="text-4xl font-bold text-white mt-2">Iniciar Sesión</h2>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white rounded-md mt-4"
        noValidate
      >
        <div className="flex flex-col gap-1">
          <label
            className="font-normal text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
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
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 rounded-sm text-white font-bold transition-colors text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link to={"/auth/register"} className="text-center text-gray-300 font-normal hover:text-gray-200">
          ¿No tienes cuenta? Crea Una
        </Link>
        <Link to={"/auth/forgot-password"} className="text-center text-gray-300 font-normal hover:text-gray-200">
          ¿Olvidaste tu Password? Restablecer
        </Link>
      </nav>
    </>
  )
}