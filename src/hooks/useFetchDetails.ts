import { useEffect, useState } from "react";
import { Film, Person, Starship } from "../types";

export const useFetchDetails = (
  selectedPersonId: number | null,
  people: Person[]
) => {
  const [person, setPerson] = useState<Person | null>(null);
  const [films, setFilms] = useState<Film[] | null>(null);
  const [starships, setStarships] = useState<Starship[] | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  useEffect(() => {
    if (!selectedPersonId) return;

    const selectedPerson = people.find((p) => p.id === selectedPersonId);

    if (selectedPerson) {
      setPerson(selectedPerson);
    }

    if (!selectedPerson) return;

    const fetchDetails = async () => {
      try {
        setIsDetailsLoading(true);
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
      } finally {
        setIsDetailsLoading(false);
      }
    };

    fetchDetails();
  }, [selectedPersonId, people]);

  return { person, films, starships, isDetailsLoading };
};
