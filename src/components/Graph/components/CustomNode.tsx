import { Handle, Position } from "@xyflow/react";
import "./CustomNode.css";
import { NodeData } from "../../../types";
import { useState } from "react";

interface CustomNodeProps {
  data: NodeData;
}

// CustomNode component represents a node in the React Flow graph.
// It displays character details along with an image, providing input and output handles for connecting to other nodes.
// The component includes a loading spinner and a placeholder image to handle cases where the main image is still loading or fails to load.
const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  const placeholderImage =
    "https://placehold.co/100x200/gray/ffffff?text=No+Image";
  const [loading, setLoading] = useState(true);

  return (
    <div className="node">
      <div className={`image-container ${loading ? "loading" : ""}`}>
        <img
          src={data.imageUrl}
          alt={String(data.info?.[0].value)}
          onLoad={() => setLoading(false)}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeholderImage;
          }}
        />
        {loading && <div className="spinner">Loading...</div>}{" "}
      </div>
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
