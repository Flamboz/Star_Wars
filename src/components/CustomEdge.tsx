import { EdgeProps, getBezierPath } from "@xyflow/react";
import "./CustomEdge.css";

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  markerEnd,
}: EdgeProps) => {
  const [path] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  return (
    <g>
      <path id={id} style={style} d={path} className="edge" />
      {markerEnd && <marker id={markerEnd} />}
    </g>
  );
};

export default CustomEdge;
