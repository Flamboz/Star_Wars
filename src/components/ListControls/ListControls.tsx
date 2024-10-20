import "./ListControls.css";

interface ListControlsProps {
  previousURL: string | null;
  nextURL: string | null;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const ListControls: React.FC<ListControlsProps> = ({
  previousURL,
  nextURL,
  isLoading,
  onPrevious,
  onNext,
}) => {
  return (
    <>
      <button
        className="control"
        onClick={onPrevious}
        disabled={!previousURL || isLoading}
      >
        Previous
      </button>
      <button
        className="control"
        onClick={onNext}
        disabled={!nextURL || isLoading}
      >
        Next
      </button>
    </>
  );
};

export default ListControls;
