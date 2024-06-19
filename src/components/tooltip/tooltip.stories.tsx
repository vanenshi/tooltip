import type { Meta, StoryObj } from "@storybook/react";
import { styled } from "../../../styled-system/jsx";
import { Tooltip, type TooltipProps } from "./Tooltip";

const meta = {
  title: "Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: TooltipProps = {
  placement: "top",
  label: "Yuuu Hooo",
};

export const Basic: Story = {
  args: defaultProps,
  render: (props) => (
    <div>
      <Tooltip {...props}>With Tooltip</Tooltip>
    </div>
  ),
};

export const MultipleTooltips: Story = {
  args: defaultProps,
  render: (props) => (
    <styled.div display="flex" flexDir="column" gap="2">
      <Tooltip {...props}>With Tooltip 1</Tooltip>
      <Tooltip {...props}>With Tooltip 2</Tooltip>
    </styled.div>
  ),
};

export const WithDisabledButton: Story = {
  args: { ...defaultProps, label: "You don't have access to this" },
  render: (props) => (
    <Tooltip {...props}>
      <button disabled>Can't Touch This</button>
    </Tooltip>
  ),
};

export const WithDefaultIsOpenProp: Story = {
  args: {
    ...defaultProps,
    label: "You don't have access to this",
    isOpen: true,
  },
  render: (props) => (
    <Tooltip {...props}>
      <button disabled>Can't Touch This</button>
    </Tooltip>
  ),
};

export const WithDarkTheme: Story = {
  args: {
    ...defaultProps,
    label: "You don't have access to this",
    isOpen: true,
  },
  render: (props) => (
    <Tooltip data-panda-theme="dark" {...props}>
      <button disabled>Can't Touch This</button>
    </Tooltip>
  ),
};

export const WithAriaLabel: Story = {
  args: {
    ...defaultProps,
    label: "Notifications",
    "aria-label": "3 Notifications",
  },
  render: (props) => (
    <Tooltip {...props}>
      <button style={{ fontSize: 25 }}>
        <span role="img" aria-label="notification">
          🔔
        </span>
        <span>3</span>
      </button>
    </Tooltip>
  ),
};
