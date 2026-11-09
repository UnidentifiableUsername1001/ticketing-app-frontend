import React, { useState, useEffect } from 'react';
import { config } from '../../../config';
import { useQuery } from '@tanstack/react-query';
import { HttpError } from '../../utils/errors';
import { data } from 'react-router-dom';

export function useGetDepartments() {

    const url = `${config.backendUrl}/api/department/`;
    const jwtInStore = sessionStorage.getItem('auth-token');
    
    const queryResult = useQuery({
        queryKey: ['departments'],
        queryFn: async () => {

            const response = await fetch(url, {
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

            return data;
        }
    })

    return {
        deptData: queryResult.data,
        errorGetting: queryResult.isError,
        deptPending: queryResult.isPending
    }
}