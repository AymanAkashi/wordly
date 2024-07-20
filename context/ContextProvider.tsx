"use client";
import { socket } from "@/client/client-io";
import { rows, wordLength } from "@/constants/constent";
import { GameState, MyCells } from "@/lib/types";
import React, { createContext, useEffect, useState } from "react";

export type changeType =
    | "grid"
    | "currentRowIndex"
    | "currentCharIndex"
    | "guess"
    | "modal"
    | "game"
    | "notif"
    | "timer"
    | "heart"
    | "word"
    | "socket";
export class GameWordly {
    word = "";
    grid = new Array(rows).fill(
        Array(wordLength).fill({ key: "", value: "no" }),
    );
    currentRowIndex = 0;
    currentCharIndex = 0;
    guess = "";
    modal = false;
    game = "on";
    notif = "";
    timer = -1;
    heart = 3;
    socket = null;
    constructor(
        wordOrGameWordly?: string | GameWordly,
        wordLen?: number,
        time?: number,
    ) {
        if (typeof wordOrGameWordly === "string") {
            // Assuming 'rows' and 'wordLength' are defined somewhere
            this.word = wordOrGameWordly;
            this.grid = new Array(rows).fill(
                Array(wordLen).fill({ key: "", value: "no" }),
            );
            this.timer = time ?? -1;
        } else if (wordOrGameWordly instanceof GameWordly) {
            // Copy constructor functionality
            const gameWordly = wordOrGameWordly;
            this.word = gameWordly.word;
            this.grid = gameWordly.grid.map((row) => [...row]);
            this.currentRowIndex = gameWordly.currentRowIndex;
            this.currentCharIndex = gameWordly.currentCharIndex;
            this.guess = gameWordly.guess;
            this.modal = gameWordly.modal;
            this.game = gameWordly.game;
            this.notif = gameWordly.notif;
            this.timer = gameWordly.timer;
            this.heart = gameWordly.heart;
            this.socket = gameWordly.socket;
        } else {
            // Default initialization if no or invalid parameters are provided
            this.grid = new Array(rows).fill(
                Array(wordLength).fill({ key: "", value: "no" }),
            );
        }
    }
    reset() {
        this.word = "";
        this.grid = new Array(rows).fill(
            Array(wordLength).fill({ key: "", value: "no" }),
        );
        this.currentRowIndex = 0;
        this.currentCharIndex = 0;
        this.guess = "";
        this.modal = false;
        this.game = "on";
        this.notif = "";
        this.timer = -1;
        this.heart = 3;
        this.socket = null;
    }
    update(type: changeType, value: any) {
        switch (type) {
            case "word":
                this.word = value;
                break;
            case "grid":
                this.grid = value;
                break;
            case "currentRowIndex":
                this.currentRowIndex = value;
                break;
            case "currentCharIndex":
                this.currentCharIndex = value;
                break;
            case "guess":
                this.guess = value;
                break;
            case "modal":
                this.modal = value;
                break;
            case "game":
                this.game = value;
                break;
            case "notif":
                this.notif = value;
                break;
            case "timer":
                this.timer = value;
                break;
            case "heart":
                this.heart = value;
                break;
            case "socket":
                this.socket = value;
                break;
            default:
                break;
        }
    }
}

interface GameContextType {
    wordly: GameWordly;
    setWordly: (wordly: GameWordly) => void;
    socket: typeof socket;
}

export const GameContext = createContext({
    wordly: new GameWordly("", wordLength, -1),
    setWordly: () => {},
    socket: socket,
} as GameContextType);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        function onConnect() {
            console.log("connected");
        }
        function onDisconnect() {
            console.log("disconnected");
        }
        if (socket.connected) {
            onConnect();
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);
    const [wordly, setWordly] = useState(new GameWordly("", wordLength, -1));
    return (
        <GameContext.Provider
            value={{ wordly: wordly, setWordly: setWordly, socket }}
        >
            {children}
        </GameContext.Provider>
    );
};

export default ContextProvider;
