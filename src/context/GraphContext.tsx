// src/context/GraphContext.tsx

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { NodeData, EdgeData, Entity } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js"; // Import Supabase client

export const enum EdgeType {
  CAUSES = "causes",
  INFLUENCES = "influences",
  PARTICIPATES = "participates",
  LOCATED = "located",
  DEFAULT = "influences",
}

interface GraphContextProps {
  nodes: NodeData[];
  edges: EdgeData[];
  entities: Entity[];
  selectedNode: NodeData | null;
  selectedEdge: EdgeData | null;
  containerDimensions: { width: number; height: number };
  setContainerDimensions: (dimensions: {
    width: number;
    height: number;
  }) => void;
  setNodes: (nodes: NodeData[]) => void;
  setEdges: (edges: EdgeData[]) => void;
  setEntities: (entities: Entity[]) => void;
  addNode: (node: Omit<NodeData, "id" | "position">) => void;
  updateNode: (id: string, data: Partial<NodeData>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: Omit<EdgeData, "id">) => void;
  updateEdge: (id: string, data: Partial<EdgeData>) => void;
  removeEdge: (id: string) => void;
  selectNode: (node: NodeData | null) => void;
  selectEdge: (edge: EdgeData | null) => void;
  defaultEdgeType: EdgeType;
  setDefaultEdgeType: (type: EdgeType) => void;
  analyzeText: (text: string) => Promise<Entity[]>; // Changed to Promise
  convertEntitiesToNodes: (entities: Entity[]) => void;
}

const GraphContext = createContext<GraphContextProps | undefined>(undefined);

export function GraphProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [edges, setEdges] = useState<EdgeData[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<EdgeData | null>(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [defaultEdgeType, setDefaultEdgeType] = useState<EdgeType>(
    EdgeType.DEFAULT,
  );

  // Initialize Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const addNode = useCallback((node: Omit<NodeData, "id" | "position">) => {
    const newNode: NodeData = {
      ...node,
      id: uuidv4(),
      position: { x: Math.random() * 500, y: Math.random() * 300 },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  }, []);

  const updateNode = useCallback((id: string, data: Partial<NodeData>) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => (node.id === id ? { ...node, ...data } : node)),
    );
  }, []);

  const removeNode = useCallback((id: string) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
    setEdges((prevEdges) =>
      prevEdges.filter((edge) => edge.source !== id && edge.target !== id),
    );
  }, []);

  const addEdge = useCallback((edge: Omit<EdgeData, "id">) => {
    const newEdge: EdgeData = {
      ...edge,
      id: uuidv4(),
    };
    setEdges((prevEdges) => [...prevEdges, newEdge]);
  }, []);

  const updateEdge = useCallback((id: string, data: Partial<EdgeData>) => {
    setEdges((prevEdges) =>
      prevEdges.map((edge) => (edge.id === id ? { ...edge, ...data } : edge)),
    );
  }, []);

  const removeEdge = useCallback((id: string) => {
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id));
  }, []);

  const selectNode = useCallback((node: NodeData | null) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const selectEdge = useCallback((edge: EdgeData | null) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  const analyzeText = useCallback(
    async (text: string): Promise<Entity[]> => {
      try {
        const { data, error } = await supabase.functions.invoke(
          "analyze-text",
          {
            body: { text },
          },
        );

        if (error) {
          console.error("Supabase function error:", error);
          throw new Error(`Failed to analyze text: ${error.message}`);
        }

        // Type assertion to match the expected Entity[] type
        return (data as { entities: Entity[] }).entities || []; // Ensure it returns an array
      } catch (err) {
        console.error("Error calling Supabase function:", err);
        return []; // Return an empty array in case of an error
      }
    },
    [supabase],
  );

  const convertEntitiesToNodes = useCallback(
    (entities: Entity[]) => {
      // Logic to convert entities to nodes in the graph
      entities.forEach((entity) => {
        addNode({
          label: entity.text,
          type: entity.type,
          // Add any other necessary properties
        });
      });
    },
    [addNode],
  );

  const value = {
    nodes,
    edges,
    entities,
    selectedNode,
    selectedEdge,
    containerDimensions,
    setContainerDimensions,
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
    defaultEdgeType,
    setDefaultEdgeType,
    analyzeText,
    convertEntitiesToNodes,
  };

  return (
    <GraphContext.Provider value={value}>{children}</GraphContext.Provider>
  );
}

export function useGraph() {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error("useGraph must be used within a GraphProvider");
  }
  return context;
}
