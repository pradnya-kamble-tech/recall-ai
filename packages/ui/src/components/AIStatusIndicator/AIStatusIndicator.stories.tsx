import type { Meta, StoryObj } from "@storybook/react";
import { AIStatusIndicator } from "./AIStatusIndicator";

const meta = {
    title: "Branding/AIStatusIndicator",
    component: AIStatusIndicator,
    parameters: {
        layout: "padded",
    },
    argTypes: {
        status: {
            control: "select",
            options: ["idle", "thinking", "active", "error"],
        },
    },
} satisfies Meta<typeof AIStatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = { args: { status: "idle" } };
export const Thinking: Story = { args: { status: "thinking" } };
export const Active: Story = { args: { status: "active" } };
export const Error: Story = { args: { status: "error" } };

export const CustomText: Story = {
    args: {
        status: "thinking",
        text: "Analyzing 12 memories..."
    }
};

export const TextOnly: Story = {
    args: {
        status: "active",
        showOrb: false,
    }
};
