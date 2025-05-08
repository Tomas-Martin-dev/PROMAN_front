import { FieldErrors, UseFormRegister } from "react-hook-form"
import ErrorMessage from "../Projects/ErrorMessage";
import { TaskInitialType } from "../../types";

type TaskFormProps = {
    errors: FieldErrors<TaskInitialType>
    register: UseFormRegister<TaskInitialType>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    return (
        <>
            <div className="">
                <label
                    className="font-bold text-lg"
                    htmlFor="name"
                >Nombre de la tarea
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="w-full p-3 rounded-sm border-gray-300 border mt-1"
                    {...register("name", {
                        required: "El nombre de la tarea es obligatorio",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col">
                <label
                    className="font-bold text-lg"
                    htmlFor="description"
                >Descripción de la tarea</label>
                <textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    className="w-full p-3 rounded-sm border-gray-300 border mt-1"
                    {...register("description", {
                        required: "La descripción de la tarea es obligatoria"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}