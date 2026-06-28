import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Surface } from "./Surface";

describe("Surface", () => {
    it("renders children correctly", () => {
        render(<Surface>Test content</Surface>);
        expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("applies the default variant and padding", () => {
        const { container } = render(<Surface>Default</Surface>);
        expect(container.firstChild).toHaveClass("border-border", "p-6");
    });

    it("applies variant classes", () => {
        const { container } = render(<Surface variant="muted">Muted</Surface>);
        expect(container.firstChild).toHaveClass("bg-muted");
    });
});
