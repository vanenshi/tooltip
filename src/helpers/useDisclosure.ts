import React, {
  useCallback,
  useId,
  useInsertionEffect,
  useRef,
  useState,
} from "react";

export interface UseDisclosureProps {
  open?: boolean;
  defaultOpen?: boolean;
  onClose?(): void;
  onOpen?(): void;
  id?: string;
}

type HTMLProps = React.HTMLAttributes<HTMLElement>;

export function useDisclosure(props: UseDisclosureProps = {}) {
  const {
    onClose: onCloseProp,
    onOpen: onOpenProp,
    open: openProp,
    id: idProp,
  } = props;

  const handleOpen = useCallbackRef(onOpenProp);
  const handleClose = useCallbackRef(onCloseProp);

  const [openState, setOpen] = useState(props.defaultOpen || false);

  const open = openProp !== undefined ? openProp : openState;

  const isControlled = openProp !== undefined;

  const uid = useId();
  const id = idProp ?? `disclosure-${uid}`;

  const onClose = useCallback(() => {
    if (!isControlled) {
      setOpen(false);
    }
    handleClose?.();
  }, [isControlled, handleClose]);

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setOpen(true);
    }
    handleOpen?.();
  }, [isControlled, handleOpen]);

  const onToggle = useCallback(() => {
    if (open) {
      onClose();
    } else {
      onOpen();
    }
  }, [open, onOpen, onClose]);

  function getButtonProps(props: HTMLProps = {}): HTMLProps {
    return {
      ...props,
      "aria-expanded": open,
      "aria-controls": id,
      onClick(event) {
        props.onClick?.(event);
        onToggle();
      },
    };
  }

  function getDisclosureProps(props: HTMLProps = {}): HTMLProps {
    return {
      ...props,
      hidden: !open,
      id,
    };
  }

  return {
    open,
    onOpen,
    onClose,
    onToggle,
    isControlled,
    getButtonProps,
    getDisclosureProps,
  };
}

export function useCallbackRef<Args extends unknown[], Return>(
  callback: ((...args: Args) => Return) | undefined,
  deps: React.DependencyList = []
) {
  const callbackRef = useRef<typeof callback>(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });

  useInsertionEffect(() => {
    callbackRef.current = callback;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback((...args: Args) => callbackRef.current?.(...args), deps);
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
