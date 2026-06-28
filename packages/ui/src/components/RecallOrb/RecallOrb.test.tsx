import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RecallOrb } from "./RecallOrb";

describe("RecallOrb", () => {
    it("renders without crashing", () => {
        const { container } = render(<RecallOrb />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("applies status and size classes", () => {
        const { container } = render(<RecallOrb status="active" size="xl" />);
        // It renders an inner motion.div which has the classes
        const innerDiv = container.querySelector("div > div");
        expect(innerDiv).toHaveClass("h-32", "w-32", "from-emerald-400/80");
    });
});
