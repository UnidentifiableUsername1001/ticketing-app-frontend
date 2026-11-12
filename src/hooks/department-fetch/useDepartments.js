import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { config } from "../../../config";
import { HttpError } from "../../utils/errors";

const url = (param='') => `${config.backendUrl}/api/department/${param}`;

function useCreateDepartment() {
    const queryClient = useQueryClient();
    const jwtInStore = sessionStorage.getItem('auth-token');
    const createDepartment = useMutation({
        mutationFn: async (payload) => {

            const response = await fetch(url('new-department'), {
                method: 'POST',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
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
        onMutate: async (newDepartment) => {
            await queryClient.cancelQueries({ queryKey: ['departments'] });
            const previousDepts = queryClient.getQueryData(['departments']);

            queryClient.setQueryData(['departments'], (old) => [
                ...(old ?? []),
                {...newDepartment, _id: crypto.randomUUID()}
            ]);

            return { previousDepts }
        },
        onError: (error, newDepartment, onMutateResult) => {
            queryClient.setQueryData(['departments'], onMutateResult?.previousDepts);
        },
        onSettled: (data) => {
            return queryClient.invalidateQueries({queryKey: ['departments']});
        }
    })

    return {
        createDepartment: createDepartment.mutate,
        deptCreated: createDepartment.isSuccess,
        deptPending: createDepartment.isPending,
        deptError: createDepartment.isError
    }
};


function useEditDepartment () {
    const queryClient = useQueryClient();
    const jwtInStore = sessionStorage.getItem('auth-token');
    const updateDepartment = useMutation({
        mutationFn: async (payload) => {

            const response = await fetch(url(`edit-department/${payload._id}`), {
                method: 'PUT',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
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
        onMutate: async (updatedDepartment) => {
            await queryClient.cancelQueries({ queryKey: ['departments'] });
            const previousDepts = queryClient.getQueryData(['departments']);
            queryClient.setQueryData(['departments'], (old) => {
                return old.map((dept) => dept._id === updatedDepartment._id ? updatedDepartment : dept);
            });

            return { previousDepts }
        },
        onError: (error, updatedDepartment, onMutateResult) => {
            queryClient.setQueryData(['departments'], onMutateResult?.previousDepts);
        },
        onSettled: (data, error, variable, onMutateResult ) => {
            return queryClient.invalidateQueries({queryKey: ['departments']});
        }
    });

    return {
        update: updateDepartment.mutate,
        isUpdating: updateDepartment.isPending,
        errorUpdating: updateDepartment.isError
    }
};

function useGetDepartments() {
    const jwtInStore = sessionStorage.getItem('auth-token');
    const queryResult = useQuery({
        queryKey: ['departments'],
        queryFn: async () => {

            const response = await fetch(url(), {
                    method: 'GET',
                    headers: {
                        Accept: 'application/JSON',
                        'Content-Type':'application/JSON',
                        Authorization: `Bearer ${jwtInStore}`
                    }
                });

            if(!response.ok) {

                let errorData = null;

                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error(`Error received not JSON. Status: ${response.status}`)
                }

                const errorMessage = errorData?.message || response.statusText || 'Request Failed';

                throw new HttpError(response.status, errorMessage, errorData);
            }

            const data = await response.json();

            return data.departments;
        }
    })

    return {
        departments: queryResult.data,
        errorGetting: queryResult.isError,
        departmentsPending: queryResult.isPending
    }
};

function useGetOneDepartment(department) {
    const queryClient = useQueryClient();
    const jwtInStore = sessionStorage.getItem('auth-token');

    const id = department?._id;

    const getDepartment = useQuery({
        queryKey: ['departments', id],
        queryFn: async () => {
            const response = await fetch(url(`${id}`), {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
                }
            });

            if (!response.ok) {
                
                let errorData = null;
                
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error("Response Wasn't JSON");
                }

                const errorMessage = errorData?.message || 'Request failed';

                throw new HttpError(response.status, errorMessage, errorData);

            };
            
            const data = await response.json();
            const departmentData = data.department;

            return departmentData;
        },
        enabled: Boolean(id),
        initialData: () => {
            const cache = queryClient.getQueryData(['departments']);
            const list = Array.isArray(cache) ? cache : cache?.departments;
            return list?.find((dept) => dept._id === id);
        }
    })

    return {
        deptData: getDepartment.data,
        deptPending: getDepartment.isPending,
        deptError: getDepartment.error
    }

};

export {
    useCreateDepartment,
    useEditDepartment,
    useGetDepartments,
    useGetOneDepartment,
}