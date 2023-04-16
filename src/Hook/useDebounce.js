import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value]);

    return debounceValue;
}
useDebounce.propTypes = {
    value: PropTypes.string,
    delay: PropTypes.number,
};
export default useDebounce;
