// src/components/GraphDisplay.tsx
import { useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  addEdge,
  ReactFlowInstance,
  ConnectionMode,
} from "reactflow";
import "reactflow/dist/style.css";
import BaseNode from "./nodes/BaseNode";
import { useGraph } from "@/context/GraphContext";

const nodeTypes = {
  custom: BaseNode,
};

const getEdgeStyle = (type: string) => {
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
    containerDimensions,
  } = useGraph();

  const containerRef = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  // Custom resize observer hook (simplified version; replace with your own if different)
  const useResizeObserver = (ref: React.RefObject<HTMLDivElement>) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    useEffect(() => {
      const observer = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      });
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [ref]);
    return dimensions;
  };

  const dimensions = useResizeObserver(containerRef);

  // Update container dimensions in context
  useEffect(() => {
    if (
      dimensions.width > 0 &&
      dimensions.height > 0 &&
      (dimensions.width !== containerDimensions.width || dimensions.height !== containerDimensions.height)
    ) {
      setContainerDimensions({ width: dimensions.width, height: dimensions.height });
      if (reactFlowInstance.current) {
        reactFlowInstance.current.fitView();
      }
    }
  }, [dimensions, setContainerDimensions, containerDimensions]);

  // Map context nodes to ReactFlow nodes
  const flowNodes: Node[] = nodes.map((node) => ({
    id: node.id,
    type: "custom",
    position: node.position || { x: Math.random() * 500, y: Math.random() * 300 },
    data: node,
  }));

  // Map context edges to ReactFlow edges
  const flowEdges: Edge[] = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    animated: true,
    style: getEdgeStyle(edge.type),
    data: { type: edge.type },
  }));

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
      addNewEdge({
        source: params.source!,
        target: params.target!,
        label: "New Connection",
        type: "influences",
      });
    },
    [addNewEdge],
  );

  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
    instance.fitView();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-background border-x">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        onInit={onInit}
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
