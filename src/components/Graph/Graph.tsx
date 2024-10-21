import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./Graph.css";
import { Person } from "../../types";
import CustomNode from "../Graph/components/CustomNode";
import CustomEdge from "../Graph/components/CustomEdge";
import Loader from "../Loader/Loader";
import { useFetchDetails } from "../../hooks/useFetchDetails";
import { useMemo } from "react";
import { createNodesAndEdges } from "../../utils/createNodesAndEdges";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface GraphProps {
  selectedPersonId: number | null;
  people: Person[];
}

// Graph component: Renders a visual representation of relationships between Star Wars characters and their corresponsing films and starships.
// It fetches details based on the selected person(=character) and displays a loading indicator or an error message as needed.
// Once data is available, it uses React Flow to display custom nodes and edges
const Graph: React.FC<GraphProps> = ({ selectedPersonId, people }) => {
  const { person, films, starships, isDetailsLoading, isDetailsError } =
    useFetchDetails(selectedPersonId, people);

  const { nodes, edges } = useMemo(
    () => createNodesAndEdges(person, films, starships),
    [person, films, starships]
  );

  return (
    <>
      {isDetailsLoading && <Loader />}
      {isDetailsError && <ErrorMessage />}
      {!isDetailsLoading && !isDetailsError && (
        <div className="graph">
          <ReactFlow
            nodeTypes={{ custom: CustomNode }}
            edgeTypes={{ custom: CustomEdge }}
            nodes={nodes}
            edges={edges}
            fitView
            minZoom={0.1}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      )}
    </>
  );
};

export default Graph;
