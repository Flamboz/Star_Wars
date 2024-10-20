import { Film, Person, Starship } from "../types";

export const createNodesAndEdges = (
  char: Person | null,
  films: Film[] | null,
  starships: Starship[] | null
) => {
  if (!char || !films || !starships) return { nodes: [], edges: [] };

  const modalWidth = window.innerWidth * 0.8;
  const centerX = modalWidth / 2;
  const magicNumber = 300;
  const spacing = 600;

  const nodes = [
    {
      id: `char-${char.id}`,
      type: "custom",
      data: {
        id: `char-${char.id}`,
        info: [
          { label: "Name", value: char.name },
          { label: "Height", value: `${char.height} cm` },
          { label: "Mass", value: `${char.mass} kg` },
          { label: "Hair Color", value: char.hair_color },
          { label: "Skin Color", value: char.skin_color },
          { label: "Eye Color", value: char.eye_color },
          { label: "Birth Year", value: char.birth_year },
          { label: "Gender", value: char.gender },
        ],
        imageUrl: `https://starwars-visualguide.com/assets/img/characters/${char.id}.jpg`,
      },
      position: { x: centerX, y: 0 },
    },
    ...films.map((film, index) => ({
      id: `film-${film.id}`,
      type: "custom",
      data: {
        id: `film-${film.id}`,
        info: [
          { label: "Title", value: film.title },
          { label: "Episode", value: film.episode_id },
          { label: "Director", value: film.director },
          { label: "Release Date", value: film.release_date },
          {
            label: "Opening Crawl",
            value: film.opening_crawl.slice(0, 50) + "...",
          },
        ],
        imageUrl: `https://starwars-visualguide.com/assets/img/films/${film.id}.jpg`,
      },
      position: {
        x: centerX - magicNumber * (films.length - 1) + index * spacing,
        y: 400,
      },
    })),
    ...starships.map((starship, index) => ({
      id: `starship-${starship.id}`,
      type: "custom",
      data: {
        id: `starship-${starship.id}`,
        info: [
          { label: "Name", value: starship.name },
          { label: "Model", value: starship.model },
          { label: "Manufacturer", value: starship.manufacturer },
          { label: "Cost", value: `${starship.cost_in_credits} credits` },
          { label: "Length", value: `${starship.length} meters` },
          { label: "Crew", value: starship.crew },
          { label: "Passengers", value: starship.passengers },
          { label: "Cargo Capacity", value: `${starship.cargo_capacity} kg` },
        ],
        imageUrl: `https://starwars-visualguide.com/assets/img/starships/${starship.id}.jpg`,
      },
      position: {
        x: centerX - magicNumber * (starships.length - 1) + index * spacing,
        y: 800,
      },
    })),
  ];

  const edges = films.map((film) => ({
    id: `char-to-film-${film.id}`,
    source: `char-${char.id}`,
    target: `film-${film.id}`,
    type: "custom",
  }));

  films.forEach((film) =>
    film.starships.forEach((starshipId: number) => {
      const starshipIds = starships.map((starship) => starship.id);

      if (starshipIds.includes(starshipId)) {
        edges.push({
          id: `film-to-starship-${film.id}-${starshipId}`,
          source: `film-${film.id}`,
          target: `starship-${starshipId}`,
          type: "custom",
        });
      }
    })
  );

  return { nodes, edges };
};
