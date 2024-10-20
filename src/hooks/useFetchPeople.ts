import { useCallback, useEffect, useState } from "react";
import { Person } from "../types";

export const useFetchPeople = (initialUrl: string) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [previousURL, setPreviousURL] = useState<string | null>(null);
  const [nextURL, setNextURL] = useState<string | null>(null);

  const fetchPeopleData = useCallback(async (url: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setPeople(data.results);
      setPreviousURL(data.previous);
      setNextURL(data.next);
      setIsError(false);
    } catch (error) {
      setPeople([]);
      setIsError(true);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeopleData(initialUrl);
  }, [initialUrl, fetchPeopleData]);

  return { people, isLoading, isError, previousURL, nextURL, fetchPeopleData };
};
