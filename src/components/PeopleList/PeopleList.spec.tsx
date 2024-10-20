import { render, screen, fireEvent } from "@testing-library/react";
import PeopleList from "./PeopleList";
import { Person } from "../../types";
import { describe, expect, it, vitest } from "vitest";

describe("PeopleList", () => {
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

  const mockSetSelectedPersonId = vitest.fn();

  it("renders a list of people", () => {
    render(
      <PeopleList
        people={mockPeople}
        setSelectedPersonId={mockSetSelectedPersonId}
      />
    );

    const personElements = screen.getAllByRole("listitem");
    expect(personElements).toHaveLength(mockPeople.length);
  });

  it("renders the correct person names", () => {
    render(
      <PeopleList
        people={mockPeople}
        setSelectedPersonId={mockSetSelectedPersonId}
      />
    );

    mockPeople.forEach((person) => {
      expect(screen.getByText(person.name)).toBeInTheDocument();
    });
  });

  it("calls setSelectedPersonId with the correct id when a person is clicked", () => {
    render(
      <PeopleList
        people={mockPeople}
        setSelectedPersonId={mockSetSelectedPersonId}
      />
    );

    const personElement = screen.getByText(mockPeople[0].name);
    fireEvent.click(personElement);

    expect(mockSetSelectedPersonId).toHaveBeenCalledWith(mockPeople[0].id);
  });

  it("renders the correct person images", () => {
    render(
      <PeopleList
        people={mockPeople}
        setSelectedPersonId={mockSetSelectedPersonId}
      />
    );

    mockPeople.forEach((person) => {
      const imgElement = screen.getByAltText(person.name) as HTMLImageElement;
      expect(imgElement.src).toContain(
        `https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`
      );
    });
  });
});
