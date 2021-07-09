import { Box, Stack, Text } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

interface IFlowBlock {
  onDragStart?: React.DragEventHandler<HTMLDivElement> | undefined;
}
const FlowBlock = (props: PropsWithChildren<IFlowBlock>) => (
  <Box
    p="8"
    border="1px solid"
    boxShadow="0 0 0 0.5px"
    onDragStart={props.onDragStart}
    draggable
  >
    <Text m="0" textAlign="center">
      {props.children}
    </Text>
  </Box>
);

export const FlowBlocks = () => {
  //@ts-ignore
  const onDragStart = (event, nodeType) => {
    console.debug({ event, nodeType });
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Stack spacing="20" w="100%" h="100%">
      <Text m="0" fontWeight="bold" textAlign="center">
        You can drag these nodes to the pane on the right.
      </Text>
      <FlowBlock onDragStart={(event) => onDragStart(event, "input")}>
        START
      </FlowBlock>
      <FlowBlock onDragStart={(event) => onDragStart(event, "Default")}>
        IF
      </FlowBlock>
      <FlowBlock onDragStart={(event) => onDragStart(event, "Output")}>
        THEN
      </FlowBlock>
    </Stack>
  );
};
