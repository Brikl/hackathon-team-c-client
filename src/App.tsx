import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import FlowBuilder, { Elements, NodeElement } from "./pages/flow/FlowBuilder";
import { ReactFlowProvider, useStoreState } from "react-flow-renderer";
import { FlowBlocks } from "./pages/flow/FlowBlocks";
import { BlockEditor } from "./pages/flow/NodeEditor";
import { useEffect } from "react";
import {gql, useMutation} from "@apollo/client";

const SaveButton = () => {
  const nodes = useStoreState((state) => state.nodes as NodeElement[]);
  const edges = useStoreState((state) => state.edges);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) return;
    let timer1 = setTimeout(() => setLoading(false), 3000);

    return () => {
      clearTimeout(timer1);
    };
  }, [isLoading]);


  return (
    <Button
      w="8rem"
      isLoading={isLoading}
      variant="outline"
      textAlign="center"
      onClick={() => {
        console.debug("Mutation With These Variable:", { nodes, edges });
        setLoading(true);
      }}
    >
      <Text fontWeight="bold">Save</Text>
    </Button>
  );
};

const TriggerEvent = ({name}: {name: string}) => {
  const [isLoading, setLoading] = useState(false);
  const [mTriggerEvent] = useMutation(gql`
    mutation publishEvent {
      publishEvent(input: {
        eventType: "TEAMSTORE",
        payload: {
          storeId:"store-3"
        }
      }){
        success
      }
    }
  `)

  useEffect(() => {
    if (!isLoading) return;
    let timer1 = setTimeout(() => setLoading(false), 3000);

    return () => {
      clearTimeout(timer1);
    };
  }, [isLoading]);
  return (
    <Button
      w="8rem"
      isLoading={isLoading}
      variant="outline"
      textAlign="center"
      onClick={async () => {
        await mTriggerEvent()
        setLoading(true);
      }}
    >
      <Text fontWeight="bold">{name || 'default'}</Text>
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
            <Flex flexDirection="column" alignContent="space-around">
              <FlowBlocks />
              <Box w="100%" textAlign="center" mb="24rem">
                <SaveButton />
              </Box>
              <Box w="100%" textAlign="center" mb="24rem">
                <TriggerEvent name="Trigger Event"/>
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
