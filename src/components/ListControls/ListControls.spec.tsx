import { render, screen, fireEvent } from "@testing-library/react";
import ListControls from "./ListControls";
import { describe, expect, test, vi, afterEach } from "vitest";

describe("ListControls", () => {
  const mockOnPrevious = vi.fn();
  const mockOnNext = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders Previous and Next buttons", () => {
    render(
      <ListControls
        previousURL="previous-url"
        nextURL="next-url"
        isLoading={false}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("Previous button is disabled when previousURL is null", () => {
    render(
      <ListControls
        previousURL={null}
        nextURL="next-url"
        isLoading={false}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );

    expect(screen.getByText("Previous")).toBeDisabled();
  });

  test("Next button is disabled when nextURL is null", () => {
    render(
      <ListControls
        previousURL="previous-url"
        nextURL={null}
        isLoading={false}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );

    expect(screen.getByText("Next")).toBeDisabled();
  });

  test("Previous and Next buttons are disabled when isLoading is true", () => {
    render(
      <ListControls
        previousURL="previous-url"
        nextURL="next-url"
        isLoading={true}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );

    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });

  test("calls onPrevious when Previous button is clicked", () => {
    render(
      <ListControls
        previousURL="previous-url"
        nextURL="next-url"
        isLoading={false}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );

    fireEvent.click(screen.getByText("Previous"));
    expect(mockOnPrevious).toHaveBeenCalled();
  });

  test("calls onNext when Next button is clicked", () => {
    render(
      <ListControls
        previousURL="previous-url"
        nextURL="next-url"
        isLoading={false}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );

    fireEvent.click(screen.getByText("Next"));
    expect(mockOnNext).toHaveBeenCalled();
  });
});
