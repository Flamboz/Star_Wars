import "./Loader.css";

const Loader: React.FC = () => {
  return (
    <div className="loader" data-testid="data-loader">
      <div className="loader__spinner"></div>
    </div>
  );
};

export default Loader;
