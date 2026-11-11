import { config } from "../../../config";
import { useAppContext } from "../../context/authContext";
import { useMutation } from '@tanstack/react-query';
import { HttpError } from "../../utils/errors";
import { jwtDecode } from "jwt-decode";

export function useLogin (object) {

    const { setIsLoggedIn } = useAppContext();
    const url = `${config.backendUrl}/api/auth/login`;

    const login = useMutation({
        mutationFn: async (payload) => {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(payload) 
            });

            const data = await response.json();

            if (!response.ok) {
                
                try {
                    
                } catch (e){
                    throw new Error(`Error was not JSON. Status: ${response.status}`)
                }

                const errorMessage = data?.message || response.statusText || 'Request failed';

                throw new HttpError(response.status, errorMessage, data)
            };
            
            setIsLoggedIn(true);

            return data
        },

        onSuccess: (data) => {
            const decodedJwt = jwtDecode(data.authToken);

            sessionStorage.setItem('auth-token', data.authToken);

            if(decodedJwt.user.scope !== 'password_reset_only') setIsLoggedIn(true);

            return {
                scope: decodedJwt.user.scope,
                response: data,
            };
        },
    })

    return {
        loginFunc: login.mutateAsync,
        successData: login.data,
        loggingIn: login.isPending,
        loggedIn: login.isSuccess,
        errorData: login.error,
        isError: login.isError,
    }
}