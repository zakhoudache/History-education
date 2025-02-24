// src/components/GraphDisplay.tsx (update)
import { useCallback, useRef, useEffect } from "react";
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
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import BaseNode from "./nodes/BaseNode";
import { useGraph } from "@/context/GraphContext";
import { EdgeType } from "@/lib/types";
import { useResizeObserver } from "@/hooks/useResizeObserver";

const nodeTypes = {
  custom: BaseNode,
};

const getEdgeStyle = (type: EdgeType) => {
  const styles = {
    causes: { stroke: "#ef4444", strokeWidth: 2 },
    influences: { stroke: "#a855f7", strokeWidth: 2 },
    participates: { stroke: "#3b82f6", strokeWidth: 2 },
    located: { stroke: "#22c55e", strokeWidth: 2 },
  };
  return styles[type] || { stroke: "#64748b", strokeWidth: 2 };
};

const GraphDisplay = () => {
  const {
    nodes,
    edges,
    selectNode,
    selectEdge,
    addEdge: addNewEdge,
    setContainerDimensions,
  } = useGraph();

  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(containerRef);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  // Update container dimensions whenever they change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      setContainerDimensions(dimensions);
    }
  }, [dimensions, setContainerDimensions]);

  // Convert our data model to ReactFlow's expected format
  const flowNodes = nodes.map((node) => ({
    id: node.id,
    type: "custom",
    position: node.position || {
      x: Math.random() * 500,
      y: Math.random() * 300,
    }, // You'll need to store positions
    data: node,
  }));

  const flowEdges = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    animated: true,
    style: getEdgeStyle(edge.type),
    data: { type: edge.type },
  }));

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(flowNodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(flowEdges);

  // Update the nodes state when our data model changes
  useEffect(() => {
    setRfNodes(
      nodes.map((node) => ({
        id: node.id,
        type: "custom",
        position: node.position || {
          x: Math.random() * 500,
          y: Math.random() * 300,
        },
        data: node,
      })),
    );
  }, [nodes, setRfNodes]);

  // Update the edges state when our data model changes
  useEffect(() => {
    setRfEdges(
      edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label,
        animated: true,
        style: getEdgeStyle(edge.type),
        data: { type: edge.type },
      })),
    );
  }, [edges, setRfEdges]);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      selectNode(node.data);
    },
    [selectNode],
  );

  const handleEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      selectEdge({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label as string,
        type: edge.data?.type || "influences",
      });
    },
    [selectEdge],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      // Add to our data model
      addNewEdge({
        source: params.source!,
        target: params.target!,
        label: "New Connection",
        type: "influences",
      });

      // Also update the flow visualization
      setRfEdges((eds) =>
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
    [addNewEdge, setRfEdges],
  );

  const onLoad = useCallback((_reactFlowInstance: ReactFlowInstance) => {
    reactFlowInstance.current = _reactFlowInstance;
    console.log("flow loaded:", _reactFlowInstance);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-background border-x">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        attributionPosition="bottom-right"
        onLoad={onLoad}
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
