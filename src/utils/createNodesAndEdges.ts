import { Film, Person, Starship } from "../types";

export const createNodesAndEdges = (
  char: Person | null,
  films: Film[] | null,
  starships: Starship[] | null,
  modalWidth: number = 960,
  nodeWidth: number = 210
) => {
  if (!char || !films || !starships) return { nodes: [], edges: [] };

  const centerX = modalWidth / 2;
  const halfNodeWidth = nodeWidth / 2;
  const spacing = 200;

  const nodes = [
    {
      id: `char-${char.id}`,
      data: { label: char.name },
      position: { x: centerX - halfNodeWidth + spacing / 2, y: 0 },
    },
    ...films.map((film, index) => ({
      id: `film-${film.id}`,
      data: { label: film.title },
      position: {
        x:
          centerX -
          halfNodeWidth * films.length +
          index * spacing +
          halfNodeWidth,
        y: 100,
      },
    })),
    ...starships.map((starship, index) => ({
      id: `starship-${starship.id}`,
      data: { label: starship.name },
      position: {
        x:
          centerX -
          halfNodeWidth * starships.length +
          index * spacing +
          halfNodeWidth,
        y: 200,
      },
    })),
  ];

  const edges = films.map((film) => ({
    id: `char-to-film-${film.id}`,
    source: `char-${char.id}`,
    target: `film-${film.id}`,
    type: "smoothstep",
  }));

  films.forEach((film) =>
    film.starships.forEach((starshipId: number) => {
      if (starshipId) {
        edges.push({
          id: `film-to-starship-${film.id}-${starshipId}`,
          source: `film-${film.id}`,
          target: `starship-${starshipId}`,
          type: "default",
        });
      }
    })
  );

  return { nodes, edges };
};
