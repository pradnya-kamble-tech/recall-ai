import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AIStatusIndicator } from "./AIStatusIndicator";

describe("AIStatusIndicator", () => {
    it("renders default idle status", () => {
        render(<AIStatusIndicator />);
        expect(screen.getByText("Ready")).toBeInTheDocument();
    });

    it("renders custom text", () => {
        render(<AIStatusIndicator text="Processing..." />);
        expect(screen.getByText("Processing...")).toBeInTheDocument();
    });

    it("applies status styles", () => {
        const { container } = render(<AIStatusIndicator status="error" />);
        expect(container.firstChild).toHaveClass("text-destructive");
        expect(screen.getByText("Error")).toBeInTheDocument();
    });
});
