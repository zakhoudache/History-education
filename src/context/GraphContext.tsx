// src/context/GraphContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { NodeData, EdgeData, Entity } from "@/lib/types";

// Initial sample data - in a real app this would come from an API
const initialNodes: NodeData[] = [
  {
    id: "1",
    type: "person",
    label: "Napoleon Bonaparte",
    subtitle: "1769-1821",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=napoleon",
    description:
      "French military commander and political leader who rose to prominence during the French Revolution",
  },
  // ... other nodes
];

const initialEdges: EdgeData[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "led army at",
    type: "participates",
  },
  // ... other edges
];

const initialEntities: Entity[] = [
  {
    id: "1",
    type: "person",
    text: "George Washington",
    startIndex: 0,
    endIndex: 17,
  },
  // ... other entities
];

interface GraphContextProps {
  nodes: NodeData[];
  edges: EdgeData[];
  entities: Entity[];
  selectedNode: NodeData | null;
  selectedEdge: EdgeData | null;
  setNodes: (nodes: NodeData[]) => void;
  setEdges: (edges: EdgeData[]) => void;
  setEntities: (entities: Entity[]) => void;
  addNode: (node: Omit<NodeData, "id">) => void;
  updateNode: (id: string, data: Partial<NodeData>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: Omit<EdgeData, "id">) => void;
  updateEdge: (id: string, data: Partial<EdgeData>) => void;
  removeEdge: (id: string) => void;
  selectNode: (node: NodeData | null) => void;
  selectEdge: (edge: EdgeData | null) => void;
}

const GraphContext = createContext<GraphContextProps | undefined>(undefined);

export function GraphProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<NodeData[]>(initialNodes);
  const [edges, setEdges] = useState<EdgeData[]>(initialEdges);
  const [entities, setEntities] = useState<Entity[]>(initialEntities);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<EdgeData | null>(null);

  const addNode = (node: Omit<NodeData, "id">) => {
    const newNode = {
      ...node,
      id: `node-${Date.now()}`,
    };
    setNodes([...nodes, newNode]);
    return newNode;
  };

  const updateNode = (id: string, data: Partial<NodeData>) => {
    setNodes(
      nodes.map((node) => (node.id === id ? { ...node, ...data } : node)),
    );
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter((node) => node.id !== id));
    // Also remove any edges connected to this node
    setEdges(edges.filter((edge) => edge.source !== id && edge.target !== id));
  };

  const addEdge = (edge: Omit<EdgeData, "id">) => {
    const newEdge = {
      ...edge,
      id: `edge-${Date.now()}`,
    };
    setEdges([...edges, newEdge]);
    return newEdge;
  };

  const updateEdge = (id: string, data: Partial<EdgeData>) => {
    setEdges(
      edges.map((edge) => (edge.id === id ? { ...edge, ...data } : edge)),
    );
  };

  const removeEdge = (id: string) => {
    setEdges(edges.filter((edge) => edge.id !== id));
  };

  const selectNode = (node: NodeData | null) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };

  const selectEdge = (edge: EdgeData | null) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  return (
    <GraphContext.Provider
      value={{
        nodes,
        edges,
        entities,
        selectedNode,
        selectedEdge,
        setNodes,
        setEdges,
        setEntities,
        addNode,
        updateNode,
        removeNode,
        addEdge,
        updateEdge,
        removeEdge,
        selectNode,
        selectEdge,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
}

export function useGraph() {
  const context = useContext(GraphContext);
  if (context === undefined) {
    throw new Error("useGraph must be used within a GraphProvider");
  }
  return context;
}
