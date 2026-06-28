import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
    it("renders default title and description", () => {
        render(<ErrorState />);
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
        expect(
            screen.getByText(/An unexpected error occurred/i)
        ).toBeInTheDocument();
    });

    it("renders retry button and handles click", () => {
        const handleRetry = vi.fn();
        render(<ErrorState onRetry={handleRetry} retryText="Reload" />);

        const btn = screen.getByRole("button", { name: "Reload" });
        expect(btn).toBeInTheDocument();

        fireEvent.click(btn);
        expect(handleRetry).toHaveBeenCalledTimes(1);
    });
});
