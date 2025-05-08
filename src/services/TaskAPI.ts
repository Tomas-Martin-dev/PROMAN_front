import { isAxiosError } from "axios";
import api from "../lib/axios";
import { InitialType, Task, TaskInitialType } from "../types";
import { taskSchemmaFull } from "../types/schemmas";

type PrompsCreateTaks = {
    formData: TaskInitialType,
    id: InitialType["_id"]
}

export async function createTaks(info: PrompsCreateTaks) {
    try {
        const { data } = await api.post<string>(`/projects/${info.id}/tasks`, info.formData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors)
        } 
    }
}

type propsPostStatus = {
    status: Task["status"],
    projectId: InitialType["_id"],
    taskID: Task["_id"]
}
export async function postStatus({status, projectId, taskID}: propsPostStatus) {
    try {
        const { data } = await api.post<string>(`/projects/${projectId}/tasks/${taskID}/status`, {status});
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.erros)
        } 
    }
}

export const getTaskId = async (idProject: InitialType["_id"], idTask:Task["_id"] ) => {
    try {
        const { data } = await api(`/projects/${idProject}/tasks/${idTask}`);
        const result = taskSchemmaFull.safeParse(data);
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors)
        } 
    }
}

type propsPutTask = {
    formData: TaskInitialType,
    projectId: InitialType["_id"],
    taskID: Task["_id"]
}
export async function putTask({formData, taskID, projectId}: propsPutTask) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}/tasks/${taskID}`, formData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors)
        } 
    }
}

type deleteProps = {
    taskID: Task["_id"];
    projectId: InitialType["_id"]
}
export async function deleteTask({taskID, projectId}: deleteProps) {
    try {
        const { data } = await api.delete<string>(`/projects/${projectId}/tasks/${taskID}`);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors)
        } 
    }
}