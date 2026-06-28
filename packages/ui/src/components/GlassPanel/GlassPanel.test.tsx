import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GlassPanel } from "./GlassPanel";

describe("GlassPanel", () => {
    it("renders children correctly", () => {
        render(<GlassPanel>Glass content</GlassPanel>);
        expect(screen.getByText("Glass content")).toBeInTheDocument();
    });

    it("applies backdrop blur base classes", () => {
        const { container } = render(<GlassPanel />);
        expect(container.firstChild).toHaveClass("backdrop-blur-xl");
    });
});
