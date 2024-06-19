import { defineSlotRecipe } from "@pandacss/dev";
import { defineConfig } from "@pandacss/dev";

export const tooltipRecipe = defineSlotRecipe({
  className: "tooltip",
  description: "The styles for the Tooltip component",
  slots: ["wrapper", "label"],
  base: {
    wrapper: { display: "inline-block", position: "relative" },
    label: {
      position: "absolute",
      borderRadius: "4px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "6px",
      color: "tooltip.text",
      background: "tooltip.background",
      fontSize: "14px",
      fontFamily: "sans-serif",
      lineHeight: "1",
      zIndex: "100",
      whiteSpace: "nowrap",
      _before: {
        content: '" "',
        left: "50%",
        border: "solid transparent",
        height: 0,
        width: 0,
        position: "absolute",
        pointerEvents: "none",
        borderWidth: "var(--tooltip-arrow-size)",
        marginLeft: "calc(var(--tooltip-arrow-size) * -1)",
      },
      "&[data-tooltip-placement=top]": {
        top: "calc(var(--tooltip-margin) * -1)",
        _before: {
          top: "100%",
          borderTopColor: "tooltip.background",
        },
      },
      "&[data-tooltip-placement=right]": {
        left: "calc(100% + var(--tooltip-margin))",
        top: "50%",
        transform: "translateX(0) translateY(-50%)",
        _before: {
          left: "calc(var(--tooltip-arrow-size) * -1)",
          top: "50%",
          transform: "translateX(0) translateY(-50%)",
          borderRightColor: "tooltip.background",
        },
      },
      "&[data-tooltip-placement=left]": {
        left: "auto",
        right: "calc(100% + var(--tooltip-margin))",
        top: "50%",
        transform: "translateX(0) translateY(-50%)",
        _before: {
          left: "auto",
          right: "calc(var(--tooltip-arrow-size) * -2)",
          top: "50%",
          transform: "translateX(0) translateY(-50%)",
          borderLeftColor: "tooltip.background",
        },
      },
      "&[data-tooltip-placement=bottom]": {
        bottom: "calc(var(--tooltip-margin) * -1)",
        _before: {
          bottom: "100%",
          borderBottomColor: "tooltip.background",
        },
      },
    },
  },
});

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  jsxFramework: "react",
  theme: {
    extend: {
      slotRecipes: {
        tooltip: tooltipRecipe,
      },
      tokens: {
        colors: {
          "tooltip.text": { value: "white" },
          "tooltip.background": { value: "black" },
        },
      },
    },
  },
  globalVars: {
    "--tooltip-margin": "30px",
    "--tooltip-arrow-size": "6px",
  },
});
