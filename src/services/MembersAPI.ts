import { isAxiosError } from "axios";
import api from "../lib/axios";
import { TeamMemberForm, user } from "../types";
import { userSchemma, usersSchemma } from "../types/schemmas";

type PropsSearch = {
    formData: TeamMemberForm,
    projectId: string
}
export const searchMember = async ({formData, projectId}: PropsSearch) => {
    try {
        const {data} = await api.post(`/projects/${projectId}/team/find`, formData);
        const result = userSchemma.safeParse(data);
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors)
        } 
    }
}

export const addMemberTeam = async ({id, projectId}: {id: user["_id"], projectId: string}) => {
    try {
        const {data} = await api.post<string>(`/projects/${projectId}/team`, {id});
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors)
        } 
    }
}

export const getMembersTeam = async (projectId: string) => {
    try {
        const {data} = await api(`/projects/${projectId}/team`);
        const result = usersSchemma.safeParse(data);
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors)
        } 
    }
}

type PropsDelete = {
    projectId: string, 
    memberId: string
}
export const deleteMemberTeam = async ({projectId, memberId}: PropsDelete) => {
    try {
        const {data} = await api.delete<string>(`/projects/${projectId}/team/${memberId}`);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors)
        } 
    }
}