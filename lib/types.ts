import { type } from "os";

export type Cell = "yes" | "no" | "check";
export type MyCells = {
    key: string;
    value: Cell;
};

export type GameState = "on" | "win" | "lose";
export type Mode = "easy" | "normal" | "hard";

export type userType = {
    user: string;
    avatar: string;
};
