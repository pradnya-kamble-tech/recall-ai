import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoadingOverlay } from "./LoadingOverlay";

describe("LoadingOverlay", () => {
    it("renders when isVisible is true", () => {
        render(<LoadingOverlay isVisible={true} text="Please wait" />);
        expect(screen.getByText("Please wait")).toBeInTheDocument();
    });

    it("does not render when isVisible is false", () => {
        const { container } = render(<LoadingOverlay isVisible={false} text="Please wait" />);
        expect(screen.queryByText("Please wait")).not.toBeInTheDocument();
    });
});
