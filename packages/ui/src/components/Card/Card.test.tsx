import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "./Card";

describe("Card Compound Component", () => {
    it("renders all card subcomponents", () => {
        render(
            <Card data-testid="card">
                <CardHeader>
                    <CardTitle>Title</CardTitle>
                    <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>Content Area</CardContent>
                <CardFooter>Footer Area</CardFooter>
            </Card>
        );

        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByText("Content Area")).toBeInTheDocument();
        expect(screen.getByText("Footer Area")).toBeInTheDocument();
        expect(screen.getByTestId("card")).toHaveClass("overflow-hidden");
    });
});
