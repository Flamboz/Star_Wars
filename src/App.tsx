import { useEffect, useState } from "react";

type Person = {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: number[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: number;
  id: number;
  mass: string;
  name: string;
  skin_color: string;
  species: number[];
  starships: number[];
  url: string;
  vehicles: number[];
};

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://sw-api.starnavi.io/people/")
      .then((response) => response.json())
      .then((data) => {
        setPeople(data.results);
        setIsLoading(false);
        setIsError(false);
        console.log(data.results);
      })
      .catch((error) => {
        setPeople([]);
        setIsLoading(false);
        setIsError(true);
        console.log("Error fetching: ", error);
      });
  }, []);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Oops, something went wrong. Try again later</div>}
      {!isLoading &&
        !isError &&
        people.map((person) => {
          return <div key={person.id}>{person.name}</div>;
        })}
    </div>
  );
}

export default App;
