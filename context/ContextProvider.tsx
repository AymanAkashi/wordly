"use client";
import { rows, wordLength } from "@/constants/constent";
import { GameState, MyCells } from "@/lib/types";
import React, { createContext, useState } from "react";

export const GameContext = createContext({
    word: "",
    setWord: (word: string) => {},
    grid: Array.from({ length: rows }, () =>
        Array(wordLength).fill({ key: "", value: "no" })
    ),
    setGrid: (grid: MyCells[][]) => {},
    currentRowIndex: 0,
    setCurrentRowIndex: (index: number) => {},
    currentCharIndex: 0,
    setCurrentCharIndex: (index: number) => {},
    guess: "",
    setGuess: (guess: string) => {},
    modal: false,
    setModal: (modal: boolean) => {},
    game: "on" as GameState,
    setGame: (game: GameState) => {},
    notif: "",
    setNotif: (error: string) => {},
    timer: 0,
    setTimer: (timer: number) => {},
    heart: 3,
    setHeart: (heart: number) => {},
});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [word, setWord] = useState<string>("");

    const [grid, setGrid] = useState<MyCells[][]>(
        Array.from({ length: rows }, () =>
            Array(wordLength).fill({ key: "", value: "no" })
        )
    );
    const [currentRowIndex, setCurrentRowIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [guess, setGuess] = useState("");
    const [modal, setModal] = useState(false);
    const [game, setGame] = useState<GameState>("on");
    const [notif, setNotif] = useState("");
    const [heart, setHeart] = useState(3);
    const [timer, setTimer] = useState(-1);
    return (
        <GameContext.Provider
            value={{
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
                timer,
                setTimer,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export default ContextProvider;
