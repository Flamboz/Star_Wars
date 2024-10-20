import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./Graph.css";
import { Node, Edge } from "../../types";
import CustomNode from "../Graph/components/CustomNode";
import CustomEdge from "../Graph/components/CustomEdge";
import Loader from "../Loader/Loader";

interface GraphProps {
  nodes: Node[];
  edges: Edge[];
  isDetailsLoading: boolean;
}

const Graph: React.FC<GraphProps> = ({ nodes, edges, isDetailsLoading }) => {
  return (
    <div className="graph">
      {!isDetailsLoading ? (
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
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Graph;
