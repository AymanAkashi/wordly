import { Cell, MyCells } from "@/lib/types";
import { rows, wordLength } from "@/constants/constent";
import { generateWord } from "./generateWord";
import Cells from "@/components/cells";

export const resetGame = ({
    setGrid,
    setGuess,
    setWord,
    setCurrentCharIndex,
    setCurrentRowIndex,
    setError,
}: {
    setGrid: (prevGrid: MyCells[][]) => void;
    setGuess: (guess: string) => void;
    setWord: (word: string) => void;
    setCurrentCharIndex: (index: number) => void;
    setCurrentRowIndex: (index: number) => void;
    setError: (error: string) => void;
}) => {
    setGrid(
        Array.from({ length: rows }, () =>
            Array(wordLength).fill({ key: "", value: "no" })
        )
    );
    setGuess("");
    setWord(generateWord(wordLength));
    setCurrentCharIndex(0);
    setCurrentRowIndex(0);
    setError("");
};

export const moveNextCell = ({
    currentRowIndex,
    rows,
    word,
    setCurrentRowIndex,
    setCurrentCharIndex,
    setError,
}: {
    currentRowIndex: number;
    rows: number;
    word: string;
    setCurrentRowIndex: (index: number) => void;
    setCurrentCharIndex: (index: number) => void;
    setError: any;
}) => {
    if (currentRowIndex === rows - 1) {
        setError("You don't find the word. correct word is: " + word);
        setCurrentRowIndex(rows);
    } else {
        setCurrentRowIndex(currentRowIndex + 1);
    }
    setCurrentCharIndex(0);
    const cell = document.getElementById(`${currentRowIndex}-${0}`);
    if (cell) {
        cell.focus();
    }
};

export const DeleteLetter = ({
    guess,
    setGuess,
    currentCharIndex,
    setCurrentCharIndex,
    currentRowIndex,
    setGrid,
}: {
    guess: string;
    setGuess: any;
    currentCharIndex: number;
    setCurrentCharIndex: any;
    currentRowIndex: number;
    setGrid: any;
}) => {
    if (guess.length > 0) {
        setGuess((prevGuess: string) => {
            if (prevGuess.length === 1) {
                return "";
            }
            return prevGuess.slice(0, -1);
        });
    }

    if (currentCharIndex > 0) {
        setGrid((prevGrid: MyCells[][]) => {
            const newGrid = [...prevGrid];
            newGrid[currentRowIndex][
                currentCharIndex - 1 > 0 ? currentCharIndex - 1 : 0
            ] = {
                key: "",
                value: "no",
            };
            return newGrid;
        });
        setCurrentCharIndex((prevCharIndex: number) =>
            prevCharIndex - 1 > 0 ? prevCharIndex - 1 : 0
        );
    }
    const cell = document.getElementById(
        `${currentRowIndex}-${
            currentCharIndex - 1 > 0 ? currentCharIndex - 1 : 0
        }`
    );
    if (cell) {
        // remove animation
        cell.style.animation = "rev-shake 0.5s";
    }
};

export const AddLetter = ({
    newChar,
    currentRowIndex,
    currentCharIndex,
    setGrid,
    setGuess,
    setCurrentCharIndex,
}: {
    newChar: string;
    currentRowIndex: number;
    currentCharIndex: number;
    setGrid: any;
    setGuess: any;
    setCurrentCharIndex: any;
}) => {
    setGrid((prevGrid: MyCells[][]) => {
        const newGrid = [...prevGrid];
        newGrid[currentRowIndex][currentCharIndex] = {
            key: newChar,
            value: "no",
        };
        return newGrid;
    });
    setGuess((prevGuess: string) => prevGuess + newChar);
    setCurrentCharIndex((prevCharIndex: number) => prevCharIndex + 1);
    const cell = document.getElementById(
        `${currentRowIndex}-${currentCharIndex}`
    );
    if (cell) {
        cell.style.animation = "shake 0.5s";
    }
};
