import "./Loader.css";

// Loader component: Displays a loading spinner to indicate that data is being fetched or processed.
const Loader: React.FC = () => {
  return (
    <div className="loader" data-testid="data-loader">
      <div className="loader__spinner"></div>
    </div>
  );
};

export default Loader;
