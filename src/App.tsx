import { useMemo, useState } from "react";
import List from "./components/List";
import "./App.css";
import GraphModal from "./components/GraphModal";
import { useFetchPeople } from "./hooks/useFetchPeople";
import { useFetchDetails } from "./hooks/useFetchDetails";
import { createNodesAndEdges } from "./utils/createNodesAndEdges";
import Loader from "./components/Loader";

function App() {
  const { people, isLoading, isError, previousURL, nextURL, fetchPeopleData } =
    useFetchPeople();
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { person, films, starships, isDetailsLoading } = useFetchDetails(
    selectedPersonId,
    people
  );

  const { nodes, edges } = useMemo(
    () => createNodesAndEdges(person, films, starships),
    [person, films, starships]
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPersonId(null);
  };

  const handlePagination = (url: string | null) => {
    if (url) fetchPeopleData(url);
  };

  const handlePersonSelect = (id: number) => {
    setSelectedPersonId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="wrapper">
      {isLoading && <Loader />}
      {isError && <div>Oops, something went wrong. Try again later</div>}
      {!isLoading && !isError && (
        <List people={people} setSelectedPersonId={handlePersonSelect} />
      )}
      <GraphModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        nodes={nodes}
        edges={edges}
        isDetailsLoading={isDetailsLoading}
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
