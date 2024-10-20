import { useState } from "react";
import List from "./components/List";
import "./App.css";
import GraphModal from "./components/GraphModal";
import { useFetchPeople } from "./hooks/useFetchPeople";
import { useFetchDetails } from "./hooks/useFetchDetails";
import { createNodesAndEdges } from "./utils/createNodesAndEdges";

function App() {
  const { people, isLoading, isError, previousURL, nextURL, fetchPeopleData } =
    useFetchPeople("https://sw-api.starnavi.io/people/");
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { person, films, starships } = useFetchDetails(
    selectedPersonId,
    people
  );
  const { nodes, edges } = createNodesAndEdges(person, films, starships);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPersonId(null);
  };

  const handlePagination = (url: string | null) => {
    if (url) fetchPeopleData(url);
  };

  return (
    <div className="wrapper">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Oops, something went wrong. Try again later</div>}
      {!isLoading && !isError && (
        <List
          people={people}
          setSelectedPersonId={(id) => {
            setSelectedPersonId(id);
            setIsModalOpen(true);
          }}
        />
      )}
      <GraphModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        nodes={nodes}
        edges={edges}
      />
      <footer className="footer">
        <button
          className="footer__button"
          onClick={() => handlePagination(previousURL)}
          disabled={!previousURL || isLoading}
        >
          Previous
        </button>
        <button
          className="footer__button"
          onClick={() => handlePagination(nextURL)}
          disabled={!nextURL || isLoading}
        >
          Next
        </button>
      </footer>
    </div>
  );
}

export default App;
