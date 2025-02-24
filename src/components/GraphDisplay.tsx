import { useCallback } from "react";
import ReactFlow, { Background, Controls, MiniMap, Node, Edge, Connection, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import BaseNode from "./nodes/BaseNode";
import { NodeData, EdgeData } from "./GraphControls";

const nodeTypes = { custom: BaseNode };

const getEdgeStyle = (type: EdgeData["type"]) => {
  const styles = {
    causes: { stroke: "#ef4444", strokeWidth: 2 },
    influences: { stroke: "#a855f7", strokeWidth: 2 },
    participates: { stroke: "#3b82f6", strokeWidth: 2 },
    located: { stroke: "#22c55e", strokeWidth: 2 },
  };
  return styles[type] || { stroke: "#64748b", strokeWidth: 2 };
};

interface GraphDisplayProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (nodes: Node[]) => void;
  onEdgesChange: (edges: Edge[]) => void;
  onNodeSelect?: (node: NodeData) => void;
  onEdgeSelect?: (edge: EdgeData) => void;
}

const GraphDisplay = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onNodeSelect = () => {},
  onEdgeSelect = () => {},
}: GraphDisplayProps) => {
  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      onNodeSelect(node.data as NodeData);
    },
    [onNodeSelect],
  );

  const handleEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      onEdgeSelect({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label as string,
        type: edge.data?.type || "influences",
      });
    },
    [onEdgeSelect],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      onEdgesChange(
        addEdge(
          {
            ...params,
            animated: true,
            style: getEdgeStyle("influences"),
            data: { type: "influences" },
          },
          edges,
        ),
      );
    },
    [edges, onEdgesChange],
  );

  return (
    <div className="w-full h-full bg-background border-x">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode="loose"
        fitView
        attributionPosition="bottom-right"
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            const colors = {
              person: "#3b82f6",
              event: "#ef4444",
              place: "#22c55e",
              concept: "#a855f7",
            };
            return colors[(node as any).data?.type] || "#64748b";
          }}
          nodeStrokeWidth={3}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
};

export default GraphDisplay;
