// src/hooks/useFetchData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const defaultConfig = {
  // Set default configuration options here
  headers: {
    'Content-Type': 'application/json',
  },
};

const useFetchData = (url, options = {}, config = {}) => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!url) {
      return;
    }

    const source = axios.CancelToken.source(); // Cancel token for request

    const fetchData = async () => {
      setState(prevState => ({ ...prevState, loading: true }));
      try {
        const { method = 'GET', data = null, params = {} } = options;

        const response = await axios({
          url,
          method,
          data,
          params, // Pass params here
          cancelToken: source.token,
          ...defaultConfig,
          ...config,
        });

        setState({ data: response.data, loading: false, error: null });
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          setState({ data: null, loading: false, error: err });
        }
      }
    };

    fetchData();

    return () => {
      source.cancel('Component unmounted. Request canceled.');
    };
  }, [url, options, config]);

  return state;
};

export default useFetchData;

// Example usage
/*
    // GET request with default configuration
  const { data: getData, loading: getLoading, error: getError } = useFetchData(
    'https://jsonplaceholder.typicode.com/posts'
  );
    // POST request with data and custom configuration
  const { data: postData, loading: postLoading, error: postError } = useFetchData(
    'https://jsonplaceholder.typicode.com/posts',
    { method: 'POST', data: { title: 'foo', body: 'bar', userId: 1 }}
  );

    // DELETE request with custom configuration
    const { data: deleteData, loading: deleteLoading, error: deleteError } = useFetchData(
      'https://jsonplaceholder.typicode.com/posts',
      { method: 'DELETE', params: { userId: 1 } }
    );

*/
