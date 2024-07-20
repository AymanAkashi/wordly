import { type } from "os";

export type Cell = "yes" | "no" | "check";
export type MyCells = {
    key: string;
    value: Cell;
};

export type GameState = "on" | "win" | "lose";
export type Mode = "easy" | "normal" | "hard";

export type userType = {
    id: string;
    user: string;
    avatar: string;
};

interface WordlyContextType {
    word: string;
    setWord: (word: string) => void;
    cells: MyCells[];
    setCells: (cells: MyCells[]) => void;
    gameState: GameState;
    setGameState: (gameState: GameState) => void;
    mode: Mode;
    setMode: (mode: Mode) => void;
    user: userType;
    setUser: (user: userType) => void;
}
