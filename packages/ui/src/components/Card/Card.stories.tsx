import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "./Card";

const meta = {
    title: "Layout/Card",
    component: Card,
    parameters: {
        layout: "centered",
    },
    decorators: [
        (Story) => (
            <div className="w-[350px]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Card>
            <CardHeader>
                <CardTitle>Memory Captured</CardTitle>
                <CardDescription>2 minutes ago</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm">
                    Discussed the new architecture for the RecallAI design system, focusing on
                    reusable layout primitives.
                </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="ghost" size="sm">Dismiss</Button>
                <Button size="sm">View Node</Button>
            </CardFooter>
        </Card>
    ),
};
