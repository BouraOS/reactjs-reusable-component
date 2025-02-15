import { useEffect, useRef, useCallback } from 'react';

function useDebouncedCallback(callback, delay, dependencies = []) {
  const debouncedCallbackRef = useRef(null);

  // Cleanup the previous timer on component unmount or on change in dependencies/delay
  useEffect(() => {
    const handler = () => {
      debouncedCallbackRef.current = setTimeout(callback, delay);
    };

    handler();

    return () => {
      clearTimeout(debouncedCallbackRef.current);
    };
  }, [callback, delay, ...dependencies]);

  // Return a function to clear the timeout manually
  const clearDebounce = useCallback(() => {
    if (debouncedCallbackRef.current) {
      clearTimeout(debouncedCallbackRef.current);
    }
  }, []);

  // Return an additional function to invoke the callback immediately and clear the timeout
  const flush = useCallback(() => {
    clearDebounce();
    callback();
  }, [callback, clearDebounce]);

  return { clear: clearDebounce, flush };
}

export default useDebouncedCallback;

// Example usage:
/*
  const [searchQuery, setSearchQuery] = useState('');

    const fetchResults = () => {
        console.log('Fetching results for:', query);
        // Perform the API call here
    };

    // Debounce the API call
    const { clear, flush } = useDebouncedCallback(fetchResults, 500, [searchQuery]);

    return (
    <>
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);
            }}
        />
        <button onClick={flush}>Search</button> // Call the debounced API call immediately
        <button onClick={clear}>Cancel Search</button> Cancel current debounce
    </>
    );
*/
