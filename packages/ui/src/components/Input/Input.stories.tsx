import type { Meta, StoryObj } from "@storybook/react";
import { Search, Eye, EyeOff, Lock, Mail, AtSign } from "lucide-react";
import { Input } from "./Input";

const meta = {
    title: "Primitives/Input",
    component: Input,
    parameters: { layout: "centered" },
    decorators: [
        (Story) => (
            <div className="w-[360px]">
                <Story />
            </div>
        ),
    ],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "ghost", "search"],
        },
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
        },
        disabled: { control: "boolean" },
        isLoading: { control: "boolean" },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Email",
        placeholder: "you@recall.ai",
    },
};

export const WithHelperText: Story = {
    args: {
        label: "Workspace name",
        placeholder: "acme-corp",
        helperText: "This will be your unique workspace identifier.",
    },
};

export const WithError: Story = {
    args: {
        label: "Email",
        placeholder: "you@recall.ai",
        error: "Please enter a valid email address.",
        defaultValue: "not-an-email",
    },
};

export const WithLeftIcon: Story = {
    args: {
        label: "Search",
        placeholder: "Search memories…",
        leftIcon: <Search className="h-4 w-4" />,
    },
};

export const WithRightIcon: Story = {
    args: {
        label: "Password",
        type: "password",
        placeholder: "••••••••",
        leftIcon: <Lock className="h-4 w-4" />,
        rightIcon: <Eye className="h-4 w-4" />,
    },
};

export const Loading: Story = {
    args: {
        label: "Searching…",
        placeholder: "Search memories…",
        leftIcon: <Search className="h-4 w-4" />,
        isLoading: true,
        defaultValue: "transcription ai",
    },
};

export const Disabled: Story = {
    args: {
        label: "API Key",
        placeholder: "sk-••••••••••••••",
        disabled: true,
        defaultValue: "sk-recall-1234",
        helperText: "Contact your admin to rotate the API key.",
    },
};

export const SearchVariant: Story = {
    args: {
        variant: "search",
        placeholder: "Ask RecallAI anything…",
        leftIcon: <Search className="h-4 w-4" />,
    },
};

export const Small: Story = {
    args: {
        size: "sm",
        label: "Tag",
        placeholder: "Add tag…",
        leftIcon: <AtSign className="h-3.5 w-3.5" />,
    },
};

export const Large: Story = {
    args: {
        size: "lg",
        label: "Email Address",
        placeholder: "you@recall.ai",
        leftIcon: <Mail className="h-5 w-5" />,
    },
};
