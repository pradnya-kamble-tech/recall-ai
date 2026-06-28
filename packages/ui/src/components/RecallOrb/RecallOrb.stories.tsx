import type { Meta, StoryObj } from "@storybook/react";
import { RecallOrb } from "./RecallOrb";

const meta = {
    title: "Branding/RecallOrb",
    component: RecallOrb,
    parameters: {
        layout: "centered",
        backgrounds: { default: "recall-dark" },
    },
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md", "lg", "xl"],
        },
        status: {
            control: "select",
            options: ["idle", "thinking", "active", "error"],
        },
    },
} satisfies Meta<typeof RecallOrb>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic States
export const Idle: Story = { args: { status: "idle", size: "lg" } };
export const Thinking: Story = { args: { status: "thinking", size: "lg" } };
export const Active: Story = { args: { status: "active", size: "lg" } };
export const Error: Story = { args: { status: "error", size: "lg" } };

// Sizes
export const Small: Story = { args: { status: "active", size: "sm" } };
export const Medium: Story = { args: { status: "active", size: "md" } };
export const Large: Story = { args: { status: "active", size: "lg" } };
export const ExtraLarge: Story = { args: { status: "active", size: "xl" } };
