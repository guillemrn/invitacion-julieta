import { useMemo } from 'react';

export function useQueryParams() {
    const params = useMemo(() => {
        return new URLSearchParams(window.location.search);
    }, []);

    return params;
}
