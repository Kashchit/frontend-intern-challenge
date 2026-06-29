import { useEffect, useState } from 'react';

// Delays updating the returned value until the user stops typing for `delay` ms
export const useDebounce = <T,>(value: T, delay = 300): T => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
};