import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./GraphModal.css";
import { Node, Edge } from "../types";

interface IGraphModal {
  isModalOpen: boolean;
  onClose: () => void;
  nodes: Node[];
  edges: Edge[];
}

const GraphModal = ({ isModalOpen, onClose, nodes, edges }: IGraphModal) => {
  const closeModal = () => onClose();

  return (
    <>
      {isModalOpen && (
        <div className="graph-modal">
          <div className="graph-modal__content">
            <span className="graph-modal__close" onClick={closeModal}>
              &times;
            </span>
            <div className="graph-modal__graph">
              <ReactFlow nodes={nodes} edges={edges} fitView>
                <Controls />
                <Background />
              </ReactFlow>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GraphModal;
