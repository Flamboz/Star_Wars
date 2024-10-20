import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { useFetchPeople } from "./hooks/useFetchPeople";
import {
  beforeEach,
  describe,
  expect,
  MockedFunction,
  test,
  vitest,
} from "vitest";

// Mock the custom hook
vitest.mock("./hooks/useFetchPeople");

const mockUseFetchPeople = useFetchPeople as MockedFunction<
  typeof useFetchPeople
>;

describe("App Component", () => {
  beforeEach(() => {
    mockUseFetchPeople.mockReturnValue({
      people: [],
      isLoading: false,
      isError: false,
      previousURL: null,
      nextURL: null,
      fetchPeopleData: vitest.fn(),
    });
  });

  test("renders loader when loading", () => {
    mockUseFetchPeople.mockReturnValueOnce({
      people: [],
      isLoading: true,
      isError: false,
      previousURL: null,
      nextURL: null,
      fetchPeopleData: vitest.fn(),
    });

    render(<App />);
    expect(screen.getByTestId("data-loader")).toBeInTheDocument();
  });

  test("renders error message when there is an error", () => {
    mockUseFetchPeople.mockReturnValueOnce({
      people: [],
      isLoading: false,
      isError: true,
      previousURL: null,
      nextURL: null,
      fetchPeopleData: vitest.fn(),
    });

    render(<App />);
    expect(
      screen.getByText(/Something went wrong. Try again later/i)
    ).toBeInTheDocument();
  });

  test("renders people list when data is loaded", () => {
    mockUseFetchPeople.mockReturnValueOnce({
      people: [
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
      ],
      isLoading: false,
      isError: false,
      previousURL: null,
      nextURL: null,
      fetchPeopleData: vitest.fn(),
    });

    render(<App />);
    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
  });

  test("opens and closes modal on person select", () => {
    mockUseFetchPeople.mockReturnValueOnce({
      people: [
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
      ],
      isLoading: false,
      isError: false,
      previousURL: null,
      nextURL: null,
      fetchPeopleData: vitest.fn(),
    });

    render(<App />);
    fireEvent.click(screen.getByText(/luke skywalker/i));
    expect(screen.getByTestId("modal")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-modal"));

    expect(screen.getByTestId("modal")).toHaveAttribute("aria-hidden", "true");
  });

  test("handles pagination", () => {
    const fetchPeopleDataMock = vitest.fn();
    mockUseFetchPeople.mockReturnValueOnce({
      people: [],
      isLoading: false,
      isError: false,
      previousURL: "prev-url",
      nextURL: "next-url",
      fetchPeopleData: fetchPeopleDataMock,
    });

    render(<App />);
    fireEvent.click(screen.getByText(/next/i));
    expect(fetchPeopleDataMock).toHaveBeenCalledWith("next-url");

    fireEvent.click(screen.getByText(/previous/i));
    expect(fetchPeopleDataMock).toHaveBeenCalledWith("prev-url");
  });
});
