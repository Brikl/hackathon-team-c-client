import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";
import { useCallback } from "react";
import { v4 } from "uuid";
import { equals } from "../../../shared/utils";

export interface IAction {
  id: string;
  value: string;
}

interface IActionProps {
  initData: IAction;
  onBlur: (id: string, value: string) => void;
}

export const Action = memo(
  ({ onBlur, initData }: IActionProps) => {
    const [action, setAction] = useState(initData);
    return (
      <Input
        onChange={(e) => setAction({ ...action, value: e.target.value })}
        onBlur={(e) => onBlur(action.id, e.target.value)}
        value={action.value}
      />
    );
  },
  (prevProps, nextProps) =>
    equals(prevProps?.initData?.id, nextProps?.initData?.id)
);

interface IProps {
  initData?: IAction[];
  onUpdate: (value: IAction[]) => void;
}

export const Actions = ({
  onUpdate,
  initData = [{ id: v4(), value: "" }],
}: IProps) => {
  const [actions, setActions] = useState<IAction[]>(initData);

  useEffect(() => {
    onUpdate(actions);
  }, [actions]);

  const addAction = () => setActions([...actions, { id: v4(), value: "" }]);

  const updateActions = (id: string, value: string) => {
    setActions(
      actions.map((a) => {
        if (a.id !== id) return a;
        return { ...a, value: value };
      })
    );
  };

  return (
    <Stack spacing="20">
      <Text m="0" fontWeight="semibold">
        Add Trigger Even
      </Text>
      <Stack spacing="15">
        {actions.map((a) => (
          <Action key={a.id} initData={a} onBlur={updateActions} />
        ))}
      </Stack>
      <Box>
        <Button onClick={addAction}>+ Add more action</Button>
      </Box>
    </Stack>
  );
};
