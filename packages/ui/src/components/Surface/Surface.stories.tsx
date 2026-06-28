import type { Meta, StoryObj } from "@storybook/react";
import { Surface } from "./Surface";

const meta = {
    title: "Layout/Surface",
    component: Surface,
    parameters: {
        layout: "centered",
    },
    args: {
        children: "This is a base surface primitive.",
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "muted", "bordered", "ghost"],
        },
        padding: {
            control: "select",
            options: ["none", "sm", "default", "lg"],
        },
    },
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Muted: Story = {
    args: { variant: "muted" },
};

export const Bordered: Story = {
    args: { variant: "bordered" },
};

export const Ghost: Story = {
    args: { variant: "ghost" },
};

export const CustomPadding: Story = {
    args: { padding: "lg" },
};
