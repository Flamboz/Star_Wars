import "./ErrorMessage.css";

const ErrorMessage: React.FC = () => {
  return (
    <div className="error-message">
      <h2 className="error-title">Oops!</h2>
      <p className="error-text">Something went wrong. Try again later</p>
      <button className="error-button" onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  );
};

export default ErrorMessage;
