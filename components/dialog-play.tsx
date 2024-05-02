"use client";
import { resetGame } from "@/constants/functionality";
import { GameContext } from "@/context/ContextProvider";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "./ui/dialog";
import { useContext, useState } from "react";
import { GiConsoleController } from "react-icons/gi";
import Image from "next/image";

const DialogPlay = () => {
    const {
        game,
        setGrid,
        setGuess,
        setCurrentRowIndex,
        setCurrentCharIndex,
        setWord,
        setGame,
        setNotif,
        setTimer,
        setHeart,
    } = useContext(GameContext);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <button
                        type="button"
                        title={game === "on" ? "New Game" : "Play"}
                        className=" hover:text-sky-500 cursor-pointer transition-all duration-100 delay-76 sm:inline-block hidden"
                    >
                        {game === "on" ? "New Game" : "Play"}
                    </button>
                    <button
                        type="button"
                        title={game === "on" ? "New Game" : "Play"}
                        className=" hover:text-sky-500 cursor-pointer transition-all duration-100 delay-76 inline-block sm:hidden"
                    >
                        <GiConsoleController className="h-8 w-8" />
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent className="flex flex-col justify-center items-center space-y-4 w-4/5 sm:w-auto rounded-2xl shadow-md dark:shadow-gray-400/25 shadow-gray-900 bg-gray-200">
                <DialogTitle className="flex justify-center items-center flex-col">
                    <p className="font-sans text-xl w-4/5 text-center">
                        Find the word and improve your{" "}
                        <span className="text-green-400 font-semibold underline dark:decoration-white decoration-black">
                            vocabulary
                        </span>
                    </p>
                </DialogTitle>
                <DialogHeader>
                    <Image
                        src="/wordly.png"
                        alt="wordly"
                        width="300"
                        height="300"
                    />
                </DialogHeader>
                <DialogDescription>
                    <button
                        type="button"
                        title="New Game"
                        className="px-2 py-1 bg-emerald-500 hover:scale-105 transition-all duration-100 delay-75 text-white dark:text-black rounded-md hover:text-emerald-500 hover:bg-black dark:bg-white dark:hover:bg-emerald-500 dark:hover:text-black"
                        onClick={() => {
                            resetGame({
                                setGrid,
                                setGuess,
                                setCurrentRowIndex,
                                setCurrentCharIndex,
                                setWord,
                                setGame,
                                setNotif,
                                setTimer,
                                setHeart,
                            });
                        }}
                    >
                        New Game
                    </button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default DialogPlay;
