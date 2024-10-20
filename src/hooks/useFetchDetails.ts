import { useEffect, useState } from "react";
import { Film, Person, Starship } from "../types";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useFetchDetails = (
  selectedPersonId: number | null,
  people: Person[]
) => {
  const [person, setPerson] = useState<Person | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isDetailsError, setIsDetailsError] = useState(false);

  useEffect(() => {
    if (!selectedPersonId) return;

    const selectedPerson = people.find((p) => p.id === selectedPersonId);

    if (selectedPerson) {
      setPerson(selectedPerson);
    }

    if (!selectedPerson) return;

    const fetchDetails = async () => {
      try {
        setIsDetailsError(false);
        setIsDetailsLoading(true);

        const filmsData = await Promise.all(
          selectedPerson.films.map((id) =>
            fetch(`https://sw-api.starnavi.io/films/${id}/`).then((res) =>
              res.json()
            )
          )
        );

        if (selectedPerson.films.length > 4) {
          await delay(1000);
        }


        const starshipsData = await Promise.all(
          selectedPerson.starships.map((id) =>
            fetch(`https://sw-api.starnavi.io/starships/${id}/`).then((res) =>
              res.json()
            )
          )
        );

        if (Array.isArray(filmsData)) {
          setFilms(filmsData);
        } else {
          console.error("Films data is not an array:", filmsData);
        }

        if (Array.isArray(starshipsData)) {
          setStarships(starshipsData);
        } else {
          console.error("Starships data is not an array:", starshipsData);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
        setIsDetailsError(true);
      } finally {
        setIsDetailsLoading(false);
      }
    };

    fetchDetails();
  }, [selectedPersonId, people]);

  return { person, films, starships, isDetailsLoading, isDetailsError };
};
