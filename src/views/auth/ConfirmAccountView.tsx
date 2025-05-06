import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { ConfirmToken } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { ConfirmarToken } from "../../services/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const navigate = useNavigate();

  const handleChage = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  const mutation = useMutation({
    mutationFn: ConfirmarToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (result) => {
      toast.success(result);
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    },
  });
  const handleComplete = (token: ConfirmToken["token"]) => {
    mutation.mutate({ token })
  }
  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>

      <p className="text-2xl font-light text-white mt-2">
        Ingresa el código que recibiste {''}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>

      <form
        className="space-y-4 p-10 bg-white mt-10 rounded-md"
      >
        <label
          className="font-normal text-2xl text-center block"
        >Código de 6 dígitos</label>
        <div className="flex justify-center gap-2">
          <PinInput value={token} onChange={handleChage} onComplete={handleComplete}>
            <PinInputField className="w-10 h-10 p-3 rounded-sm border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-sm border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-sm border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-sm border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-sm border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-sm border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/request-code'
          className="text-center text-gray-300 font-normal hover:text-gray-200"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>

    </>
  )
}