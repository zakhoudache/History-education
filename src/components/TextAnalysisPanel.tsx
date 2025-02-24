import React from "react";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Tag, X } from "lucide-react";

interface Entity {
  id: string;
  type: "person" | "event" | "place";
  text: string;
  startIndex: number;
  endIndex: number;
}

interface TextAnalysisPanelProps {
  onTextChange?: (text: string) => void;
  onEntitySelect?: (entity: Entity) => void;
  entities?: Entity[];
}

const TextAnalysisPanel = ({
  onTextChange = () => {},
  onEntitySelect = () => {},
  entities = [
    {
      id: "1",
      type: "person",
      text: "George Washington",
      startIndex: 0,
      endIndex: 17,
    },
    {
      id: "2",
      type: "place",
      text: "Mount Vernon",
      startIndex: 25,
      endIndex: 37,
    },
    {
      id: "3",
      type: "event",
      text: "American Revolution",
      startIndex: 45,
      endIndex: 63,
    },
  ],
}: TextAnalysisPanelProps) => {
  const [text, setText] = React.useState(
    "George Washington lived at Mount Vernon during the American Revolution...",
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText);
  };

  const getEntityColor = (type: Entity["type"]) => {
    switch (type) {
      case "person":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "event":
        return "bg-red-100 text-red-800 border-red-300";
      case "place":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <Card className="h-full w-[400px] bg-white flex flex-col p-4 border-r">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Text Analysis</h2>
        <Button variant="outline" size="sm">
          <Tag className="h-4 w-4 mr-2" />
          Auto-Tag
        </Button>
      </div>

      <ScrollArea className="flex-grow">
        <Textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Paste your historical text here..."
          className="min-h-[200px] resize-none mb-4"
        />

        <div className="space-y-2">
          <h3 className="font-medium">Detected Entities</h3>
          {entities.map((entity) => (
            <div
              key={entity.id}
              className={`flex items-center justify-between p-2 rounded border ${getEntityColor(
                entity.type,
              )}`}
              onClick={() => onEntitySelect(entity)}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center space-x-2">
                <span className="font-medium">{entity.text}</span>
                <span className="text-sm opacity-70 capitalize">
                  ({entity.type})
                </span>
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default TextAnalysisPanel;
