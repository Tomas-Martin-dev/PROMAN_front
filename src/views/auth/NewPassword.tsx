import { useState } from "react"
import NewPasswordToken from "../../components/Auth/NewPasswordToken"
import NewPasswordFrom from "../../components/Auth/NewPasswordForm"


export default function NewPassword() {
    const [isValidToken, setIsValidToken] = useState(false)
    

    return (
        <>
            <h1 className="text-5xl font-black text-white">Restablecer Password</h1>
            <p className="text-2xl font-light text-white mt-2 pl-1">
                Ingresa el codigo que recibiste en{''}
                <span className=" text-fuchsia-500 font-bold"> tu email</span>
            </p>
            {isValidToken ? <NewPasswordFrom/> : <NewPasswordToken validated={setIsValidToken}/>}
        </>
    )
}
