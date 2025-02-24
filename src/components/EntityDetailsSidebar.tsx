import React from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { X, Edit, Trash2 } from "lucide-react";

interface Connection {
  id: string;
  type: string;
  connectedTo: string;
}

interface EntityDetails {
  id: string;
  name: string;
  type: "person" | "event" | "place";
  description: string;
  connections: Connection[];
}

interface EntityDetailsSidebarProps {
  entity?: EntityDetails;
  onClose?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const defaultEntity: EntityDetails = {
  id: "1",
  name: "Winston Churchill",
  type: "person",
  description:
    "British statesman who served as Prime Minister of the United Kingdom during World War II.",
  connections: [
    { id: "1", type: "participated in", connectedTo: "World War II" },
    { id: "2", type: "visited", connectedTo: "London" },
    { id: "3", type: "met with", connectedTo: "Franklin D. Roosevelt" },
  ],
};

const EntityDetailsSidebar = ({
  entity = defaultEntity,
  onClose = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: EntityDetailsSidebarProps) => {
  const typeColors = {
    person: "bg-blue-100 text-blue-800",
    event: "bg-red-100 text-red-800",
    place: "bg-green-100 text-green-800",
  };

  return (
    <Card className="w-[400px] h-full bg-background border-l">
      <div className="p-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{entity.name}</h2>
          <Badge className={typeColors[entity.type]}>
            {entity.type.charAt(0).toUpperCase() + entity.type.slice(1)}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(entity.id)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(entity.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">
              {entity.description}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-2">Connections</h3>
            <div className="space-y-2">
              {entity.connections.map((connection) => (
                <div
                  key={connection.id}
                  className="p-2 rounded-lg border bg-muted/50"
                >
                  <p className="text-sm">
                    <span className="text-muted-foreground">
                      {connection.type}
                    </span>{" "}
                    <span className="font-medium">
                      {connection.connectedTo}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};

export default EntityDetailsSidebar;
