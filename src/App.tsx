import { useState } from "react";
import PeopleList from "./components/PeopleList/PeopleList";
import "./App.css";
import { useFetchPeople } from "./hooks/useFetchPeople";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";
import Graph from "./components/Graph/Graph";
import ListControls from "./components/ListControls/ListControls";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

// Main application component that fetches and displays Star Wars characters,supports pagination, and shows details in a modal when a character is selected.
function App() {
  const { people, isLoading, isError, previousURL, nextURL, fetchPeopleData } =
    useFetchPeople();
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);

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
            <Graph selectedPersonId={selectedPersonId} people={people} />
          </Modal>
          <ListControls
            previousURL={previousURL}
            nextURL={nextURL}
            isLoading={isLoading}
            onPrevious={() => handlePagination(previousURL)}
            onNext={() => handlePagination(nextURL)}
          />
        </>
      )}
    </div>
  );
}

export default App;
