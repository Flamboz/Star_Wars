import { Handle, Position } from "@xyflow/react";
import "./CustomNode.css";
import { NodeData } from "../../../types";

interface CustomNodeProps {
  data: NodeData;
}

// CustomNode component: Represents a custom node in the React Flow graph, displaying character details along with an image. 
// It includes input and output handles for connections to other nodes.
const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <div className="node">
      {data.imageUrl && (
        <img src={data.imageUrl} alt={String(data.info?.[0].value)} />
      )}
      <div className="node__label">
        {data.info?.map((info, index) => (
          <div className="info-row" key={index}>
            <strong>{info.label}:</strong> {info.value}
          </div>
        ))}
        <Handle
          type="target"
          position={Position.Top}
          id={`target-${data.id}`}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id={`source-${data.id}`}
        />
      </div>
    </div>
  );
};

export default CustomNode;
