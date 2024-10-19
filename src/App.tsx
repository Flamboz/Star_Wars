import { useEffect, useState } from "react";
import List from "./components/List";
import { Person } from "./types";
import "./App.css";

type FetchPeopleStateHandlers = {
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setPreviousPeopleURL: React.Dispatch<React.SetStateAction<string | null>>;
  setNextPeopleURL: React.Dispatch<React.SetStateAction<string | null>>;
};

const fetchPeopleData = (url: string, handlers: FetchPeopleStateHandlers) => {
  const {
    setPeople,
    setIsLoading,
    setIsError,
    setPreviousPeopleURL,
    setNextPeopleURL,
  } = handlers;

  setIsLoading(true);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setPeople(data.results);
      setIsLoading(false);
      setIsError(false);
      setPreviousPeopleURL(data.previous);
      setNextPeopleURL(data.next);
      console.log(data);
    })
    .catch((error) => {
      setPeople([]);
      setIsError(true);
      console.log("Error fetching: ", error);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [previousPeopleURL, setPreviousPeopleURL] = useState<string | null>(
    null
  );
  const [nextPeopleURL, setNextPeopleURL] = useState<string | null>(null);

  const goToPrevious = () => {
    if (previousPeopleURL) {
      fetchPeopleData(previousPeopleURL, {
        setPeople,
        setIsLoading,
        setIsError,
        setPreviousPeopleURL,
        setNextPeopleURL,
      });
    }
  };

  const goToNext = () => {
    if (nextPeopleURL) {
      fetchPeopleData(nextPeopleURL, {
        setPeople,
        setIsLoading,
        setIsError,
        setPreviousPeopleURL,
        setNextPeopleURL,
      });
    }
  };

  useEffect(() => {
    fetchPeopleData("https://sw-api.starnavi.io/people/", {
      setPeople,
      setIsLoading,
      setIsError,
      setPreviousPeopleURL,
      setNextPeopleURL,
    });
  }, []);

  return (
    <div className="wrapper">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Oops, something went wrong. Try again later</div>}
      {!isLoading && !isError && <List people={people} />}
      {!isLoading && (
        <footer className="footer">
          <button
            className="footer__button"
            onClick={goToPrevious}
            disabled={!previousPeopleURL || isLoading}
          >
            Previous
          </button>
          <button
            className="footer__button"
            onClick={goToNext}
            disabled={!nextPeopleURL || isLoading}
          >
            Next
          </button>
        </footer>
      )}
    </div>
  );
}

export default App;
