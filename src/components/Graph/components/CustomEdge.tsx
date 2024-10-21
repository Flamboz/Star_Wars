import { EdgeProps, getBezierPath } from "@xyflow/react";
import "./CustomEdge.css";

// CustomEdge component: Renders a custom edge (connection) between nodes in the React Flow graph.
// It utilizes Bezier path calculations to create a smooth curve connecting the source and target nodes.
const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  markerEnd,
}) => {
  const [path] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  return (
    <g>
      <path id={id} style={style} d={path} className="edge" />
      {markerEnd && <marker id={markerEnd} />}
    </g>
  );
};

export default CustomEdge;
