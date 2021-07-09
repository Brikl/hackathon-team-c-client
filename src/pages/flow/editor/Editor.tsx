import React from "react";
import { ElementTypeInput } from "../FlowBuilder";
import { Actions } from "./Actions";
import { Conditions } from "./Conditions";
import { Trigger } from "./Trigger";

export const EditorMap: Record<ElementTypeInput, React.ElementType> = {
  input: Trigger,
  Default: Conditions,
  Output: Actions,
};

export const getEditorByType = (type: ElementTypeInput) => EditorMap[type];
