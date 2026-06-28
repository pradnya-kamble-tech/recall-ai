import type { Meta, StoryObj } from "@storybook/react";
import { LoadingOverlay } from "./LoadingOverlay";
import { Card, CardHeader, CardTitle, CardContent } from "../Card/Card";

const meta = {
    title: "Overlays/LoadingOverlay",
    component: LoadingOverlay,
    parameters: {
        layout: "centered",
    },
    decorators: [
        (Story) => (
            <Card className="w-[400px] h-[300px] relative overflow-hidden">
                <CardHeader>
                    <CardTitle>Processing Area</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Some content that is currently being processed...</p>
                </CardContent>
                <Story />
            </Card>
        ),
    ],
} satisfies Meta<typeof LoadingOverlay>;

export default meta;

export const Default = {
    args: {
        isVisible: true,
        text: "Analyzing memory...",
    },
};

export const WithoutText = {
    args: {
        isVisible: true,
    },
};
