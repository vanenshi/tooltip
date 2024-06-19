import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";
import { styled } from "../../../styled-system/jsx";
import { tooltip } from "../../../styled-system/recipes";
import { useDisclosure } from "../../helpers/useDisclosure";

export interface TooltipProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /**
   * Delay (in ms) before hiding the tooltip
   */
  closeDelay?: number;
  /**
   * Delay (in ms) before showing the tooltip
   */
  openDelay?: number;
  /**
   * The placement of the popper relative to its reference.
   */
  placement?: "top" | "right" | "left" | "bottom";
  /**
   * The label of the tooltip
   */
  label?: React.ReactNode;
  /**
   * The accessible, human friendly label to use for
   * screen readers.
   */
  "aria-label"?: string;
  /**
   * If true, the tooltip will be shown (in controlled mode)
   */
  isOpen?: boolean;
  /**
   * Callback to run when the tooltip shows
   */
  onOpen?(): void;
  /**
   * Callback to run when the tooltip hides
   */
  onClose?(): void;
  isDisabled?: boolean;
}

export const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = (props) => {
  const {
    id,
    children,
    placement: direction = "top",
    onOpen: onOpenProp,
    onClose: onCloseProp,
    isOpen: isOpenProp,
    closeDelay = 200,
    openDelay = 50,
    "aria-label": ariaLabel,
    isDisabled = false,
    label,
    role = "tooltip",
    ...rest
  } = props;

  const classes = tooltip({ direction });

  const exitTimeout = useRef<NodeJS.Timeout>();
  const clearExitTimeout = useCallback(() => {
    if (exitTimeout.current) {
      clearTimeout(exitTimeout.current);
      exitTimeout.current = undefined;
    }
  }, []);

  const enterTimeout = useRef<NodeJS.Timeout>();
  const clearEnterTimeout = useCallback(() => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
      enterTimeout.current = undefined;
    }
  }, []);

  const { open, onOpen, onClose } = useDisclosure({
    open: isOpenProp,
    defaultOpen: false,
    onOpen: onOpenProp,
    onClose: onCloseProp,
  });

  const closeNow = useCallback(() => {
    clearExitTimeout();
    onClose();
  }, [onClose, clearExitTimeout]);

  const closeWithDelay = useCallback(() => {
    clearEnterTimeout();
    exitTimeout.current = setTimeout(closeNow, closeDelay);
  }, [clearEnterTimeout, closeDelay, closeNow]);

  const openWithDelay = useCallback(() => {
    if (!isDisabled && !enterTimeout.current) {
      enterTimeout.current = setTimeout(onOpen, openDelay);
    }
  }, [isDisabled, onOpen, openDelay]);

  useEffect(() => {
    if (!isDisabled) return;
    clearEnterTimeout();
    if (open) onClose();
  }, [isDisabled, onClose, clearEnterTimeout, open]);

  useEffect(() => {
    return () => {
      clearEnterTimeout();
      clearExitTimeout();
    };
  }, [clearEnterTimeout, clearExitTimeout]);

  const hasAriaLabel = !!ariaLabel;

  const uuid = useId();
  const uid = id ?? uuid;
  const tooltipId = `tooltip-${uid}`;

  return (
    <div
      id={tooltipId}
      aria-describedby={open ? tooltipId : undefined}
      role={role}
      className={classes.wrapper}
      onMouseEnter={openWithDelay}
      onMouseLeave={closeWithDelay}
      {...rest}
    >
      {children}
      {open && (
        <div data-tooltip-placement={direction} className={classes.label}>
          {label}
          {hasAriaLabel && (
            <styled.span srOnly id={tooltipId} role={role}>
              {ariaLabel}
            </styled.span>
          )}
        </div>
      )}
    </div>
  );
};
