import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta = {
    title: "Overlays/Spinner",
    component: Spinner,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md", "lg", "xl"],
        },
        color: {
            control: "select",
            options: ["primary", "muted", "white"],
        },
    },
} satisfies Meta<typeof Spinner>;

export default meta;

export const Default = {};

export const Small = { args: { size: "sm" } };
export const Large = { args: { size: "lg" } };
export const ExtraLarge = { args: { size: "xl" } };
export const Muted = { args: { color: "muted" } };
export const White = { args: { color: "white" }, parameters: { backgrounds: { default: "recall-dark" } } };
