import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { ClipboardList, Clipboard } from "lucide-react";

import { MultiplayerInput } from "./multiplayer-input";
import { ModeInput } from "./mode-input";
import { Mode } from "@/lib/types";
import { Button, Image } from "@nextui-org/react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { PlayersInput } from "./players-input";

export const DialogCustomer = ({
    setOpenedDialog,
    open,
}: {
    open: boolean;
    setOpenedDialog: React.Dispatch<React.SetStateAction<boolean[]>>;
}) => {
    const [selectedMode, setSelectedMode] = useState<Mode>("normal");
    const [selectedOption, setSelectedOption] = useState<string>("online");
    const [players, setPlayers] = useState<number>(2);
    const [url, setUrl] = useState<string>("");
    const [copied, setCopied] = useState<boolean>(false);
    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                setCopied(false);
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
                    <Image
                        src="/logo.png"
                        alt="customer"
                        width={200}
                        height={200}
                    />
                </DialogHeader>
                <DialogHeader className="space-y-4">
                    <DialogTitle>Setting</DialogTitle>
                    <div className="flex justify-start items-center space-x-2">
                        <MultiplayerInput
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                        />
                    </div>
                    <ModeInput
                        selectedMode={selectedMode}
                        setSelectedMode={setSelectedMode}
                    />
                    {selectedOption === "online" && (
                        <>
                            <PlayersInput
                                Players={players}
                                setPlayers={setPlayers}
                            />
                            <div className="w-4/5 border border-gray-600 m-auto rounded-full" />
                            <div className="flex justify-start items-center space-x-2">
                                <div
                                    id="url-game"
                                    className="w-full py-2 flex justify-start items-center px-2 text-white/60 border border-gray-600/30 rounded-2xl"
                                >
                                    generated url
                                </div>
                                <button
                                    className=" tooltip size-10 rounded-xl border border-white/25 p-1"
                                    type="button"
                                    title="copy"
                                    data-tip="Copied !"
                                    onClick={() => {
                                        navigator.clipboard.writeText("url");
                                        setCopied(true);
                                    }}
                                >
                                    <Image
                                        src={`/clipboard${copied ? "-check" : ""}.svg`}
                                        alt="copy"
                                        className={`${copied && "animate-image-fade"} w-full h-full text-white`}
                                    />
                                </button>
                            </div>
                        </>
                    )}
                </DialogHeader>
                <DialogDescription>
                    <DialogTrigger className="text-xl m-auto w-full">
                        <Link
                            href="/game"
                            passHref
                            type="button"
                            title="start game"
                            className=" py-1 px-4 rounded-2xl border border-green-200 bg-gradient-to-t from-emerald-600 via-green-400 to-teal-700 bg-size-200 bg-pos-100 hover:scale-105 transition-all duration-100 delay-75 hover:bg-pos-0 text-black hover:text-lime-400"
                        >
                            Start
                        </Link>
                    </DialogTrigger>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};
