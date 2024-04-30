"use client";
import React, { useContext, useEffect } from "react";
import Cells from "@/components/cells";
import { ErrorDialog } from "@/components/error-dialog";
import { generateWord } from "@/constants/generateWord";
import { rows, wordLength } from "@/constants/constent";
import { FaHeart } from "react-icons/fa6";
import {
    moveNextCell,
    DeleteLetter,
    AddLetter,
    handleWord,
} from "@/constants/functionality";
import { validWord } from "@/constants/valid-word";
import GameOver from "@/components/game-over";
import { GameContext } from "@/context/ContextProvider";
import { setupGrid } from "@/constants/setup-game";
import Keyboard from "@/components/keyboard";

const Hearts = ({ heart }: { heart: number }) => {
    return (
        <div className="flex justify-center items-center space-x-12">
            Heart:{" "}
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
    const {
        word,
        setWord,
        grid,
        setGrid,
        currentRowIndex,
        setCurrentRowIndex,
        currentCharIndex,
        setCurrentCharIndex,
        guess,
        setGuess,
        modal,
        setModal,
        game,
        setGame,
        notif,
        setNotif,
        heart,
        setHeart,
        setTimer,
        timer,
    } = useContext(GameContext);

    useEffect(() => {
        console.log(timer);
        if (timer === -1 || game !== "on") return;
        if (timer === 0 || heart === 0) {
            setGame("lose");
            setModal(true);
            return;
        }
        const interval = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (word == "") {
            setWord(generateWord(wordLength));
        }
        if (currentRowIndex === rows || game !== "on") {
            return;
        }
        async function handleKeyDown(e: any) {
            if (
                e.keyCode >= 65 &&
                e.keyCode <= 90 &&
                guess.length < wordLength &&
                currentCharIndex < wordLength
            ) {
                if (timer === -1)
                    setTimer(mode === "1x1" ? 60 : mode === "1x2" ? 120 : 180);
                const key = document.getElementById("kbd-" + e.key);
                if (key) {
                    key.classList.add("bg-sky-500");
                    setTimeout(() => {
                        key.classList.remove("bg-sky-500");
                    }, 200);
                }
                const newChar = String.fromCharCode(
                    e.keyCode
                ).toLocaleLowerCase();
                AddLetter({
                    newChar,
                    currentRowIndex,
                    currentCharIndex,
                    setGrid,
                    setGuess,
                    setCurrentCharIndex,
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
                    word,
                    guess,
                    setGame,
                    setModal,
                    setGrid,
                    currentRowIndex,
                    setCurrentRowIndex,
                    setCurrentCharIndex,
                    setNotif,
                    setGuess,
                    setHeart,
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
                    guess,
                    setGuess,
                    currentCharIndex,
                    setCurrentCharIndex,
                    currentRowIndex,
                    setGrid,
                });
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentCharIndex, grid]);

    return (
        <main className="w-full h-full flex flex-col justify-center items-center mt-8 space-y-8 rel relative">
            <div className="grid grid-cols-5 gap-1 relative">
                {grid.map((row, rowIndex) =>
                    row.map((char, charIndex) => (
                        <div key={`${rowIndex}-${charIndex}`}>
                            <Cells
                                props={{
                                    rowIndex,
                                    charIndex,
                                    char,
                                    currentRowIndex,
                                }}
                            />
                        </div>
                    ))
                )}
                {notif && (
                    <div className="absolute inset-0 m-auto z-10 flex justify-center items-center">
                        <ErrorDialog message={notif} setError={setNotif} />
                    </div>
                )}
                {modal && <GameOver />}
            </div>
            <div className="absolute left-10 top-20 text-xl flex flex-col justify-center items-start space-y-8">
                <span>
                    Time left:{" "}
                    <span
                        className={` ${
                            timer === -1 && "underline text-green-400"
                        }`}
                    >
                        {timer !== -1 ? timer : "Click To start"}
                    </span>
                </span>
                <Hearts heart={heart} />
            </div>
            <Keyboard />
            {guess.length === wordLength &&
                guess.length === wordLength &&
                game === "on" &&
                !notif && <span className="text-lg"> Press Enter </span>}
        </main>
    );
};

export default Game;
