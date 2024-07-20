import { Cell, MyCells } from "@/lib/types";
import { rows, wordLength } from "@/constants/constent";
import { generateWord } from "../actions/generateWord";
import Cells from "@/components/cells";
import { validWord } from "./valid-word";
import { setupGrid } from "./setup-game";
import { update, updateAll } from "@/app/Game";
import { GameWordly } from "@/context/ContextProvider";

export const resetGame = ({ setWordly }: { setWordly: any }) => {
    for (let i = 0; i < 26; i++) {
        const key = document.getElementById(
            `kbd-${String.fromCharCode(97 + i)}`,
        );
        if (key) {
            // find all keys and remove background color
            key.classList.remove("bg-sky-500");
            key.classList.remove("bg-red-500");
            key.classList.remove("bg-green-500");
            key.classList.remove("bg-yellow-500");
        }
    }
    setWordly((prev: any) => {
        const newWordly = new GameWordly(prev);
        newWordly.reset();
        return newWordly;
    });
};

export const moveNextCell = ({
    wordly,
    setWordly,
    currentRowIndex,
}: {
    wordly: any;
    setWordly: any;
    currentRowIndex: number;
}) => {
    if (currentRowIndex === rows - 1) {
        updateAll(
            setWordly,
            ["game", "currentRowIndex", "modal"],
            ["lose", -1, true],
        );
        return;
    } else {
        update(setWordly, "currentRowIndex", currentRowIndex + 1);
    }
    update(setWordly, "currentCharIndex", 0);
    console.log(wordly.currentRowIndex, " ", wordly.currentCharIndex);
    console.log(
        "moving: ",
        wordly.grid[0],
        " ",
        wordly.grid[1],
        " ",
        wordly.grid[2],
    );
};

export const DeleteLetter = ({
    wordly,
    setWordly,
}: {
    wordly: any;
    setWordly: any;
}) => {
    const myNewWordly = new GameWordly(wordly);
    if (wordly.guess.length > 0) {
        update(setWordly, "guess", wordly.guess.slice(0, -1));
    }
    if (wordly.currentCharIndex > 0) {
        const newGrid = myNewWordly.grid;
        newGrid[wordly.currentRowIndex][
            wordly.currentCharIndex - 1 > 0 ? wordly.currentCharIndex - 1 : 0
        ] = {
            key: "",
            value: "no",
        };
        updateAll(
            setWordly,
            ["grid", "currentCharIndex"],
            [newGrid, wordly.currentCharIndex - 1],
        );
    }
    const cell = document.getElementById(
        `${wordly.currentRowIndex}-${
            wordly.currentCharIndex - 1 > 0 ? wordly.currentCharIndex - 1 : 0
        }`,
    );
    if (cell) {
        // remove animation
        cell.style.animation = "rev-shake 0.5s";
    }
};

export const AddLetter = ({
    wordly,
    setWordly,
    newChar,
}: {
    wordly: any;
    setWordly: any;
    newChar: string;
}) => {
    // const myNewWordly = new GameWordly(wordly);
    const newGrid = wordly.grid;
    newGrid[wordly.currentRowIndex][wordly.currentCharIndex] = {
        key: newChar,
        value: "no",
    };
    update(setWordly, "grid", newGrid);
    updateAll(
        setWordly,
        ["guess", "currentCharIndex"],
        [wordly.guess + newChar, wordly.currentCharIndex + 1],
    );
    const cell = document.getElementById(
        `${wordly.currentRowIndex}-${wordly.currentCharIndex}`,
    );
    if (cell) {
        cell.style.animation = "shake 0.5s";
    }
};

export const handleWord = async ({
    wordly,
    setWordly,
    validWord,
}: {
    wordly: any;
    setWordly: any;
    validWord: any;
}) => {
    if (wordly.guess.length !== wordLength) {
        update(setWordly, "notif", "Word is not complete");
        return;
    } else if (
        !(await validWord(wordly.guess)) &&
        wordly.word !== wordly.guess
    ) {
        updateAll(
            setWordly,
            ["notif", "heart"],
            ["Word is not valid", wordly.heart - 1],
        );
        return;
    }
    if (
        setupGrid({
            wordly,
            setWordly,
        })
    ) {
        return;
    }
    update(setWordly, "guess", "");
    moveNextCell({
        wordly,
        setWordly,
        currentRowIndex: wordly.currentRowIndex,
    });
    console.log(wordly.grid[0], " ", wordly.grid[1], " ", wordly.grid[2]);
};
