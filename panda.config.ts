import {
  defineSemanticTokens,
  defineSlotRecipe,
  defineTokens,
} from "@pandacss/dev";
import { defineConfig } from "@pandacss/dev";

const tooltipRecipe = defineSlotRecipe({
  className: "tooltip",
  description: "The styles for the Tooltip component",
  slots: ["wrapper", "label"],
  base: {
    wrapper: { display: "inline-block", position: "relative" },
    label: {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      borderRadius: "md",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "8px",
      color: "tooltip.text",
      background: "tooltip.background",
      zIndex: "var(--tooltip-z-index)",
      whiteSpace: "nowrap",
      _before: {
        content: '""',
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
        top: "calc(var(--tooltip-offset) * -1)",
        _before: {
          top: "100%",
          borderTopColor: "tooltip.background",
        },
      },
      "&[data-tooltip-placement=right]": {
        left: "calc(100% + var(--tooltip-offset))",
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
        right: "calc(100% + var(--tooltip-offset))",
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
        bottom: "calc(var(--tooltip-offset) * -1)",
        _before: {
          bottom: "100%",
          borderBottomColor: "tooltip.background",
        },
      },
    },
  },
});

const baseTokens = defineTokens({
  colors: {
    tooltip: {
      text: { value: "{colors.natural.text}" },
      background: { value: "{colors.natural.surface}" },
    },
  },
});

const baseSemanticTokens = defineSemanticTokens({
  colors: {
    natural: {
      surface: {
        value: "#F3F3F8",
      },
      text: {
        value: "#130F25",
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
      semanticTokens: baseSemanticTokens,
      tokens: baseTokens,
    },
  },
  themes: {
    dark: {
      semanticTokens: {
        colors: {
          natural: {
            surface: {
              value: "#130F25",
            },
            text: {
              value: "#F3F3F8",
            },
          },
        },
      },
      tokens: {
        colors: {
          tooltip: {
            text: { value: "{colors.natural.text}" },
            background: { value: "{colors.natural.surface}" },
          },
        },
      },
    },
  },
  staticCss: {
    themes: ["dark"],
    recipes: "*",
  },
  globalVars: {
    "--tooltip-offset": "3rem",
    "--tooltip-arrow-size": "0.375rem",
    "--tooltip-z-index": "100",
  },
  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
  },
});
