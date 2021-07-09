import { ElementTypeInput } from "./FlowBuilder";

type ElementTypeOutput = "TRIGGER" | "CONDITION" | "ACTION";
export const transformType = (type: ElementTypeInput): ElementTypeOutput => {
  switch (type) {
    case "input":
      return "TRIGGER";
    case "Default":
      return "CONDITION";
    case "Output":
      return "ACTION";
    default:
      return type;
  }
};

export const getNameByType = (type: ElementTypeInput) => {
  switch (type) {
    case "input":
      return "START";
    case "Default":
      return "IF";
    case "Output":
      return "THEN";
    default:
      return type;
  }
};

const INIT_STYLE = {
  padding: " 10px",
  borderRadius: " 3px",
  width: " 150px",
  fontSize: " 12px",
  color: "#222",
  textAlign: " center",
  borderWidth: " 1px",
  borderStyle: " solid",
};

export const getStylingByType = (type: ElementTypeInput) => {
  switch (type) {
    case "input":
      return {
        ...INIT_STYLE,
        borderColor: "blue",
        boxShadow: "0 0 0 0.5px blue",
      };
    case "Default":
      return {
        ...INIT_STYLE,
        borderColor: "red",
        boxShadow: "0 0 0 0.5px red",
      };
    case "Output":
      return {
        ...INIT_STYLE,
        borderColor: "green",
        boxShadow: "0 0 0 0.5px green",
      };
    default:
      return {};
  }
};

export type NodeDataKey = `${Lowercase<ElementTypeOutput>}`;

export const getNodeDataKeyByType = (type: ElementTypeInput): NodeDataKey => {
  switch (type) {
    case "input":
      return "trigger";
    case "Default":
      return "condition";
    case "Output":
      return "action";
  }
};
