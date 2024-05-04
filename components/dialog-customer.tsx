import React, { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { MultiplayerInput } from "./multiplayer-input";

export const DialogCustomer = ({
    setOpenedDialog,
    open,
}: {
    open: boolean;
    setOpenedDialog: React.Dispatch<React.SetStateAction<boolean[]>>;
}) => {
    useEffect(() => {}, []);
    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                setOpenedDialog((prev) => {
                    const newOpenedDialog = [...prev];
                    newOpenedDialog[2] = !newOpenedDialog[2];
                    return newOpenedDialog;
                });
            }}
        >
            <DialogContent>
                <DialogHeader className="flex justify-center items-center">
                    <DialogTitle>Create Customer Game</DialogTitle>
                </DialogHeader>
                <DialogHeader>
                    <DialogTitle>Setting</DialogTitle>
                    <DialogDescription>
                        <MultiplayerInput />
                    </DialogDescription>
                </DialogHeader>
                <DialogDescription>
                    <DialogTrigger>Customer</DialogTrigger>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};
