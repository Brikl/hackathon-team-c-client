import { Box } from "@chakra-ui/react";
import React, { useState, useRef, memo } from "react";
import ReactFlow, {
  addEdge,
  removeElements,
  Controls,
  ReactFlowProps,
} from "react-flow-renderer";
import { v4 } from "uuid";
import { getNameByType, getStylingByType } from "./utils";

export type ElementTypeInput = "input" | "Default" | "Output";
// type ElementTypeOutput = "TRIGGER" | "CONDITION" | "ACTION";
export type NodeType = "TRIGGER" | "CONDITION" | "ACTION";

interface NodeData {
  label: string;
  nodeType?: NodeType;
  [key: string]: any;
}

interface Position {
  x: number;
  y: number;
}

export interface NodeElement {
  id: string;
  type: ElementTypeInput;
  data: NodeData;
  position: Position;
}

export type Elements = ReactFlowProps['elements']

interface IProps {
  elements: Elements;
  setElements: (e: Elements) => void;
  setNodeId: (nodeId: string) => void;
}

const FlowBuilder = ({ elements, setElements, setNodeId }: IProps) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  //@ts-ignorez
  const onConnect = (params) => {
    debugger;
    //@ts-ignore
    return setElements((els) => addEdge(params, els));
  };
  //@ts-ignore
  const onElementsRemove = (elementsToRemove) =>
    //@ts-ignore
    setElements((els) => removeElements(elementsToRemove, els));
  //@ts-ignore
  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);
  //@ts-ignore
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  //@ts-ignore
  const onDrop = (event) => {
    event.preventDefault();
    //@ts-ignore
    const reactFlowBounds = reactFlowWrapper?.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    //@ts-ignore
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: v4(),
      type,
      position,
      data: { label: getNameByType(type) },
      style: getStylingByType(type),
    };

    setElements([...elements, newNode]);
  };

  return (
    <Box ref={reactFlowWrapper} h="100%" w="100%">
      <ReactFlow
        elements={elements}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        onLoad={onLoad}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={(e) => {
          //@ts-ignore
          setNodeId(e.target.dataset.id);
        }}
      >
        <Controls />
      </ReactFlow>
    </Box>
  );
};

export default memo(FlowBuilder);
