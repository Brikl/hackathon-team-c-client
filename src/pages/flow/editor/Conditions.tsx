import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { Button, Input, Select } from "@chakra-ui/react";
import React, { ChangeEvent, memo, useEffect } from "react";
import { useState } from "react";
import { v4 } from "uuid";
import { equals } from "../../../shared/utils";

import {
  getConditionOption,
  getConjunctionOption,
  getCondition,
  isComparator,
  getConjunction,
} from "./utils";

export type Comparator = "GT" | "LT" | "EQ";
export type Predicate = "T" | "F";
export type Conjunction = "AND" | "OR" | "";
export type Condition = Comparator | Predicate | "";
export type Operators = Condition | Conjunction;
export type OperatorType = "Condition" | "Conjunction";

export interface ICondition {
  id: string;
  typeName?: OperatorType;
  former?: string;
  condition?: Condition;
  conjunction?: Conjunction;
  latter?: string | number;
}

const CONDITION_OPTIONS = [
  "",
  "greater than",
  "lower than",
  "equal",
  "true",
  "false",
] as const;

const CONJUNCTION_OPTIONS = ["", "And", "Or"] as const;

export type ConditionOption = typeof CONDITION_OPTIONS[number];
export type ConjunctionOption = typeof CONJUNCTION_OPTIONS[number];

export interface IConditionTypeSelector {
  id: string;
  initType: ConditionOption;
  onChange: (value: ConditionOption) => void;
}

export const ConditionTypeSelector = memo(
  ({ onChange, id, initType }: IConditionTypeSelector) => {
    const [conditionType, setConditionType] = useState(initType);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value as ConditionOption);
      setConditionType(e.target.value as ConditionOption);
    };
    return (
      <Select w="100%" value={conditionType} onChange={handleChange}>
        {CONDITION_OPTIONS.map((c) => (
          <option value={c}>{c}</option>
        ))}
      </Select>
    );
  }
);

interface IConditionInput {
  id: string;
  initValue?: string | number;
  onBlur: (value: string) => void;
}

const ConditionInput = memo(({ onBlur, initValue, id }: IConditionInput) => {
  const [value, setValue] = useState(initValue);
  return (
    <Input
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      }}
      onBlur={(e) => onBlur(e.target.value)}
    />
  );
});

interface IConditionEditor {
  initData: ICondition;
  onConditionUpdate: (condition: ICondition) => void;
}

export const ConditionEditor = memo(
  ({ initData, onConditionUpdate }: IConditionEditor) => {
    const [condition, setCondition] = useState<ICondition>(initData);
    const [former, setFormer] = useState<ICondition["former"]>(initData.former);

    useEffect(() => {
      onConditionUpdate({ ...condition });
    }, [condition]);

    const updateFormer = (former: string) => {
      setFormer(former);
      setCondition({ ...condition, former: former });
    };

    const updateType = (type: ConditionOption) => {
      const conditionType = getCondition(type);
      setCondition({
        ...condition,
        former: former,
        condition: conditionType,
        latter:
          conditionType !== "T" && conditionType !== "F"
            ? condition?.latter
            : undefined,
      });
    };

    const updateLatter = (value: string) => {
      setCondition({ ...condition, latter: value });
    };

    return (
      <Stack>
        <Flex justifyContent="space-between">
          <Text m="0">If</Text>
          <Text m="0">Delete</Text>
        </Flex>
        <Stack>
          <ConditionInput
            id={condition.id}
            initValue={condition.former}
            onBlur={updateFormer}
          />
          <ConditionTypeSelector
            id={condition.id}
            initType={getConditionOption(condition?.condition ?? "")}
            onChange={updateType}
          />
          {isComparator(condition?.condition ?? "") && (
            <ConditionInput
              id={condition.id}
              initValue={condition.latter}
              onBlur={updateLatter}
            />
          )}
        </Stack>
      </Stack>
    );
  },
  (prevProps, nextProps) =>
    equals(prevProps?.initData?.id, nextProps?.initData?.id)
);

export interface IConjunctionSelector {
  onChange: (value: ConjunctionOption) => void;
}
export const ConjuntionSelector = ({ onChange }: IConjunctionSelector) => (
  <Stack>
    <Text m="0">Select Conjunction</Text>
    <Select onChange={(e) => onChange(e.target.value as ConjunctionOption)}>
      {CONJUNCTION_OPTIONS.map((c) => (
        <option value={c}>{c}</option>
      ))}
    </Select>
  </Stack>
);

export const Conjunction = ({
  initData,
  onConditionUpdate,
}: IConditionEditor) => {
  const [currentType, setCurrentType] = useState(
    getConjunctionOption(initData?.conjunction)
  );

  const handleChange = (value: ConjunctionOption) => {
    setCurrentType(value);
    onConditionUpdate({ ...initData, conjunction: getConjunction(value) });
  };

  if (!currentType) return <ConjuntionSelector onChange={handleChange} />;

  return (
    <Text m="0" textAlign="center">
      {currentType}
    </Text>
  );
};

interface IProps {
  initData?: ICondition[];
  onUpdate: (value: ICondition[]) => void;
}
export const Conditions = ({ onUpdate, initData = [{ id: v4() }] }: IProps) => {
  const [conditions, setConditions] = useState<ICondition[]>(initData);

  useEffect(() => {
    onUpdate(conditions);
  }, [conditions]);

  const addCondition = () => {
    setConditions([...conditions, { id: v4() }]);
  };

  const onConditionUpdate = (condition: ICondition) => {
    setConditions(
      conditions.map((c) => {
        if (c.id !== condition.id) return c;
        return condition;
      })
    );
  };


  return (
    <Stack spacing="30">
      <Stack>
        {conditions.length === 1 ? (
          <ConditionEditor
            initData={conditions[0]}
            onConditionUpdate={onConditionUpdate}
          />
        ) : (
          conditions.map((c, i) => (
            <Stack spacing="20">
              <ConditionEditor
                initData={c}
                onConditionUpdate={onConditionUpdate}
              />
              {conditions?.length - i !== 1 && <Conjunction initData={c} onConditionUpdate={onConditionUpdate} />}
            </Stack>
          ))
        )}
      </Stack>
      <Box>
        <Button onClick={addCondition}>+ Add another condition</Button>
      </Box>
    </Stack>
  );
};
