import { useMemo, useState } from "react";
import PeopleList from "./components/PeopleList/PeopleList";
import "./App.css";
import { useFetchPeople } from "./hooks/useFetchPeople";
import { useFetchDetails } from "./hooks/useFetchDetails";
import { createNodesAndEdges } from "./utils/createNodesAndEdges";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";
import Graph from "./components/Graph/Graph";
import ListControls from "./components/ListControls/ListControls";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const { people, isLoading, isError, previousURL, nextURL, fetchPeopleData } =
    useFetchPeople();
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);

  const { person, films, starships, isDetailsLoading } = useFetchDetails(
    selectedPersonId,
    people
  );

  const { nodes, edges } = useMemo(
    () => createNodesAndEdges(person, films, starships),
    [person, films, starships]
  );

  const closeModal = () => {
    setSelectedPersonId(null);
  };

  const handlePagination = (url: string | null) => {
    if (url) fetchPeopleData(url);
  };

  const handlePersonSelect = (id: number) => {
    setSelectedPersonId(id);
  };

  return (
    <div className="wrapper">
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && (
        <>
          <PeopleList
            people={people}
            setSelectedPersonId={handlePersonSelect}
          />
          <Modal isModalOpen={Boolean(selectedPersonId)} onClose={closeModal}>
            <Graph
              nodes={nodes}
              edges={edges}
              isDetailsLoading={isDetailsLoading}
            />
          </Modal>
          <footer className="footer">
            <ListControls
              previousURL={previousURL}
              nextURL={nextURL}
              isLoading={isLoading}
              onPrevious={() => handlePagination(previousURL)}
              onNext={() => handlePagination(nextURL)}
            />
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
