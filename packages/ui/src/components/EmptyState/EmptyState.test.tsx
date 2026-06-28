import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EmptyState } from "./EmptyState";
import { EmptySearch } from "./EmptyStateVariants";

describe("EmptyState", () => {
    it("renders title and description", () => {
        render(<EmptyState title="Test Title" description="Test Description" />);
        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("renders pre-configured variants", () => {
        render(<EmptySearch />);
        expect(screen.getByText("No results found")).toBeInTheDocument();
    });
});
