import { useState, useEffect, useRef, useCallback } from "react";

function useInfiniteScroll(fetchData, options = {}) {
  const { threshold = 0.8, initialPage = 1, debounceDelay = 300 } = options;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  // Debounce function to limit rapid calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadMore = useCallback(
    debounce(async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      setError(null);

      try {
        const newData = await fetchData(page);
        if (newData.length === 0) {
          setHasMore(false); // No more data to load
        } else {
          setData((prevData) => [...prevData, ...newData]);
          setPage((prevPage) => prevPage + 1); // Increment page for next fetch
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, debounceDelay),
    [fetchData, page, loading, hasMore, debounceDelay]
  );

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loadMore, hasMore, threshold]);

  return { data, loading, error, observerRef, hasMore };
}

export default useInfiniteScroll;

// Example Usage

/*
import React from 'react';
import useInfiniteScroll from './useInfiniteScroll';

const fetchData = async (page) => {
  // Simulate fetching data from an API with pagination
  const response = await fetch(`https://api.example.com/items?page=${page}`);
  const data = await response.json();
  return data.items; // Assume the API returns an object with an `items` array
};

function InfiniteScrollList() {
  const { data, loading, error, observerRef, hasMore } = useInfiniteScroll(fetchData, {
    threshold: 0.8,
    initialPage: 1,
    debounceDelay: 300,
  });

  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!hasMore && <p>No more items to load.</p>}
      <div ref={observerRef} style={{ height: '20px' }}></div>
    </div>
  );
}

export default InfiniteScrollList;


Example API Response:
{
  "items": [
    { "id": 1, "name": "Item 1" },
    { "id": 2, "name": "Item 2" }
  ]
}
*/
