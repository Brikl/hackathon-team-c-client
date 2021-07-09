import React, { memo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Elements, NodeElement, NodeType } from "./FlowBuilder";
import { useStoreState } from "react-flow-renderer";
import { getEditorByType } from "./editor/Editor";
import { IAction } from "./editor/Actions";
import { ICondition } from "./editor/Conditions";
import { ITrigger } from "./editor/Trigger";
import { getNodeDataKeyByType } from "./utils";

interface IBlockEditor {
  nodeId: string;
  setElements: React.Dispatch<React.SetStateAction<Elements>>;
}

export const BlockEditor = memo(({ nodeId, setElements }: IBlockEditor) => {
  const nodes = useStoreState((state) => state.nodes as NodeElement[]);
  const edges = useStoreState((state) => state.edges);
  // const updateEdges = useStoreState((action) => action.)
  const currentNode = nodes?.find((node) => node.id === nodeId);

  if (!currentNode) return <Box>Select Node to Edit</Box>;

  const nodeDataKey = getNodeDataKeyByType(currentNode.type);
  const nodeType = nodeDataKey.toUpperCase() as NodeType;
  const onUpdate = (data: IAction[] | ICondition[] | ITrigger) => {
    // updateEdges(...(edges as Connection[]))
    setElements([
      ...nodes.map((n) => {
        if (n.id !== nodeId) return n;
        return { ...n, data: { ...n.data, nodeType, [nodeDataKey]: data } };
      }),
      ...edges,
    ]);
  };

  const Editor = getEditorByType(currentNode.type);
  return (
    <Box>
      <Editor onUpdate={onUpdate} initData={currentNode.data[nodeDataKey]} />
      <Text
        fontWeight="light"
        fontSize="x-small"
        color="gray"
      >{`DEBUG: ${currentNode.data.label}-${currentNode.id} is being selected`}</Text>
    </Box>
  );
});
