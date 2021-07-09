import { Box, Input, Select, Text } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { v4 } from "uuid";

export interface ITrigger {
  eventType?: string;
  id: string;
}

export interface IProps {
  initData?: ITrigger;
  onUpdate: (trigger: ITrigger) => void;
}

const EVENT_OPITONS = ["", "Teamstore", "Cart item", "Inventory item"] as const;

type EvenOption = typeof EVENT_OPITONS[number];
type EvenType = "" | "TEAMSTORE" | "CART_ITEM" | "INVENTORY_ITEM";

const getEventType = (event: EvenOption): EvenType => {
  switch (event) {
    case "Cart item":
      return "CART_ITEM";
    case "Inventory item":
      return "INVENTORY_ITEM";
    case "Teamstore":
      return "TEAMSTORE";
    default:
      return "";
  }
};

const getEventOption = (event?: EvenType): EvenOption => {
  switch (event) {
    case "INVENTORY_ITEM":
      return "Inventory item";
    case "CART_ITEM":
      return "Cart item";
    case "TEAMSTORE":
      return "Teamstore";
    default:
      return "";
  }
};

export const Trigger = ({ onUpdate, initData }: IProps) => {
  const [trigger, setTrigger] = useState<ITrigger>(initData ?? { id: v4() });
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newTriggerEvent = {
      ...trigger,
      eventType: getEventType(e.target?.value as EvenOption),
    };
    setTrigger(newTriggerEvent);
    onUpdate(newTriggerEvent);
  };
  return (
    <Box>
      <Text fontWeight="semibold">Add Trigger Even</Text>
      <Select
        value={getEventOption(trigger?.eventType as EvenType)}
        onChange={handleChange}
      >
        {EVENT_OPITONS.map((e) => (
          <option value={e}>{e}</option>
        ))}
      </Select>
    </Box>
  );
};
