import { useCallback, useEffect, useState } from "react";
import { Person } from "../types";

// useFetchPeople hook: Fetches a list of Star Wars characters.
// Manages loading, error states, and current page state.
// Provides pagination functionality with navigation through previous and next URLs. Updates the browser's URL based on the current page. Retrieves and saves the current page in local storage to persist state across page reloads.
// Returns the fetched characters, loading status, error status, current page, total pages and functions for changing pages.
export const useFetchPeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [previousURL, setPreviousURL] = useState<string | null>(null);
  const [nextURL, setNextURL] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [totalPages, setTotalPages] = useState(0);

  const fetchPeopleData = useCallback(async (url: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (Array.isArray(data.results)) {
        setPeople(data.results);
        setPreviousURL(data.previous);
        setNextURL(data.next);
        setTotalPages(Math.ceil(data.count / 10));
        setIsError(false);
      } else {
        throw new Error("Fetched data is not an array");
      }
    } catch (error) {
      setPeople([]);
      setIsError(true);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialPage = currentPage;
    fetchPeopleData(`https://sw-api.starnavi.io/people/?page=${initialPage}`);
  }, [fetchPeopleData, currentPage]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const pageParam = page === 1 ? "" : `?page=${page}`;
    fetchPeopleData(`https://sw-api.starnavi.io/people/${pageParam}`);
    setCurrentPage(page);

    if (page === 1) {
      window.history.replaceState({}, "", "/Star_Wars");
    } else {
      window.history.pushState({}, "", pageParam);
    }
  };

  const handlePrevious = () => {
    if (previousURL) {
      goToPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (nextURL) {
      goToPage(currentPage + 1);
    }
  };

  return {
    people,
    isLoading,
    isError,
    previousURL,
    nextURL,
    currentPage,
    totalPages,
    goToPage,
    handlePrevious,
    handleNext,
  };
};
