import React, { useMemo} from "react";
import Fuse from 'fuse.js';
import { useDebounce } from "./useDebounce";

export function useFuseSearch(data = [], query, keys, fuseOptions, delay = 200) {

    const debouncedQuery = useDebounce(query, delay);

    const fuse = useMemo(() => {
        return fuseOptions
        ? new Fuse(data, {
            ...fuseOptions,
            keys: keys,
        })
        : new Fuse(data, {
            useTokenSearch: true,
            tokenMatch: 'all',
            threshold: 0.4,
            keys: keys,
        })
        
    }, [data])

    const displayItems = useMemo(() => {
        return debouncedQuery ? fuse.search(debouncedQuery).map(({item}) => item) : [];
    }, [fuse, debouncedQuery]) 
    
    
    return displayItems;

}