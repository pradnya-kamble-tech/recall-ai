import type { Meta, StoryObj } from "@storybook/react";
import { GlassPanel } from "./GlassPanel";

const meta = {
    title: "Layout/GlassPanel",
    component: GlassPanel,
    parameters: {
        layout: "centered",
        backgrounds: { default: "recall-dark" },
    },
    decorators: [
        (Story) => (
            <div className="relative w-96 h-64 p-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <Story />
            </div>
        ),
    ],
    args: {
        children: <div className="p-6 text-white font-medium">Frosted Glass Content</div>,
    },
    argTypes: {
        intensity: {
            control: "select",
            options: ["light", "medium", "heavy"],
        },
    },
} satisfies Meta<typeof GlassPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Light: Story = { args: { intensity: "light" } };
export const Heavy: Story = { args: { intensity: "heavy" } };
