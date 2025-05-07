import { FieldErrors, UseFormRegister } from "react-hook-form";
import z from "zod"
import { authSchemma, initialProject, projectFullSchemma, taskSchemma, userSchemma } from "./schemmas";

export type InitialType = z.infer<typeof initialProject> 
export type InitialProjectFormType = Pick<InitialType, "projectName" | "clientName" | "descrption">


export type ProjectsTypes = {
    register: UseFormRegister<{ initialValues: InitialProjectFormType }>
    errors: FieldErrors<InitialProjectFormType>
}

export type EditFormProps = {
    data: InitialProjectFormType,
    id: string
}


export type putProjectType = {
    formData: {
        initialValues: InitialProjectFormType;
    };
    id: string;
}

export type Task = z.infer<typeof taskSchemma>
export type TaskInitialType = Pick<Task, "name" | "description">

export type ProjectFullType = z.infer<typeof projectFullSchemma>

export const statusLeng: {[key: string] : string} = {
    pending: "Pendiente",
    onHold: "En Espera",
    inProgress: "En Progreso",
    underReview: "En Revision",
    completed: "Completo",
};


/* Auth && Users */

export type Auth = z.infer<typeof authSchemma>

export type UserLoginForm = Pick<Auth, "email" | "password">
export type UserRegisterForm = Pick<Auth, "name" | "email" | "password" | "password_confirmation">
export type ConfirmToken = Pick<Auth, "token">
export type RequestConfirmationCodeForm = Pick<Auth, "email">
export type ForgotPasswordForm = Pick<Auth, "email">
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">

export type user = z.infer<typeof userSchemma>
export type TeamMemberForm = Pick<user, "email">

