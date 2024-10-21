import { render, screen, fireEvent } from "@testing-library/react";
import ListControls from "./ListControls";
import { describe, expect, test, vi, afterEach } from "vitest";

describe("ListControls", () => {
  const mockOnPrevious = vi.fn();
  const mockOnNext = vi.fn();
  const mockOnFirstPage = vi.fn();
  const mockOnLastPage = vi.fn();
  const mockOnPageChange = vi.fn();

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
        onFirstPage={mockOnFirstPage}
        onLastPage={mockOnLastPage}
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText(">")).toBeInTheDocument();
    expect(screen.getByText("Last")).toBeInTheDocument();
  });

  test("renders page numbers correctly", () => {
    render(
      <ListControls
        previousURL="previous-url"
        nextURL="next-url"
        isLoading={false}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        onFirstPage={mockOnFirstPage}
        onLastPage={mockOnLastPage}
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  test("Previous button is disabled when previousURL is null", () => {
    render(
      <ListControls
        previousURL={null}
        nextURL="next-url"
        isLoading={false}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        onFirstPage={mockOnFirstPage}
        onLastPage={mockOnLastPage}
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("<")).toBeDisabled();
  });

  test("Next button is disabled when nextURL is null", () => {
    render(
      <ListControls
        previousURL="previous-url"
        nextURL={null}
        isLoading={false}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        onFirstPage={mockOnFirstPage}
        onLastPage={mockOnLastPage}
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText(">")).toBeDisabled();
  });

  test("Previous and Next buttons are disabled when isLoading is true", () => {
    render(
      <ListControls
        previousURL="previous-url"
        nextURL="next-url"
        isLoading={true}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        onFirstPage={mockOnFirstPage}
        onLastPage={mockOnLastPage}
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("<")).toBeDisabled();
    expect(screen.getByText(">")).toBeDisabled();
  });

  test("calls onPrevious when Previous button is clicked", () => {
    render(
      <ListControls
        previousURL="previous-url"
        nextURL="next-url"
        isLoading={false}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        onFirstPage={mockOnFirstPage}
        onLastPage={mockOnLastPage}
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText("<"));
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
        onFirstPage={mockOnFirstPage}
        onLastPage={mockOnLastPage}
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText(">"));
    expect(mockOnNext).toHaveBeenCalled();
  });

  test("calls onFirstPage when First button is clicked", () => {
    render(
      <ListControls
        previousURL="previous-url"
        nextURL="next-url"
        isLoading={false}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        onFirstPage={mockOnFirstPage}
        onLastPage={mockOnLastPage}
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText("First"));
    expect(mockOnFirstPage).toHaveBeenCalled();
  });

  test("calls onLastPage when Last button is clicked", () => {
    render(
      <ListControls
        previousURL="previous-url"
        nextURL="next-url"
        isLoading={false}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        onFirstPage={mockOnFirstPage}
        onLastPage={mockOnLastPage}
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText("Last"));
    expect(mockOnLastPage).toHaveBeenCalled();
  });

  test("calls onPageChange with correct page number when a page number is clicked", () => {
    render(
      <ListControls
        previousURL="previous-url"
        nextURL="next-url"
        isLoading={false}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        onFirstPage={mockOnFirstPage}
        onLastPage={mockOnLastPage}
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText("2"));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText("4"));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });
});
