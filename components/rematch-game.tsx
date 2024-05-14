import { resetGame } from "@/constants/functionality";
import { GameState, MyCells } from "@/lib/types";
import { IoClose } from "react-icons/io5";
import React, { useContext } from "react";
import { GameContext } from "@/context/ContextProvider";
import Link from "next/link";

const RestartGame = (props: {
    winner?: string;
    room: string;
    name: string;
    mode: string;
    avatar: string;
}) => {
    const {
        word,
        game,
        setModal,
        setWord,
        setGrid,
        setGuess,
        setCurrentRowIndex,
        setCurrentCharIndex,
        setGame,
        setNotif,
        setTimer,
        setHeart,
        socket,
    } = useContext(GameContext);
    const { winner, room, name, mode, avatar } = props;
    return (
        <div className="absolute inset-0 m-auto z-10  flex justify-center items-center ">
            <div className="relative rounded-2xl min-w-72">
                <div
                    className={`text-center font-medium text-xl  min-w-72 py ${
                        game === "win" ? "bg-emerald-400" : "bg-red-500"
                    } rounded-t-2xl py-2`}
                >
                    {game === "win" ? "You Won! 🏆" : "You Lose!"}
                </div>
                <div className="dark:bg-gray-300 bg-neutral-700 flex flex-col justify-center items-center space-y-3 rounded-b-2xl py-4">
                    {winner && (
                        <div className="text-center text-2xl px-4 text-black">
                            {winner} won the game
                        </div>
                    )}
                    {game === "lose" && (
                        <>
                            <div className="text-center text-xl text-black">
                                Correct word is
                            </div>
                            <div className="text-bold  text-3xl text-green-600 px-8 py-2  rounded-lg outline-dotted outline-2 outline-black text-center flex justify-center items-center font-sans">
                                {word.toUpperCase()}
                            </div>
                            <Link
                                href={`https://wordfind.org/dictionary/${word.toLowerCase()}`}
                                rel="noreferrer noopener"
                                target="_blank"
                                className="text-center font-sans font-light text-blue-500 hover:underline text-xs leading-8"
                            >
                                What does this word mean?
                            </Link>
                        </>
                    )}
                    <div className="flex flex-col justify-center items-center flex-grow flex-shrink-0 space-y-2 w-auto border border-yellow-300">
                        <button
                            type="button"
                            title="New Game"
                            className="px-2 py-1 w-full bg-amber-500 hover:scale-105 transition-all duration-100 delay-75 text-white dark:text-black rounded-md hover:text-amber-500 hover:bg-black dark:bg-white dark:hover:bg-amber-500 dark:hover:text-black text-center"
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
                                socket.emit("rematch", { room });
                            }}
                        >
                            Rematch
                        </button>
                        <button
                            type="button"
                            title="New Game"
                            className="px-2 py-1 bg-emerald-500 hover:scale-105 transition-all duration-100 delay-75 text-white dark:text-black rounded-md hover:text-emerald-500 hover:bg-black dark:bg-white dark:hover:bg-emerald-500 dark:hover:text-black w-full text-center"
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
                                socket.emit("leave-room", { room });
                                setModal(false);
                                socket.emit("join", {
                                    name,
                                    avatar,
                                    mode: mode,
                                });
                            }}
                        >
                            New Game
                        </button>
                        <Link
                            href="/home"
                            title="New Game"
                            className="px-2 py-1 bg-red-500 hover:scale-105 transition-all duration-100 delay-75 text-white dark:text-black rounded-md hover:text-red-500 hover:bg-black dark:bg-white dark:hover:bg-red-500 dark:hover:text-black w-full text-center"
                        >
                            Leave
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestartGame;
