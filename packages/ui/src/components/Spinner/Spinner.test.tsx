import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
    it("renders with status role", () => {
        render(<Spinner />);
        expect(screen.getByRole("status")).toBeInTheDocument();
        expect(screen.getByLabelText("Loading")).toBeInTheDocument();
    });

    it("applies size class", () => {
        const { container } = render(<Spinner size="xl" />);
        expect(container.firstChild).toHaveClass("h-12");
    });
});
