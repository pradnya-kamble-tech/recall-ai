import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta = {
    title: "Overlays/Skeleton",
    component: Skeleton,
    parameters: {
        layout: "padded",
    },
} satisfies Meta<typeof Skeleton>;

export default meta;

export const Default = {
    render: () => (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    ),
};
