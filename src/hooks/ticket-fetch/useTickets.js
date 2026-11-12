import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { config } from "../../../config";
import { HttpError } from "../../utils/errors";
import { useParams } from "react-router-dom";

const url = (endpoint='') => `${config.backendUrl}/api/ticket/${endpoint}`;

function useCreateTicket() {
    const queryClient = useQueryClient();
    const jwtInStore = sessionStorage.getItem('auth-token');
    const mutationResult = useMutation({
        mutationFn: async (payload) => {

            const response = await fetch(url('create'), {
                method: 'POST',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`,

                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                
                let errorData = null;
                
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error("Response Wasn't JSON", { cause: e });
                }

                const errorMessage = errorData?.message || 'Request failed';

                throw new HttpError(response.status, errorMessage, errorData);

            };

            const data = await response.json();

            return data;

        },
        onSuccess: () => {
            queryClient.invalidateQueries(['tickets']);
        }
    });
    
    return {
        createTicket: mutationResult.mutateAsync,       
        isCreating: mutationResult.isPending,      
        creationError: mutationResult.isError,      
  };
};

function useGetAllTickets(searchParams) {
    const jwtInStore = sessionStorage.getItem('auth-token'); 
    const queryResult = useQuery({
        queryKey: ['tickets'],
        queryFn: async (payload) => {
            const response = await fetch(url(`?${searchParams}`), {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
                }
            });
                
            if (!response.ok) {
                
                let errorData = null;
                
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error("Response Wasn't JSON", { cause: e });
                }

                const errorMessage = errorData?.message || 'Request failed';

                throw new HttpError(response.status, errorMessage, errorData);

            };

            const data = await response.json();
            
            return data.ticketArray
        }
    })
    return {
        tickets: queryResult.data ?? [],
        isGettingTickets: queryResult.isPending,
        errorGettingTickets: queryResult.isError,
        theError: queryResult.error
    }
};

function useGetTicketById(ticketId) {
    const jwtInStore = sessionStorage.getItem('auth-token');
    const queryClient = useQueryClient();
    const queryResult = useQuery({
        queryKey: ['ticket', ticketId], 
        enabled: Boolean(ticketId),
        initialData: () => {
            const cache = queryClient.getQueryData(['tickets']);
            const tickets = Array.isArray(cache) ? cache : cache?.ticketArray;
            return tickets?.find((ticket) => ticket._id === ticketId)
        },
        queryFn: async () => {

            const response = await fetch(url(ticketId), {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`,
                }
            });

            if (!response.ok) {
                
                let errorData = null;
                
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error("Response Wasn't JSON", { cause: e });
                }

                const errorMessage = errorData?.message || 'Request failed';

                throw new HttpError(response.status, errorMessage, errorData);

            };

            const ticketData = await response.json();

            return ticketData;
        },

    });

    return {
        ticket: queryResult.data,
        isGettingTicket: queryResult.isPending,
        ticketFetchError: queryResult.isError
    };
};

function useAddComment() {

    const jwt = sessionStorage.getItem('auth-token');
    const params = useParams();
    const ticketId = params.ticketId;
    const queryClient = useQueryClient();
    const mutationResult = useMutation({
        mutationFn: async (payload) => {
            const response = await fetch(url(`${ticketId}/add-comment`), {
                method: 'POST',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/JSON',
                    Authorization: `Bearer ${jwt}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                
                let errorData = null;
                
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error("Response Wasn't JSON", { cause: e });
                }

                const errorMessage = errorData?.message || 'Request failed';

                throw new HttpError(response.status, errorMessage, errorData);

            };

            const data = await response.json();

            return data;
        },
        onMutate: async (comment) => {
            await queryClient.cancelQueries(['comments']);
            const previous = queryClient.getQueryData(['commnets', ticketId]);
            queryClient.setQueryData(['comments', ticketId], (old) => {
                let array = [...old.commentArray, comment];
                return {
                    ...old,
                    commentArray: array
                }    
            });
            
            return { previous };

        },
        onSettled: (result, error, variables, onMutate) => {
            queryClient.invalidateQueries({queryKey: ['comments', params.ticketId]})
        },

        onError: (error, variable, onMutateResult) => {
            queryClient.setQueryData(['comments', ticketId], onMutateResult?.previous);
        }
    });

    return {
        addComment: mutationResult.mutate,
        isAdding: mutationResult.isPending,
        errorAdding: mutationResult.isError,
        commentAdded: mutationResult.isSuccess
    }
};

function useGetComments(urlQuery) {
    const params = useParams();
    const ticketId = params.ticketId;
    const jwt = sessionStorage.getItem('auth-token');
    const pageParam = `page=${urlQuery?.get('page')}`; 

    const queryResult = useQuery({
        queryKey: ['comments', ticketId],
        queryFn: async () => {
            const response = await fetch(url(`${ticketId}/get-comments?${pageParam}`), {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/JSON',
                    Authorization: `Bearer ${jwt}`
                },
            });

            if (!response.ok) {
                let errorData = null;
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error("Response Wasn't JSON", { cause: e });
                }
                const errorMessage = errorData?.message || 'Request failed';
                throw new HttpError(response.status, errorMessage, errorData);
            };
            const data = await response.json();
            return data;
        },
        enabled: Boolean(urlQuery)
    });

    return {
        comments: queryResult.data,
        isGettingComments: queryResult.isPending,
        errorGettingComments: queryResult.isError
    }
};

function useGetTicketViewCounts() {
    const jwt = sessionStorage.getItem('auth-token');

    const counts = useQuery({
        queryKey: ['counts'],
        queryFn: async () => {
            const response = await fetch(url('counts'), {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwt}`
                }
            });

            if (!response.ok) {
                let errorData = null;
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error("Response Wasn't JSON", { cause: e });
                }
                const errorMessage = errorData?.message || 'Request failed';
                throw new HttpError(response.status, errorMessage, errorData);
            };

            const data = await response.json();

            return data.ticketCounts[0];
        }
    })

    return {
        counts: counts.data,
        countError: counts.isError,
        counting: counts.isPending
    }
};

function useTicketSearch(searchParams) {
    const jwtInStore = sessionStorage.getItem('auth-token');
    const search = useQuery({
        enabled: Boolean(searchParams),
        queryKey: ['tickets', searchParams],
        queryFn: async () => {
            const response = await fetch(url(`search?${searchParams}`), {
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
                    throw new Error("Response Wasn't JSON", { cause: e });
                }
                const errorMessage = errorData?.message || 'Request failed';
                throw new HttpError(response.status, errorMessage, errorData);
            };


            const data = await response.json();
            return {
                results: data.results,
                totalPages: data.totalPages,
                currentPage: data.currentPage
            }
        }
    })

    return {
        searchData: search.data,
        searching: search.isPending,
        searchError: search.isError
    };

};

function useUpdateTicketMeta() {
    const params = useParams();
    const ticketId = params.ticketId;
    const jwt = sessionStorage.getItem('auth-token');
    const queryClient = useQueryClient();

    const mutationResult = useMutation({
        mutationFn: async (payload) => {
            const response = await fetch(url(`${ticketId}/update`), {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${jwt}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                let errorData = null;
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error("Response Wasn't JSON", { cause: e });
                }
                const errorMessage = errorData?.message || 'Request failed';
                throw new HttpError(response.status, errorMessage, errorData);
            };

            const data = await response.json();

            return data;
        },

        onMutate: async (updatedData) => {
            await queryClient.cancelQueries(['tickets']);
            const previousState = queryClient.getQueryData(['tickets', ticketId]);

            queryClient.setQueryData(['ticket', ticketId], (old) => {

                let updated = {
                    ...old
                };
                for (const [key, value] of Object.entries(updatedData)) {
                    if(old[key] !== value) {
                        updated[key] = value;
                    }
                };
            });

            return {
                previousState
            }
        },
        onError: (error, variable, onMutateResult) => {
            queryClient.setQueryData(['tickets', ticketId], onMutateResult.previousState)
        },
        onSettled: (result) => {
            queryClient.invalidateQueries['tickets'];
        }, 
    });

    return {
        updateTicket: mutationResult.mutate,
        ticketUpdating: mutationResult.isPending,
        errorUpdatingTicket: mutationResult.isError,
    }
};

function useUploadAttachment() {

    const jwtInStore = sessionStorage.getItem('auth-token');

    const mutationResult = useMutation({
        mutationFn: async (payload) => {

            const response = await fetch(url(`presigned-url?fileName=${payload.name}&fileType=${payload.type}`), {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`,

                },
            });

            if (!response.ok) {
                let errorData = null;
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error("Response Wasn't JSON", { cause: e });
                }
                const errorMessage = errorData?.message || 'Request failed';
                throw new HttpError(response.status, errorMessage, errorData);
            };

            const data = await response.json();

            const uploadFile = await fetch(data.uploadUrl, {
                method: 'PUT',
                body: payload
            });

            if (!uploadFile.ok) {
                throw new Error(`HTTP error while uploading files. Status: ${uploadFile.status}`);
            }

            let metaData = {

            }

            return {
                fileUrl: data.fileUrl,
                fileName: data.fileName,
                fileType: data.fileType
            };

        },
    });
    
    return {
        uploadFile: mutationResult.mutateAsync,       
        isUploading: mutationResult.isPending,      
        uploadError: mutationResult.error,       
  };

};

export {
    useAddComment,
    useCreateTicket,
    useGetAllTickets,
    useGetComments,
    useGetTicketById,
    useGetTicketViewCounts,
    useTicketSearch,
    useUpdateTicketMeta,
    useUploadAttachment,
}