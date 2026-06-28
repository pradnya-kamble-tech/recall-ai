import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Search } from "lucide-react";
import { Button } from "./Button";

describe("Button Component", () => {
    it("renders correctly with default text", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });

    it("triggers onClick correctly", () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Action</Button>);
        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("applies variant classes correctly", () => {
        const { container } = render(<Button variant="destructive">Delete</Button>);
        expect(container.firstChild).toHaveClass("bg-destructive");
    });

    it("is keyboard navigable (accessible focus)", () => {
        render(<Button>Focus me</Button>);
        const button = screen.getByRole("button");
        button.focus();
        expect(button).toHaveFocus();
    });

    it("prevents clicks when disabled", () => {
        const handleClick = vi.fn();
        render(<Button disabled onClick={handleClick}>Disabled</Button>);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
        expect(button).toBeDisabled();
    });

    it("shows spinner and hides content when isLoading", () => {
        render(<Button isLoading>Save</Button>);
        const button = screen.getByRole("button");
        // Button is disabled in loading state
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute("aria-busy", "true");
        // Screen reader text should be present
        expect(screen.getByText("Loading…")).toBeInTheDocument();
    });

    it("prevents clicks when isLoading", () => {
        const handleClick = vi.fn();
        render(<Button isLoading onClick={handleClick}>Submit</Button>);
        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).not.toHaveBeenCalled();
    });

    it("renders leftIcon correctly", () => {
        render(
            <Button leftIcon={<Search data-testid="left-icon" />}>Search</Button>
        );
        expect(screen.getByTestId("left-icon")).toBeInTheDocument();
        expect(screen.getByText("Search")).toBeInTheDocument();
    });

    it("renders rightIcon correctly", () => {
        render(
            <Button rightIcon={<Search data-testid="right-icon" />}>Open</Button>
        );
        expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });
});
