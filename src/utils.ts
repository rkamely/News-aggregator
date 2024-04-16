export const debounce = <T>(func: (value: T) => void, delay: number) => {
    let timeout: NodeJS.Timeout | null;

    return (value: T) => {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => func(value), delay);
    };
};