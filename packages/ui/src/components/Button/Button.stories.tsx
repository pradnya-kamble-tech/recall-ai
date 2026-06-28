import type { Meta, StoryObj } from "@storybook/react";
import { Search, ChevronRight, Zap } from "lucide-react";
import { Button } from "./Button";

const meta = {
    title: "Primitives/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    args: {
        children: "Recall Memory",
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "destructive", "outline", "secondary", "ghost", "glass", "link"],
        },
        size: {
            control: "select",
            options: ["default", "sm", "lg", "icon"],
        },
        disabled: { control: "boolean" },
        isLoading: { control: "boolean" },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { variant: "default" },
};

export const WithLeftIcon: Story = {
    args: {
        variant: "default",
        leftIcon: <Search className="h-4 w-4" />,
        children: "Search Memories",
    },
};

export const WithRightIcon: Story = {
    args: {
        variant: "default",
        rightIcon: <ChevronRight className="h-4 w-4" />,
        children: "Get Started",
    },
};

export const Loading: Story = {
    args: {
        variant: "default",
        isLoading: true,
        children: "Processing…",
    },
};

export const Glass: Story = {
    args: { variant: "glass" },
    parameters: { backgrounds: { default: "recall-dark" } },
};

export const Outline: Story = {
    args: { variant: "outline" },
};

export const Destructive: Story = {
    args: { variant: "destructive", children: "Delete Memory" },
};

export const Ghost: Story = {
    args: { variant: "ghost" },
};

export const Small: Story = {
    args: { size: "sm", leftIcon: <Zap className="h-3 w-3" /> },
};

export const Large: Story = {
    args: { size: "lg", rightIcon: <ChevronRight className="h-5 w-5" /> },
};

export const Disabled: Story = {
    args: { disabled: true },
};
