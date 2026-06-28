import type { Meta, StoryObj } from "@storybook/react";
import { FloatingPanel } from "./FloatingPanel";

const meta = {
    title: "Layout/FloatingPanel",
    component: FloatingPanel,
    parameters: {
        layout: "centered",
    },
    args: {
        children: <div className="p-4">Floating Panel Content</div>,
    },
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "default", "lg", "xl", "auto"],
        },
    },
} satisfies Meta<typeof FloatingPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };
export const ExtraLarge: Story = { args: { size: "xl" } };
