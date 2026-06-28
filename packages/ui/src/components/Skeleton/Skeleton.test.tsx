import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
    it("renders with animation class", () => {
        const { container } = render(<Skeleton data-testid="skel" />);
        expect(screen.getByTestId("skel")).toHaveClass("animate-pulse");
    });
});
