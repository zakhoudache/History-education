// /context/GraphContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
import { Node, Edge, Connection, Position } from "reactflow";

export enum EdgeType {
  CAUSES = "causes",
  INFLUENCES = "influences",
  PARTICIPATES = "participates",
  LOCATED = "located",
  DEFAULT = "influences",
}

export type Entity = {
  id: string;
  text: string;
  type: "person" | "place" | "event" | "organization" | "concept";
  context?: string;
};

export type NodeData = {
  label: string;
  type: Entity["type"];
  description?: string;
  position: { x: number; y: number };
};

export type EdgeData = {
  source: string;
  target: string;
  type: string;
  label?: string;
};

interface GraphContextProps {
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
  entities: Entity[];
  selectedNode: Node<NodeData> | null;
  selectedEdge: Edge<EdgeData> | null;
  containerDimensions: { width: number; height: number };
  defaultEdgeType: string;
  setContainerDimensions: (dimensions: {
    width: number;
    height: number;
  }) => void;
  setNodes: (nodes: Node<NodeData>[]) => void;
  setEdges: (edges: Edge<EdgeData>[]) => void;
  setEntities: (entities: Entity[]) => void;
  addNode: (node: Omit<NodeData, "position">) => void;
  updateNode: (id: string, data: Partial<NodeData>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: Omit<EdgeData, "id">) => void;
  updateEdge: (id: string, data: Partial<EdgeData>) => void;
  removeEdge: (id: string) => void;
  selectNode: (node: Node<NodeData> | null) => void;
  selectEdge: (edge: Edge<EdgeData> | null) => void;
  setDefaultEdgeType: (type: string) => void;
  analyzeText: (text: string) => Promise<Entity[]>;
  convertEntitiesToNodes: (entities: Entity[]) => void;
}

const GraphContext = createContext<GraphContextProps | undefined>(undefined);

export function GraphProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<Node<NodeData>[]>([]);
  const [edges, setEdges] = useState<Edge<EdgeData>[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge<EdgeData> | null>(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [defaultEdgeType, setDefaultEdgeType] = useState("influences");
  const supabaseUrl = "https://uimmjzuqdqxfqoikcexf.supabase.co";
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpbW1qenVxZHF4ZnFvaWtjZXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNDA1NTcsImV4cCI6MjA1NTYxNjU1N30.gSdv5Q0seyNiWhjEwXCzKzxYN1TUTFGxOpKUZtF06J0";

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const arrangeNodes = useCallback((entities: Entity[]) => {
    const SPACING = 200;
    const COLS = 3;
    return entities.map((entity, index) => ({
      id: entity.id,
      position: {
        x: (index % COLS) * SPACING + Math.random() * 50,
        y: Math.floor(index / COLS) * SPACING,
      },
      data: {
        label: entity.text,
        type: entity.type,
        description: entity.context,
      },
    }));
  }, []);

  const convertEntitiesToNodes = useCallback(
    (entities: Entity[]) => {
      const newNodes = arrangeNodes(entities);
      setNodes((prevNodes) => [...prevNodes, ...newNodes]);
      setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
    },
    [arrangeNodes],
  );

  const analyzeText = useCallback(
    async (text: string) => {
      try {
        const { data, error } = await supabase.functions.invoke(
          "analyze-text",
          {
            body: { text },
          },
        );

        if (error) throw new Error(error.message);

        const newEntities = data.entities || [];
        setEntities(newEntities);
        return newEntities;
      } catch (error) {
        console.error("Analysis error:", error);
        throw error;
      }
    },
    [supabase],
  );

  const addNode = useCallback(
    (node: Omit<NodeData, "position">) => {
      const newNode: Node<NodeData> = {
        id: uuidv4(),
        position: {
          x: Math.random() * containerDimensions.width,
          y: Math.random() * containerDimensions.height,
        },
        data: node,
      };
      setNodes((prev) => [...prev, newNode]);
    },
    [containerDimensions],
  );

  const updateNode = useCallback((id: string, data: Partial<NodeData>) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node,
      ),
    );
  }, []);

  const removeNode = useCallback((id: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
    setEdges((prev) =>
      prev.filter((edge) => edge.source !== id && edge.target !== id),
    );
  }, []);

  const addEdge = useCallback(
    (edge: Omit<EdgeData, "id">) => {
      const newEdge: Edge<EdgeData> = {
        id: uuidv4(),
        ...edge,
        type: edge.type || defaultEdgeType,
      };
      setEdges((prev) => [...prev, newEdge]);
    },
    [defaultEdgeType],
  );

  const updateEdge = useCallback((id: string, data: Partial<EdgeData>) => {
    setEdges((prev) =>
      prev.map((edge) => (edge.id === id ? { ...edge, ...data } : edge)),
    );
  }, []);

  const removeEdge = useCallback((id: string) => {
    setEdges((prev) => prev.filter((edge) => edge.id !== id));
  }, []);

  const selectNode = useCallback((node: Node<NodeData> | null) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const selectEdge = useCallback((edge: Edge<EdgeData> | null) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (nodes.length > 0) {
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 100);
      }
    };
    handleResize();
  }, [nodes]);

  return (
    <GraphContext.Provider
      value={{
        nodes,
        edges,
        entities,
        selectedNode,
        selectedEdge,
        containerDimensions,
        defaultEdgeType,
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
        setDefaultEdgeType,
        analyzeText,
        convertEntitiesToNodes,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
}

export function useGraph() {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error("useGraph must be used within a GraphProvider");
  }
  return context;
}
