import { useState } from "react";
import TextAnalysisPanel from "./TextAnalysisPanel";
import GraphDisplay from "./GraphDisplay";
import EntityDetailsSidebar from "./EntityDetailsSidebar";
import GraphControls, { NodeData, EdgeData } from "./GraphControls";
import { Node, Edge } from "reactflow";

function Home() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<EdgeData | null>(null);

  const handleNodeSelect = (node: NodeData) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };

  const handleEdgeSelect = (edge: EdgeData) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  const handleAddNode = (newNode: Omit<NodeData, "id">) => {
    const node: Node = {
      id: `${Date.now()}`,
      type: "custom",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: newNode,
    };
    setNodes((prev) => [...prev, node]);
  };

  const handleAddEdge = (newEdge: Omit<EdgeData, "id">) => {
    const edge: Edge = {
      id: `e${Date.now()}`,
      source: newEdge.source,
      target: newEdge.target,
      label: newEdge.label,
      animated: true,
      style: { strokeWidth: 2 },
      data: { type: newEdge.type },
    };
    setEdges((prev) => [...prev, edge]);
  };

  const handleDeleteNode = (id: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
    setEdges((prev) => prev.filter((edge) => edge.source !== id && edge.target !== id));
    setSelectedNode(null);
  };

  const handleDeleteEdge = (id: string) => {
    setEdges((prev) => prev.filter((edge) => edge.id !== id));
    setSelectedEdge(null);
  };

  const handleTextAnalysis = (text: string) => {
    const detectedEntities = extractEntitiesFromText(text); // Simulated NLP
    const newNodes = detectedEntities.map((entity, index) => ({
      id: `${Date.now() + index}`,
      type: "custom",
      position: { x: 100 + index * 200, y: 100 },
      data: {
        label: entity.text,
        type: entity.type,
        description: `Detected ${entity.type}`,
      },
    }));
    setNodes((prev) => [...prev, ...newNodes]);
  };

  return (
    <div className="flex h-screen w-screen bg-background">
      <TextAnalysisPanel onTextChange={handleTextAnalysis} />
      <div className="flex-1 relative">
        <GraphControls
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          onAddNode={handleAddNode}
          onAddEdge={handleAddEdge}
          onDeleteNode={handleDeleteNode}
          onDeleteEdge={handleDeleteEdge}
          nodes={nodes} // Pass nodes for dynamic edge source/target selection
        />
        <GraphDisplay
          nodes={nodes}
          edges={edges}
          onNodesChange={setNodes}
          onEdgesChange={setEdges}
          onNodeSelect={handleNodeSelect}
          onEdgeSelect={handleEdgeSelect}
        />
      </div>
      <EntityDetailsSidebar
        entity={
          selectedNode
            ? {
                id: selectedNode.id,
                name: selectedNode.label,
                type: selectedNode.type,
                description: selectedNode.description || "",
                connections: edges
                  .filter((e) => e.source === selectedNode.id || e.target === selectedNode.id)
                  .map((e) => ({
                    id: e.id,
                    type: e.label as string,
                    connectedTo:
                      e.source === selectedNode.id
                        ? nodes.find((n) => n.id === e.target)?.data.label || ""
                        : nodes.find((n) => n.id === e.source)?.data.label || "",
                  })),
              }
            : undefined
        }
        onClose={() => {
          setSelectedNode(null);
          setSelectedEdge(null);
        }}
      />
    </div>
  );
}

// Simulated entity extraction (replace with real NLP in production)
function extractEntitiesFromText(text: string) {
  const words = text.split(" ");
  return words.map((word, i) => ({
    id: `${i}`,
    type: ["person", "place", "event", "concept"][i % 4] as "person" | "place" | "event" | "concept",
    text: word,
    startIndex: i * (word.length + 1),
    endIndex: (i + 1) * word.length + i,
  }));
}

export default Home;
