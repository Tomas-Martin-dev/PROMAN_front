import { isAxiosError } from "axios";
import api from "../lib/axios";
import { InitialProjectFormType, InitialType, putProjectType } from "../types";
import { projectFullSchemma, projectsSchemma } from "../types/schemmas";



export const createProject = async (formData: { initialValues: InitialProjectFormType }) => {
       
    try {
        const data = await api.post("/projects", formData.initialValues)
        console.log(data);
        
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.erros)
        } 
    }
}

export const getProjects = async () => {
       
    try {
        const {data} = await api("/projects");
        const result = projectsSchemma.safeParse(data);
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.erros)
        } 
    }
}

export const getProjectId = async (id: InitialType["_id"]) => {
     
    try {
        const {data} = await api(`/projects/${id}`);
        const result = projectFullSchemma.safeParse(data);
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.erros)
        } 
    }
}

export const putProjectId = async ({formData, id} : putProjectType) => {
     
    try {
        const {data} = await api.put<string>(`/projects/${id}`, formData.initialValues);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.erros)
        } 
    }
}

export const deleteProjectId = async (id : InitialType["_id"]) => {
     
    try {
        const {data} = await api.delete<string>(`/projects/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.erros)
        } 
    }
}