"use client";
import React, { useContext, useEffect } from "react";
import Cells from "@/components/cells";
import { ErrorDialog } from "@/components/error-dialog";
import { generateWord } from "@/actions/generateWord";
import { rows, wordLength } from "@/constants/constent";
import { FaHeart } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import {
    moveNextCell,
    DeleteLetter,
    AddLetter,
    handleWord,
} from "@/constants/functionality";
import { validWord } from "@/constants/valid-word";
import GameOver from "@/components/game-over";
import { changeType, GameContext } from "@/context/ContextProvider";
import { setupGrid } from "@/constants/setup-game";
import Keyboard from "@/components/keyboard";
import { GameWordly } from "@/context/ContextProvider";

export const update = (setwordly: any, type: changeType, value: any) => {
    setwordly((prev: any) => {
        const newwordly = new GameWordly(prev);
        newwordly.update(type, value);
        return newwordly;
    });
};

export const updateAll = (setwordly: any, type: changeType[], value: any[]) => {
    for (let i = 0; i < type.length; i++) {
        setwordly((prev: any) => {
            const newwordly = new GameWordly(prev);
            newwordly.update(type[i], value[i]);
            return newwordly;
        });
    }
};

const Hearts = ({ heart }: { heart: number }) => {
    return (
        <div className="flex items-start justify-center  mx-1 sm:items-center sm:space-x-12">
            <span className="sm:block hidden">Heart: </span>
            <span className="relative flex justify-center items-center  px-2 py-1 w-8 h-8">
                <FaHeart className="absolute left-0 flex justify-center items-center text-red-500 w-full h-full" />
                <div className=" absolute z-20 flex justify-center items-center text-xl">
                    {heart}
                </div>
            </span>
        </div>
    );
};

const Game = ({ mode }: { mode: string }) => {
    const { wordly, setWordly } = useContext(GameContext);

    useEffect(() => {
        if (wordly.timer === -1 || wordly.game !== "on") return;
        if (wordly.timer === 0 || wordly.heart === 0) {
            update(setWordly, "game", "lose");
            update(setWordly, "modal", true);
            return;
        }
        const interval = setInterval(() => {
            update(setWordly, "timer", wordly.timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [wordly, wordly.timer, wordly.game]);

    useEffect(() => {
        if (wordly.word == "") {
            generateWord(wordLength).then((data) => {
                update(setWordly, "word", data);
            });
        }
        if (
            wordly.currentRowIndex === rows ||
            wordly.game !== "on" ||
            // check the page is loaded or not with window object
            typeof window === "undefined"
        ) {
            return;
        }
        async function handleKeyDown(e: any) {
            if (
                e.keyCode >= 65 &&
                e.keyCode <= 90 &&
                wordly.guess.length < wordLength &&
                wordly.currentCharIndex < wordLength
            ) {
                if (wordly.timer === -1)
                    update(
                        setWordly,
                        "timer",
                        mode === "1x1" ? 60 : mode === "1x2" ? 120 : 180,
                    );
                const key = document.getElementById("kbd-" + e.key);
                if (key) {
                    key.classList.add("bg-sky-500");
                    setTimeout(() => {
                        key.classList.remove("bg-sky-500");
                    }, 200);
                }
                const newChar = String.fromCharCode(
                    e.keyCode,
                ).toLocaleLowerCase();
                AddLetter({
                    wordly,
                    setWordly,
                    newChar,
                });
            } else if (e.key === "Enter") {
                const key = document.getElementById("kbd-enter");
                if (key) {
                    key.classList.add("bg-sky-500");
                    setTimeout(() => {
                        key.classList.remove("bg-sky-500");
                    }, 200);
                }
                handleWord({
                    wordly,
                    setWordly,
                    validWord,
                });
            } else if (e.key === "Backspace") {
                const key = document.getElementById("kbd-delete");
                if (key) {
                    key.classList.add("bg-sky-500");
                    setTimeout(() => {
                        key.classList.remove("bg-sky-500");
                    }, 200);
                }
                DeleteLetter({
                    wordly,
                    setWordly,
                });
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [wordly]);

    return (
        <main className="w-full h-[calc(100vh-110px)] flex flex-col justify-center items-center mt-8 space-y-8 overflow-hidden relative">
            <div className="grid grid-cols-5 gap-1 relative h-auto">
                {wordly?.grid?.map((row, rowIndex) =>
                    row.map(
                        (
                            char: {
                                key: string;
                                value: string;
                            },
                            charIndex: number,
                        ) => (
                            <div key={`${rowIndex}-${charIndex}`}>
                                <Cells
                                    props={{
                                        rowIndex,
                                        charIndex,
                                        char,
                                        currentRowIndex: wordly.currentRowIndex,
                                    }}
                                />
                            </div>
                        ),
                    ),
                )}
                {wordly.notif && (
                    <div className="absolute inset-0 m-auto z-10 flex justify-center items-center">
                        <ErrorDialog
                            message={wordly.notif}
                            setWordly={setWordly}
                        />
                    </div>
                )}
                {wordly.modal && <GameOver />}
            </div>
            <div className="absolute left-1 top-1 lg:left-10 lg:top-20 text-xl flex flex-col justify-center items-start space-y-8">
                <span>
                    <span className="sm:inline-block hidden">Time left: </span>
                    <span>
                        <IoMdTimer className="inline-block sm:hidden" />{" "}
                    </span>
                    <span
                        className={` ${
                            wordly.timer === -1 &&
                            "underline text-green-800 dark:text-green-400"
                        }`}
                    >
                        {wordly.timer !== -1 ? wordly.timer : "Click To start"}
                    </span>
                </span>
                <Hearts heart={wordly.heart} />
            </div>
            <Keyboard mode={mode} />
            {wordly.guess.length === wordLength &&
                wordly.guess.length === wordLength &&
                wordly.game === "on" &&
                !wordly.notif && (
                    <div className="text-lg fixed flex justify-center items-center bg-black/50 shadow-white/20 shadow-md text-white px-2 py-1 rounded-xl">
                        {" "}
                        Press Enter{" "}
                        <img
                            src="/enter.svg"
                            alt="enter"
                            className="size-12 text-white"
                        />{" "}
                    </div>
                )}
        </main>
    );
};

export default Game;
