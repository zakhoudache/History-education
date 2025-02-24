import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Connection,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import BaseNode from "./nodes/BaseNode";
import { NodeData, EdgeData } from "./GraphControls";

const nodeTypes = {
  custom: BaseNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 100, y: 100 },
    data: {
      label: "Napoleon Bonaparte",
      type: "person",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=napoleon",
      subtitle: "1769-1821",
      description:
        "French military commander and political leader who rose to prominence during the French Revolution",
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 300, y: 200 },
    data: {
      label: "Battle of Waterloo",
      type: "event",
      subtitle: "June 18, 1815",
      description:
        "Decisive battle that marked the final defeat of Napoleon Bonaparte",
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 500, y: 300 },
    data: {
      label: "Paris",
      type: "place",
      imageUrl:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80",
      description: "Capital city of France and a major historical center",
    },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 400, y: 100 },
    data: {
      label: "French Revolution",
      type: "concept",
      subtitle: "1789-1799",
      description:
        "Period of radical social and political upheaval in French history",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "led army at",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2 },
    data: { type: "participates" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    label: "occurred near",
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2 },
    data: { type: "located" },
  },
  {
    id: "e1-4",
    source: "1",
    target: "4",
    label: "influenced by",
    animated: true,
    style: { stroke: "#a855f7", strokeWidth: 2 },
    data: { type: "influences" },
  },
];

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
  onNodeSelect?: (node: NodeData) => void;
  onEdgeSelect?: (edge: EdgeData) => void;
}

const GraphDisplay = ({
  onNodeSelect = () => {},
  onEdgeSelect = () => {},
}: GraphDisplayProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: getEdgeStyle("influences"),
            data: { type: "influences" },
          },
          eds,
        ),
      );
    },
    [setEdges],
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
        connectionMode={ConnectionMode.Loose}
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
