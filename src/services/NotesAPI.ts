import { isAxiosError } from "axios";
import api from "../lib/axios";
import { InitialType, Note, NoteFormData, Task } from "../types";


type PropsAddNote = {
    formData: NoteFormData, 
    projectID: InitialType["_id"], 
    taskID: Task["_id"]
}
export const addNote = async ({formData, projectID, taskID}: PropsAddNote) => {
    try {
        const {data} = await api.post<string>(`/projects/${projectID}/tasks/${taskID}/notes`, formData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors)
        } 
    }
}

type PropsDelete = {
    projectID: InitialType["_id"], 
    taskID: Task["_id"]
    noteID: Note["_id"],
}
export async function deleteNote({projectID, taskID, noteID}: PropsDelete) {
    try {
        const { data } = await api.delete<string>(`projects/${projectID}/tasks/${taskID}/notes/${noteID}`);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors)
        } 
    }
}