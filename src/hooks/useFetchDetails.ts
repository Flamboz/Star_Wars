import { useEffect, useState } from "react";
import { Person } from "../types";

export const useFetchDetails = (
  selectedPersonId: number | null,
  people: Person[]
) => {
  const [person, setPerson] = useState<Person | null>(null);
  const [films, setFilms] = useState<any[] | null>(null);
  const [starships, setStarships] = useState<any[] | null>(null);

  useEffect(() => {
    if (!selectedPersonId) return;

    const selectedPerson = people.find((p) => p.id === selectedPersonId);
    setPerson(selectedPerson);

    if (!selectedPerson) return;

    const fetchDetails = async () => {
      try {
        const [filmsData, starshipsData] = await Promise.all([
          Promise.all(
            selectedPerson.films.map((id) =>
              fetch(`https://sw-api.starnavi.io/films/${id}/`).then((res) =>
                res.json()
              )
            )
          ),
          Promise.all(
            selectedPerson.starships.map((id) =>
              fetch(`https://sw-api.starnavi.io/starships/${id}/`).then((res) =>
                res.json()
              )
            )
          ),
        ]);
        setFilms(filmsData);
        setStarships(starshipsData);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [selectedPersonId, people]);

  return { person, films, starships };
};
