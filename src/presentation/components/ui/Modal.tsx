// src/presentation/ui/Modal.tsx
import { useDisclosure } from "@mantine/hooks";
import { Modal as MantineModal, Button } from "@mantine/core";
import { ReactNode } from "react";

type ModalProps = {
  buttonLabel: string;
  title: string;
  children: ReactNode;
};

export function Modal({ buttonLabel, title, children }: ModalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <MantineModal opened={opened} onClose={close} title={title}>
        {children}
      </MantineModal>

      <Button variant="default" onClick={open}>
        {buttonLabel}
      </Button>
    </>
  );
}
