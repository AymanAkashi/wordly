import { GameWordly } from "@/context/ContextProvider";
import { rows, wordLength } from "./constent";
import { Cell, MyCells } from "@/lib/types";
import { update, updateAll } from "@/app/Game";

const updateGrid = (
    prev: MyCells[][],
    value: Cell,
    indx: { row: number; col: number },
) => {
    const newGrid = new Array(rows).fill(Array(wordLength).fill({}));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < wordLength; j++) {
            newGrid[i][j] = { ...prev[i][j] };
        }
    }
    console.log("rows: ", rows, " wordLength: ", wordLength);
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
    wordly: GameWordly,
    setWordly: any,
) => {
    let i = 0;
    const newGrid = wordly.grid;
    const interval = setInterval(() => {
        const element = document.getElementById(
            `${wordly.currentRowIndex}-${i}`,
        );
        if (element) {
            element.style.animation = "cell-win 0.5s";
        }
        const last = i;
        if (word[i] === guess[i]) {
            newGrid[wordly.currentRowIndex][last] = {
                ...newGrid[wordly.currentRowIndex][last],
                value: "yes",
            };
            updateColors(word[i], "bg-green-500");
            word[i] = " ";
            guess[i] = ".";
        } else if (
            word.includes(guess[i]) &&
            word[word.indexOf(guess[i])] !== guess[word.indexOf(guess[i])]
        ) {
            newGrid[wordly.currentRowIndex][last] = {
                ...newGrid[wordly.currentRowIndex][last],
                value: "check",
            };
            updateColors(guess[i], "bg-yellow-500");
            word[word.indexOf(guess[i])] = " ";
            guess[i] = ".";
        } else {
            newGrid[wordly.currentRowIndex][last] = {
                ...newGrid[wordly.currentRowIndex][last],
                value: "no",
            };
            updateColors(guess[i], "bg-red-500");
        }
        update(setWordly, "grid", newGrid);
        if (i === wordLength - 1) {
            clearInterval(interval);
        } else i++;
    }, 200);
};

export const setupGrid = ({
    wordly,
    setWordly,
}: {
    wordly: any;
    setWordly: any;
}) => {
    if (wordly.word === wordly.guess) {
        updateAll(setWordly, ["game", "modal"], ["win", true]);
        for (let i = 0; i < wordLength; i++) {
            const key = document.getElementById(`kbd-${wordly.word[i]}`);
            if (key) {
                key.classList.remove("bg-yellow-500");
                key.classList.add("bg-green-500");
            }
        }
        let time = 0;
        const interval = setInterval(() => {
            const element = document.getElementById(
                `${wordly.currentRowIndex}-${time}`,
            );
            if (element) {
                element.style.animation = "cell-win 0.5s";
            }
            // const last = time;
            const newGrid = wordly.grid;
            newGrid[wordly.currentRowIndex][time] = {
                ...newGrid[wordly.currentRowIndex][time],
                value: "yes",
            };
            update(setWordly, "grid", newGrid);
            if (time === wordLength - 1) {
                clearInterval(interval);
            } else time++;
        }, 200);
        return true;
    }
    const tmp = wordly.word.split("");
    checkMatch(
        wordly.word.split(""),
        wordly.guess.split(""),
        wordly,
        setWordly,
    );
    wordly.update("guess", "");
    console.log("grid: ", wordly.grid);
    if (wordly.currentRowIndex === rows - 1) {
        wordly.update("game", "lose");
        // setModal(true);
    }
    setWordly(wordly);
    return false;
};
