import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import {
    Modal,
    ModalTrigger,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalTitle,
    ModalDescription,
} from "./Modal";

const meta = {
    title: "Overlays/Modal",
    component: Modal,
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof Modal>;

export default meta;

export const Default = {
    render: () => (
        <Modal>
            <ModalTrigger asChild>
                <Button>Open Modal</Button>
            </ModalTrigger>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Edit Profile</ModalTitle>
                    <ModalDescription>
                        Make changes to your profile here. Click save when you're done.
                    </ModalDescription>
                </ModalHeader>
                <div className="grid gap-4 py-4 p-4 border rounded-md min-h-[100px] mt-4 mb-4">
                    Content goes here
                </div>
                <ModalFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save changes</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    ),
};
