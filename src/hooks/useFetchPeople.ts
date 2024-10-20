import { useCallback, useEffect, useState } from "react";
import { Person } from "../types";

export const useFetchPeople = () => {
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

      if (Array.isArray(data.results)) {
        setPeople(data.results);
        setPreviousURL(data.previous);
        setNextURL(data.next);
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
    fetchPeopleData("https://sw-api.starnavi.io/people/");
  }, [fetchPeopleData]);

  return { people, isLoading, isError, previousURL, nextURL, fetchPeopleData };
};
