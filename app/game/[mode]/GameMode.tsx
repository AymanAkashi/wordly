"use client";
import React, { useContext, useEffect, useState } from "react";
import Cells from "@/components/cells";
import { ErrorDialog } from "@/components/error-dialog";
import { generateWord } from "@/actions/generateWord";
import { rows, wordLength } from "@/constants/constent";
import { FaHeart } from "react-icons/fa6";
import {
    moveNextCell,
    DeleteLetter,
    AddLetter,
    handleWord,
} from "@/constants/functionality";
import { validWord } from "@/constants/valid-word";
import RestartGame from "@/components/rematch-game";
import { GameContext } from "@/context/ContextProvider";
import { setupGrid } from "@/constants/setup-game";
import Keyboard from "@/components/keyboard";
import Link from "next/link";

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

const GameMode = ({
    mode,
    newWord,
    socket,
    room,
    name,
    avatar,
}: {
    mode: string;
    newWord: string;
    socket: any;
    room: string;
    name: string | null;
    avatar: string;
}) => {
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
    const [count, setCount] = useState(5);
    const [winner, setWinner] = useState("");
    const [Waiting, setWaiting] = useState(false);
    if (word != newWord) setWord(newWord);
    useEffect(() => {
        if (count === 0)
            setTimer(mode === "1x1" ? 60 : mode === "1x2" ? 120 : 180);
        const interval = setInterval(() => {
            setCount(count - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [count]);

    useEffect(() => {
        if (timer === -1 && count === 0)
            setTimer(mode === "1x1" ? 60 : mode === "1x2" ? 120 : 180);
        if (timer === -1 || game !== "on") return;
        if (timer === 0 || heart === 0 || currentRowIndex === rows) {
            console.log("lose\n");
            socket.emit("lose", { name, id: socket.id, room: room, mode });
            setWaiting(true);
            setGame("lose");
            return;
        }
        const interval = setInterval(() => {
            setTimer(timer - 1);
            setCount(count - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (currentRowIndex === rows || heart <= 0) {
            console.log("lose\n");
            socket.emit("lose", { name, id: socket.id, room: room, mode });
            setWaiting(true);
            setGame("lose");
            return;
        }
        socket.on("end", (data: any) => {
            setGame("lose");
            console.log("data was recv: ", data);
            setWinner(data.name);
            setModal(true);
        });
        socket.on("lose", (data: any) => {
            setGame("lose");
            setWaiting(false);
            setModal(true);
            setWinner("No one");
        });
        if (game === "win") {
            socket.emit("end", { name, id: socket.id, room: room });
            setWinner("You");
            setModal(true);
        }
        if (word == "") {
            generateWord(wordLength).then((data) => {
                setWord(data);
            });
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
        console.log("Waiting: ", Waiting);
        document.addEventListener("keydown", handleKeyDown);
        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentCharIndex, grid, Waiting]);

    return (
        <main className="w-full h-full flex flex-col justify-center items-center mt-8 space-y-8 rel relative border-2 border-yellow-500">
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
                    )),
                )}
                {count >= 0 && (
                    <div className="countdown absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white bg-black/50 px-4 py-2 rounded-xl">
                        <span
                            style={
                                {
                                    "--value": count,
                                } as React.CSSProperties
                            }
                        ></span>
                    </div>
                )}
                {notif && (
                    <div className="absolute inset-0 m-auto z-10 flex justify-center items-center">
                        <ErrorDialog message={notif} setError={setNotif} />
                    </div>
                )}
                {!modal && Waiting && (
                    <div className="absolute inset-0 m-auto z-10 flex justify-center items-center w-full px-2">
                        <div className="flex justify-center flex-col items-center bg-gradient-to-tr to-black/50 rounded-2xl p-2">
                            <p className="text-4xl  px-2 py-1">
                                Waiting Other Players to finished !
                            </p>
                            <Link href="/home">
                                <button className="bg-red-500 text-white px-2 py-1 rounded-xl ml-2 hover:scale-95 hover:bg-red-700 transition-all delay-75 duration-100">
                                    Go Back
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
                {modal && (
                    <RestartGame
                        winner={winner}
                        room={room}
                        name={name || ""}
                        mode={mode}
                        avatar={avatar}
                    />
                )}
            </div>
            <div className="absolute top-1 left-1 lg:left-10 lg:top-20 text-xl flex flex-col justify-center items-start space-y-8">
                <span>
                    Time left:{" "}
                    <span
                        className={` ${
                            timer === -1 &&
                            "underline text-green-800 dark:text-green-400"
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
                !notif && (
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

export default GameMode;
