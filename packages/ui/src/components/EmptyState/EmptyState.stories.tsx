import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { EmptySearch, EmptyLibrary, EmptyWorkspace, EmptyMemory } from "./EmptyStateVariants";
import { Button } from "../Button/Button";
import { Plus } from "lucide-react";

const meta = {
    title: "States/EmptyState",
    component: EmptyState,
    parameters: {
        layout: "padded",
    },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Nothing to see here",
        description: "This is a base empty state component that you can use to build custom empty states.",
    },
};

export const WithAction: Story = {
    args: {
        title: "No projects found",
        description: "Get started by creating a new project.",
        action: <Button leftIcon={<Plus className="h-4 w-4" />}>Create Project</Button>,
    },
};

// Variants
export const Search: Story = {
    args: { title: "" }, // required by the component props, but overridden in variant
    render: () => <EmptySearch />,
};

export const Library: Story = {
    args: { title: "" },
    render: () => <EmptyLibrary action={<Button>Capture Memory</Button>} />,
};

export const Workspace: Story = {
    args: { title: "" },
    render: () => <EmptyWorkspace />,
};

export const Memory: Story = {
    args: { title: "" },
    render: () => <EmptyMemory />,
};
