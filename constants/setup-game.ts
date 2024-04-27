import { rows, wordLength } from "./constent";
import { Cell, MyCells } from "@/lib/types";

const updateGrid = (
    prev: MyCells[][],
    value: Cell,
    indx: { row: number; col: number }
) => {
    const newGrid = [...prev];
    newGrid[indx.row][indx.col] = newGrid[indx.row][indx.col] = {
        ...newGrid[indx.row][indx.col],
        value: value,
    };
    return newGrid;
};

const updateColors = (key: string, color: string) => {
    const k = document.getElementById(`kbd-${key}`);
    if (k) {
        k.classList.forEach((c) => {
            if (c.includes("bg-")) {
                k.classList.remove(c);
            }
        });
        k.classList.add(color);
    }
};

const checkMatch = (
    word: string[],
    guess: string[],
    setGrid: (prev: MyCells[][]) => void,
    currentRowIndex: number
) => {
    for (let i = 0; i < word.length; i++) {
        if (word[i] === guess[i]) {
            setGrid((prevGrid: MyCells[][]) => {
                return updateGrid(prevGrid, "yes", {
                    row: currentRowIndex,
                    col: i,
                });
            });
            updateColors(word[i], "bg-green-500");
            word[i] = " ";
            guess[i] = ".";
        } else if (
            word.includes(guess[i]) &&
            word[word.indexOf(guess[i])] !== guess[word.indexOf(guess[i])]
        ) {
            setGrid((prevGrid: MyCells[][]) => {
                return updateGrid(prevGrid, "check", {
                    row: currentRowIndex,
                    col: i,
                });
            });
            updateColors(guess[i], "bg-yellow-500");
            word[word.indexOf(guess[i])] = " ";
            guess[i] = ".";
        } else {
            setGrid((prevGrid: any) => {
                return updateGrid(prevGrid, "no", {
                    row: currentRowIndex,
                    col: i,
                });
            });
            updateColors(guess[i], "bg-red-500");
        }
    }
};

export const setupGrid = ({
    word,
    guess,
    setGame,
    setModal,
    setGrid,
    currentRowIndex,
}: {
    word: string;
    guess: string;
    setGame: any;
    setModal: any;
    setGrid: (prev: MyCells[][]) => void;
    currentRowIndex: number;
}) => {
    if (word === guess) {
        setGame("win");
        setModal(true);
        setGrid((prevGrid: MyCells[][]) => {
            const newGrid = [...prevGrid];
            for (let i = 0; i < wordLength; i++) {
                updateGrid(newGrid, "yes", { row: currentRowIndex, col: i });
            }
            return newGrid;
        });
        for (let i = 0; i < wordLength; i++) {
            const key = document.getElementById(`kbd-${word[i]}`);
            if (key) {
                key.classList.remove("bg-yellow-500");
                key.classList.add("bg-green-500");
            }
        }
        return true;
    }
    const tmp = word.split("");
    checkMatch(word.split(""), guess.split(""), setGrid, currentRowIndex);

    if (currentRowIndex === rows - 1) {
        setGame("lose");
        setModal(true);
    }
    return false;
};
