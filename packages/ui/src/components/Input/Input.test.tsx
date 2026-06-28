import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Search } from "lucide-react";
import { Input } from "./Input";

describe("Input Component", () => {
    it("renders with label", () => {
        render(<Input label="Email" placeholder="you@recall.ai" />);
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("you@recall.ai")).toBeInTheDocument();
    });

    it("associates label with input via htmlFor/id", () => {
        render(<Input label="Email" id="email-field" placeholder="email" />);
        const labelEl = screen.getByText("Email");
        const inputEl = screen.getByPlaceholderText("email");
        expect(labelEl).toHaveAttribute("for", "email-field");
        expect(inputEl).toHaveAttribute("id", "email-field");
    });

    it("renders helper text", () => {
        render(<Input helperText="Must be a valid email." />);
        expect(screen.getByText("Must be a valid email.")).toBeInTheDocument();
    });

    it("renders error and sets aria-invalid", () => {
        render(<Input error="This field is required." />);
        const inputEl = screen.getByRole("textbox");
        expect(inputEl).toHaveAttribute("aria-invalid", "true");
        expect(screen.getByText("This field is required.")).toBeInTheDocument();
        expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("shows error text instead of helperText when both are provided", () => {
        render(<Input helperText="Helper." error="Error!" />);
        expect(screen.getByText("Error!")).toBeInTheDocument();
        expect(screen.queryByText("Helper.")).not.toBeInTheDocument();
    });

    it("is not aria-invalid when no error", () => {
        render(<Input placeholder="fine" />);
        expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "false");
    });

    it("is disabled and not interactive", () => {
        render(<Input disabled placeholder="disabled" />);
        const inputEl = screen.getByRole("textbox");
        expect(inputEl).toBeDisabled();
        expect(inputEl).toHaveAttribute("disabled");
    });

    it("shows spinner when isLoading", () => {
        render(<Input isLoading aria-label="search" />);
        const inputEl = screen.getByRole("textbox");
        expect(inputEl).toHaveAttribute("aria-busy", "true");
    });

    it("renders leftIcon correctly", () => {
        render(<Input leftIcon={<Search data-testid="left-icon" />} />);
        expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    });

    it("renders rightIcon correctly", () => {
        render(<Input rightIcon={<Search data-testid="right-icon" />} />);
        expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });

    it("fires onChange with user input", () => {
        const handleChange = vi.fn();
        render(<Input onChange={handleChange} />);
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "hello" } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("links input to description via aria-describedby when helperText provided", () => {
        render(<Input id="my-input" helperText="Some help" />);
        const inputEl = screen.getByRole("textbox");
        expect(inputEl).toHaveAttribute("aria-describedby", "my-input-desc");
        expect(screen.getByText("Some help")).toHaveAttribute("id", "my-input-desc");
    });
});
