import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import FlowBuilder, { Elements, NodeElement } from "./pages/flow/FlowBuilder";
import { ReactFlowProvider, useStoreState } from "react-flow-renderer";
import { FlowBlocks } from "./pages/flow/FlowBlocks";
import { BlockEditor } from "./pages/flow/NodeEditor";

const SaveButton = () => {
  const nodes = useStoreState((state) => state.nodes as NodeElement[]);
  const edges = useStoreState((state) => state.edges);

  return (
    <Button
      w="8rem"
      variant="outline"
      textAlign="center"
      onClick={() =>
        console.debug("Mutation With These Variable:", { nodes, edges })
      }
    >
      <Text fontWeight="bold">Save</Text>
    </Button>
  );
};
function App() {
  const [elements, setElements] = useState<Elements>([]);
  const [nodeId, setNodeId] = useState<string>("");

  return (
    <ReactFlowProvider>
      <Box h="100vh" w="100vw">
        <Flex w="100%" h="100%" flexDirection="row">
          <Flex flexBasis="20%" justifyContent="center" p="2rem">
            <Flex flexDirection="column" alignContent="space-between">
              <FlowBlocks />
              <Box w="100%" textAlign="center" mb="24rem">
                <SaveButton />
              </Box>
            </Flex>
          </Flex>
          <Flex flexBasis="60%" border="1px solid red">
            <FlowBuilder {...{ elements, setElements, setNodeId }} />
          </Flex>
          <Flex
            flexBasis="20%"
            justifyContent="center"
            alignItems="center"
            p="2rem"
          >
            <BlockEditor nodeId={nodeId} setElements={setElements} />
          </Flex>
        </Flex>
      </Box>
    </ReactFlowProvider>
  );
}

export default App;
