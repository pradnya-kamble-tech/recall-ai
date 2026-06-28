import type { Meta, StoryObj } from "@storybook/react";
import { ErrorState } from "./ErrorState";

const meta = {
    title: "States/ErrorState",
    component: ErrorState,
    parameters: {
        layout: "padded",
    },
    argTypes: {
        onRetry: { action: "retry clicked" },
    },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomMessage: Story = {
    args: {
        title: "Failed to load memory",
        description: "The memory you requested could not be found or you do not have permission to view it.",
        retryText: "Go back to Library",
    },
};
