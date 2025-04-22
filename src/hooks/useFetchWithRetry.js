import { useEffect, useState } from "react";
import axios from "axios";

// TODO: you could make it support POST calls too?

export function useFetchWithRetry(
  url,
  options = {},
  retries = 3,
  delay = 1000
) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const response = await axios(url, options);
          if (!cancelled) {
            setData(response.data);
            setLoading(false);
          }
          return;
        } catch (err) {
          const isLast = attempt === retries;
          const retryableStatus = [500, 502, 503, 504];
          const shouldRetry =
            !error.response || retryableStatus.includes(error.response.status);
          //   const shouldRetry = !err.response || err.response.status >= 500; or this line

          if (!shouldRetry || isLast) {
            if (!cancelled) {
              setError(err);
              setLoading(false);
            }
            return;
          }

          await new Promise((res) => setTimeout(res, delay));
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, JSON.stringify(options)]); // re-run on URL or options change

  return { data, error, loading };
}

// Usage example
// const { data, error, loading } = useFetchWithRetry(
//   "https://api.example.com/data",
//   { method: "GET" },
//   3,
//   1000
// );
