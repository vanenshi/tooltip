import React, { PropsWithChildren, useState } from "react";
import "./tooltip.css";

export interface TooltipProps {
  delay?: number;
  direction?: "top" | "right" | "left" | "bottom";
  label?: string;
}

export const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = (props) => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {active && (
        <div className={`Tooltip-Tip ${props.direction || "top"}`}>
          {props.label}
        </div>
      )}
    </div>
  );
};
