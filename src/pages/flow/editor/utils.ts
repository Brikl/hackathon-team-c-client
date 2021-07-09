import {
  Comparator,
  Condition,
  ConditionOption,
  Conjunction,
  ConjunctionOption,
  Operators,
  OperatorType,
} from "./Conditions";

export const isConjunction = (typeName?: OperatorType) =>
  typeName === "Conjunction";

export const isComparator = (type: Operators): type is Comparator => {
  switch (type) {
    case "EQ":
    case "GT":
    case "LT":
      return true;
    default:
      return false;
  }
};

export const getConjunctionOption = (type?: Conjunction): ConjunctionOption => {
  switch (type) {
    case "AND":
      return "And";
    case "OR":
      return "Or";
    default:
      return "";
  }
};

export const getConditionOption = (type: Operators): ConditionOption => {
  switch (type) {
    case "GT":
      return "greater than";
    case "LT":
      return "lower than";
    case "EQ":
      return "equal";
    case "T":
      return "true";
    case "F":
      return "false";
    default:
      return "";
  }
};

export const getConjunction = (type: ConjunctionOption): Conjunction => {
  switch (type) {
    case "And":
      return "AND";
    case "Or":
      return "OR";
    default:
      return "";
  }
};

export const getCondition = (type: ConditionOption): Condition => {
  switch (type) {
    case "greater than":
      return "GT";
    case "lower than":
      return "LT";
    case "equal":
      return "EQ";
    case "true":
      return "T";
    case "false":
      return "F";
    default:
      return "";
  }
};

