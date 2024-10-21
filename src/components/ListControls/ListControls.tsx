import "./ListControls.css";

interface ListControlsProps {
  previousURL: string | null;
  nextURL: string | null;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

// ListControls component: Provides navigation controls for paginated lists,allowing users to navigate to the previous or next set of items. 
// Buttons are disabled when there is no available URL for navigation or while loading.
const ListControls: React.FC<ListControlsProps> = ({
  previousURL,
  nextURL,
  isLoading,
  onPrevious,
  onNext,
}) => {
  return (
    <footer className="footer">
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
    </footer>
  );
};

export default ListControls;
