import { ReactNode } from "react";
import { Modal as MantineModal, Button } from "@mantine/core";

type ModalProps = {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  withCloseButton?: boolean;
  className?: string; // ✅ allow passing className
};

export function Modal({
  opened,
  onClose,
  title,
  children,
  withCloseButton = true,
  className,
}: ModalProps) {
  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      title={title}
      withCloseButton={withCloseButton}
      centered
      className={className} // ✅ apply className
    >
      {children}
    </MantineModal>
  );
}

type ModalTriggerButtonProps = {
  label: string;
  onClick: () => void;
  className?: string; // ✅ allow className for button
};

export function ModalTriggerButton({
  label,
  onClick,
  className,
}: ModalTriggerButtonProps) {
  return (
    <Button onClick={onClick} className={className}>
      {label}
    </Button>
  );
}
