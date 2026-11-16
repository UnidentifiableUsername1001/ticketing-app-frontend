import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { config } from "../../../config";
import { HttpError } from "../../utils/errors";

const url = (endpoint='') => `${config.backendUrl}/api/users/${endpoint}`;

function useUpdateUser() {
    const jwtInStore = sessionStorage.getItem('auth-token');
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: async (payload) => {

            const pairsArray = Object.entries(payload);
            const cleanPairs = pairsArray.filter((pair) => {
                const sanitised = typeof pair[1] === 'string' ? pair[1].trim()  : pair[1]; 
                switch(sanitised) {
                    case "":
                        return false
                    case null:
                        return false
                    case undefined:
                        return false;
                    case false:
                        return true
                    default:
                        return true
                };
            });

            let finalPayload = Object.fromEntries(cleanPairs);

            if (finalPayload.departmentId) {
                const destructDeptId = typeof finalPayload.departmentId === 'object' ? finalPayload.departmentId.value : finalPayload.departmentId;
                finalPayload.departmentId = destructDeptId;
            };

            if (finalPayload.role) {
                const destructRole = typeof finalPayload.role === 'object' ? finalPayload.role.value : finalPayload.role;
                finalPayload.role = destructRole;
            };

            const response = await fetch(url(`update-user/${payload._id}`), {
                method: 'PUT',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
                },
                body: JSON.stringify(finalPayload)
            });

            if (!response.ok) {
                let errorData = null
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error(`Response was not JSON. Status: ${response.status}`);
                }
                const errorMessage = errorData.message || 'Request Failed';
                throw new HttpError(response.status, errorMessage, errorData);
            };

            const data = response.json();

            return data;
        },
        onMutate: async (updatedUser) => {
            await queryClient.cancelQueries({ queryKey: ['users'] });
            const previousUsers = queryClient.getQueryData(['users']);
            queryClient.setQueryData(['users'], (old) => {
                return old.map((user) => user._id === updatedUser._id 
                    ? {...updatedUser,
                        role: updatedUser.role.value,
                    } 
                    : user
                );
            });

            return { previousUsers }
        },
        onError: (error, updatedDepartment, onMutateResult) => {
            queryClient.setQueryData(['users'], onMutateResult?.previousUsers);
        },
        onSettled: (data, error, variable, onMutateResult ) => {
            return queryClient.invalidateQueries({queryKey: ['users']});
        }
    })

    return {
        updateUser: update.mutateAsync,
        updatingUser: update.isPending,
        errorUpdating: update.isError
    };
};

function useGetOneUser(targetUserId) {
    const jwtInStore = sessionStorage.getItem('auth-token');
    const queryClient = useQueryClient();

    const getUser = useQuery({
        queryKey: ['users', targetUserId],
        enabled: Boolean(targetUserId),
        initialData: () => {
            const cache = queryClient.getQueryData(['users']);
            return cache.find((user) => user._id === targetUserId);
        },
        queryFn: async () => {
            const response = await fetch(url(targetUserId), {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
                }, 
            });

            if (!response.ok) {
                let errorData = null
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error(`Response was not JSON. Status: ${response.status}`);
                }
                const errorMessage = errorData.message || 'Request Failed';
                throw new HttpError(response.status, errorMessage, errorData);
            }

            const data = await response.json();
            return data;
        }
    });
    return {
        user: getUser.data,
        userPending: getUser.isPending,
        errorGetUser: getUser.isError,
        userError: getUser.error
    }
};

function useGetAllUsers() {
    
    const jwtInStore = sessionStorage.getItem('auth-token');
    const queryClient = useQueryClient();
    const allUsers = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await fetch(url(), {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
                }
            });

            if (!response.ok) {
                let errorData = null
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error(`Response was not JSON. Status: ${response.status}`);
                }
                const errorMessage = errorData.message || 'Request Failed';
                throw new HttpError(response.status, errorMessage, errorData);
            }
            const data = await response.json();
            return data.userArray;
        }
    });
    return {
        allUsers: allUsers.data,
        allUsersPending: allUsers.isPending,
        allUsersError: allUsers.isError
    }
};

function usePasswordReset () {
    const jwt = sessionStorage.getItem('auth-token');
    const mutationResult = useMutation({
        mutationFn: async (payload) => {
            const response = await fetch(url('password-reset'), {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                let errorData = null
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error(`Response was not JSON. Status: ${response.status}`);
                }
                const errorMessage = errorData.message || 'Request Failed';
                throw new HttpError(response.status, errorMessage, errorData);
            }

            const data = await response.json();

            return data;
        },
    });

    return {
        resetPassFunc: mutationResult.mutate,
        isResetting: mutationResult.isPending,
        errorResetting: mutationResult.isError
    }
};

function useNewUser() {
    const jwtInStore = sessionStorage.getItem('auth-token');
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: async (payload) => {
            const pairsArray = Object.entries(payload);
            const cleanPairs = pairsArray.filter((pair) => {
                const sanitised = typeof pair[1] === 'string' ? pair[1].trim()  : pair[1]; 
                switch(sanitised) {
                    case "":
                        return false
                    case null:
                        return false
                    case false:
                        return true
                    default:
                        return true
                };
            });

            let finalPayload = Object.fromEntries(cleanPairs);

            

            if (finalPayload.departmentId) {
                const destructDeptId = typeof finalPayload.departmentId === 'object' ? finalPayload.departmentId.value._id : finalPayload.departmentId;
                finalPayload.departmentId = destructDeptId;
            };

            if (finalPayload.role) {
                const role = typeof finalPayload.role === 'object' ? finalPayload.role.value : finalPayload.role;
                finalPayload.role = role;
            };

            const response = await fetch(url('new-user'), {
                method: 'POST',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
                },
                body: JSON.stringify(finalPayload)
            });

            if (!response.ok) {
                let errorData = null
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error(`Response was not JSON. Status: ${response.status}`);
                }
                const errorMessage = errorData.message || 'Request Failed';
                throw new HttpError(response.status, errorMessage, errorData);
            };
            
            
        },
        onMutate: async (newUser) => {
            queryClient.cancelQueries(['users']);
            const prevUsers = queryClient.getQueryData(['users']);

            let departmentId = newUser.departmentId.value._id;
            let role = newUser.role.value;

            queryClient.setQueryData(['users'], (old) => [
                ...(old ?? []),
                {...newUser, 
                    _id: crypto.randomUUID(),
                    departmentId: departmentId,
                    role: role
                }
            ])

            return {
                prevUsers
            }
        },
        onSettled: (data) => {
            queryClient.invalidateQueries(['users']);
        },
        onError: (error, variable, onMutate) => {
            queryClient.setQueryData(['users'], onMutate?.prevUsers);
        }

    })

    return {
        addUser: mutate.mutateAsync,
        isAdded: mutate.isSuccess,
        errorAdding: mutate.isError
    }
};

function useDeleteUser() {
    const queryClient = useQueryClient();
    const jwtInStore = sessionStorage.getItem('auth-token');
    const deleteUser = useMutation({ 
        mutationFn: async (payload) => {
            console.log(payload._id)
            const response = await fetch(url(`delete/${payload._id}`), {
                method: 'DELETE',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
                },
            });

            if (!response.ok) {
                let errorData = null
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error(`Response was not JSON. Status: ${response.status}`);
                }
                const errorMessage = errorData.message || 'Request Failed';
                throw new HttpError(response.status, errorMessage, errorData);
            };

            return response.json();
        },
        onMutate: async (oldUser) => {
            queryClient.cancelQueries(['users']);
            const oldUsers = queryClient.getQueryData(['users']);

            queryClient.setQueryData(['users'], (old) => 
                old.map((user) => user._id !== oldUser._id));

            return {
                oldUsers
            }
        },
        onError: (error, variables, onMutate) => {
            queryClient.setQueryData(['users'], onMutate.oldUsers);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['users']);
        }
    })
    return {
        deleteUser: deleteUser.mutateAsync,
        deletingUser: deleteUser.isPending,
        errorDeleting: deleteUser.isError
    }
}

export {
    useGetAllUsers,
    useGetOneUser,
    useNewUser,
    usePasswordReset,
    useUpdateUser,
    useDeleteUser
}