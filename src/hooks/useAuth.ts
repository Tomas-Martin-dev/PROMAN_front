import { getUser } from "../services/AuthAPI";
import { useQuery } from "@tanstack/react-query";

export const useAuth = ()=> {
    
    const {data, isError, isLoading, error} = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: true
    })
    return {
        data,
        isError,
        isLoading,
        error
    }
}