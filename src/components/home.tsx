import { useState } from "react";
import TextAnalysisPanel from "./TextAnalysisPanel";
import GraphDisplay from "./GraphDisplay";
import EntityDetailsSidebar from "./EntityDetailsSidebar";
import GraphControls, { NodeData, EdgeData } from "./GraphControls";

function Home() {
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

  return (
    <div className="flex h-screen w-screen bg-background">
      <TextAnalysisPanel />
      <div className="flex-1 relative">
        <GraphControls
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
        />
        <GraphDisplay
          onNodeSelect={handleNodeSelect}
          onEdgeSelect={handleEdgeSelect}
        />
      </div>
      <EntityDetailsSidebar
        onClose={() => {
          setSelectedNode(null);
          setSelectedEdge(null);
        }}
      />
    </div>
  );
}

export default Home;
