import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FloatingPanel } from "./FloatingPanel";

describe("FloatingPanel", () => {
    it("renders children correctly", () => {
        render(<FloatingPanel>Float</FloatingPanel>);
        expect(screen.getByText("Float")).toBeInTheDocument();
    });

    it("applies shadow and popover styles", () => {
        const { container } = render(<FloatingPanel />);
        expect(container.firstChild).toHaveClass("shadow-lg", "bg-popover");
    });
});
