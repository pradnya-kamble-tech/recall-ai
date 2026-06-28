import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Modal, ModalTrigger, ModalContent, ModalTitle } from "./Modal";

// Mock matchMedia for Radix Dialog
window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};

describe("Modal", () => {
    it("renders and opens correctly", async () => {
        render(
            <Modal>
                <ModalTrigger asChild>
                    <button>Open</button>
                </ModalTrigger>
                <ModalContent>
                    <ModalTitle>Is Open</ModalTitle>
                </ModalContent>
            </Modal>
        );

        fireEvent.click(screen.getByText("Open"));

        await waitFor(() => {
            expect(screen.getByText("Is Open")).toBeInTheDocument();
        });
    });
});
