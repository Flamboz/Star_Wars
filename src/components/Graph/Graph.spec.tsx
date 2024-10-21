import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, MockedFunction } from "vitest";
import Graph from "./Graph";
import { Person } from "../../types";
import { useFetchDetails } from "../../hooks/useFetchDetails";

vi.mock("../../hooks/useFetchDetails");

const mockUseFetchDetails = useFetchDetails as MockedFunction<
  typeof useFetchDetails
>;

const mockPeople: Person[] = [
  {
    id: 1,
    name: "Luke Skywalker",
    birth_year: "",
    created: "",
    edited: "",
    eye_color: "",
    films: [],
    gender: "",
    hair_color: "",
    height: "",
    homeworld: 0,
    mass: "",
    skin_color: "",
    species: [],
    starships: [],
    url: "",
    vehicles: [],
  },
  {
    id: 2,
    name: "Darth Vader",
    birth_year: "",
    created: "",
    edited: "",
    eye_color: "",
    films: [],
    gender: "",
    hair_color: "",
    height: "",
    homeworld: 0,
    mass: "",
    skin_color: "",
    species: [],
    starships: [],
    url: "",
    vehicles: [],
  },
];

describe("Graph Component", () => {
  it("renders Loader when details are loading", () => {
    mockUseFetchDetails.mockReturnValue({
      person: null,
      films: [],
      starships: [],
      isDetailsLoading: true,
      isDetailsError: false,
    });

    render(<Graph selectedPersonId={1} people={mockPeople} />);

    expect(screen.getByTestId("data-loader")).toBeInTheDocument();
  });

  it("renders ErrorMessage when there is an error", () => {
    mockUseFetchDetails.mockReturnValue({
      person: null,
      films: [],
      starships: [],
      isDetailsLoading: false,
      isDetailsError: true,
    });

    render(<Graph selectedPersonId={1} people={mockPeople} />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("renders ReactFlow when details are loaded", () => {
    mockUseFetchDetails.mockReturnValue({
      person: {
        id: 14,
        name: "Han Solo",
        height: "180",
        mass: "80",
        hair_color: "brown",
        skin_color: "fair",
        eye_color: "brown",
        birth_year: "29BBY",
        gender: "male",
        homeworld: 22,
        films: [1, 2, 3],
        species: [1],
        vehicles: [],
        starships: [10, 22],
        created: "2014-12-10T16:49:14.582000Z",
        edited: "2014-12-20T21:17:50.334000Z",
        url: "https://sw-api.starnavi.io/people/14/",
      },
      films: [
        {
          id: 1,
          title: "A New Hope",
          episode_id: 4,
          opening_crawl:
            "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
          director: "George Lucas",
          producer: "Gary Kurtz, Rick McCallum",
          release_date: "1977-05-25",
          characters: [
            10, 12, 13, 14, 15, 16, 18, 19, 1, 2, 3, 4, 5, 6, 7, 8, 9, 81,
          ],
          planets: [1, 2, 3],
          starships: [2, 3, 5, 9, 10, 11, 12, 13],
          vehicles: [4, 6, 7, 8],
          species: [1, 2, 3, 4, 5],
          created: "2014-12-10T14:23:31.880000Z",
          edited: "2014-12-20T19:49:45.256000Z",
          url: "https://sw-api.starnavi.io/films/1/",
        },
        {
          id: 2,
          title: "The Empire Strikes Back",
          episode_id: 5,
          opening_crawl:
            "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
          director: "Irvin Kershner",
          producer: "Gary Kurtz, Rick McCallum",
          release_date: "1980-05-17",
          characters: [
            10, 13, 14, 18, 20, 21, 22, 23, 24, 25, 26, 1, 2, 3, 4, 5,
          ],
          planets: [4, 5, 6, 27],
          starships: [3, 10, 11, 12, 15, 17, 21, 22, 23],
          vehicles: [8, 14, 16, 18, 19, 20],
          species: [1, 2, 3, 6, 7],
          created: "2014-12-12T11:26:24.656000Z",
          edited: "2014-12-15T13:07:53.386000Z",
          url: "https://sw-api.starnavi.io/films/2/",
        },
        {
          id: 3,
          title: "Return of the Jedi",
          episode_id: 6,
          opening_crawl:
            "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...",
          director: "Richard Marquand",
          producer: "Howard G. Kazanjian, George Lucas, Rick McCallum",
          release_date: "1983-05-25",
          characters: [
            10, 13, 14, 16, 18, 20, 21, 22, 25, 27, 28, 29, 30, 31, 45, 1, 2, 3,
            4, 5,
          ],
          planets: [1, 5, 7, 8, 9],
          starships: [27, 2, 3, 10, 11, 12, 15, 17, 22, 23, 28, 29],
          vehicles: [26, 8, 16, 18, 19, 24, 25, 30],
          species: [10, 15, 1, 2, 3, 5, 6, 8, 9],
          created: "2014-12-18T10:39:33.255000Z",
          edited: "2014-12-20T09:48:37.462000Z",
          url: "https://sw-api.starnavi.io/films/3/",
        },
      ],
      starships: [
        {
          id: 10,
          name: "Millennium Falcon",
          model: "YT-1300 light freighter",
          manufacturer: "Corellian Engineering Corporation",
          cost_in_credits: "100000",
          length: "34.37",
          max_atmosphering_speed: "1050",
          crew: "4",
          passengers: "6",
          cargo_capacity: "100000",
          consumables: "2 months",
          hyperdrive_rating: "0.5",
          MGLT: "75",
          starship_class: "Light freighter",
          pilots: [13, 14, 25, 31],
          films: [1, 2, 3],
          created: "2014-12-10T16:59:45.094000Z",
          edited: "2014-12-20T21:23:49.880000Z",
          url: "https://sw-api.starnavi.io/starships/10/",
        },
        {
          id: 22,
          name: "Imperial shuttle",
          model: "Lambda-class T-4a shuttle",
          manufacturer: "Sienar Fleet Systems",
          cost_in_credits: "240000",
          length: "20",
          max_atmosphering_speed: "850",
          crew: "6",
          passengers: "20",
          cargo_capacity: "80000",
          consumables: "2 months",
          hyperdrive_rating: "1.0",
          MGLT: "50",
          starship_class: "Armed government transport",
          pilots: [13, 14, 1],
          films: [2, 3],
          created: "2014-12-15T13:04:47.235000Z",
          edited: "2014-12-20T21:23:49.900000Z",
          url: "https://sw-api.starnavi.io/starships/22/",
        },
      ],
      isDetailsLoading: false,
      isDetailsError: false,
    });

    render(<Graph selectedPersonId={14} people={mockPeople} />);

    expect(screen.getByText(/Han Solo/i)).toBeInTheDocument();
    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
    expect(screen.getByText(/The Empire Strikes Back/i)).toBeInTheDocument();
    expect(screen.getByText(/Return of the Jedi/i)).toBeInTheDocument();
    expect(screen.getByText(/Millennium Falcon/i)).toBeInTheDocument();
    expect(screen.getByText(/Imperial shuttle/i)).toBeInTheDocument();
  });

  it("does not render ReactFlow when no person is selected", () => {
    mockUseFetchDetails.mockReturnValue({
      person: null,
      films: [],
      starships: [],
      isDetailsLoading: false,
      isDetailsError: false,
    });

    render(<Graph selectedPersonId={null} people={mockPeople} />);

    expect(screen.queryByText(/Luke Skywalker/i)).not.toBeInTheDocument();
  });
});
