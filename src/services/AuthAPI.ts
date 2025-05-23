import { isAxiosError } from "axios";
import api from "../lib/axios";
import { CheckPasswordForm, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UpdatePasswordForm, UserLoginForm, UserProfileForm, UserRegisterForm } from "../types";
import { userSchemma } from "../types/schemmas";

export async function createAccount(formData: UserRegisterForm) {
    try {
        const {data} = await api.post<string>("/auth/create-account", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        } 
    }
}

export async function ConfirmarToken(token: ConfirmToken) {
    try {
        const {data} = await api.post<string>("/auth/confirm-account", token);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        } 
    }
}

export async function NewCodeConfirmed(email: RequestConfirmationCodeForm) {
    try {
        const {data} = await api.post<string>("/auth/request-code", email);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        } 
    }
}

export async function Login(formData: UserLoginForm) {
    try {
        const {data} = await api.post<string>("/auth/login", formData);        
        localStorage.setItem("AuthUser", data)
        return
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        } 
    }
}

export async function ForgotPass(formData: ForgotPasswordForm) {
    try {
        const {data} = await api.post<string>("/auth/forgot-password", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        } 
    }
}

export async function ConfirmarTokenPass(token: ConfirmToken) {
    try {
        const {data} = await api.post<string>("/auth/validat-token", token);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        } 
    }
}

type PropsNewPass = {
    formData: NewPasswordForm;
    token: string;
}
export async function NewPass({formData, token}: PropsNewPass) {    
    try {
        const {data} = await api.post<string>(`/auth/update-password/${token}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        } 
    }
}

export async function getUser() {    
    try {
        const data = await api(`/auth/user`);
        const result = userSchemma.safeParse(data.data)
        if (result.success) {
            return result.data;
        }        
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        } 
    }
}

export async function updateProfile(formData: UserProfileForm) {    
    try {
        const {data} = await api.put<string>(`/auth/profile`, formData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors)
        } 
    }
}

export async function updatePassword(FormData: UpdatePasswordForm) {    
    try {
        const {data} = await api.post<string>(`/auth/profile/changePass`, FormData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors)
        } 
    }
}

export async function checkPassword(FormData: CheckPasswordForm) {    
    try {
        const {data} = await api.post<string>(`/auth/check-password`, FormData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors)
        } 
    }
}