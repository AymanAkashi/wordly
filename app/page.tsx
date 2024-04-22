"use client";
import React, { useEffect, useState } from "react";
import Cells from "@/components/cells";
import { ErrorDialog } from "@/components/error-dialog";
import { MyCells } from "@/lib/types";
import { generateWord } from "@/constants/generateWord";
import { rows, wordLength } from "@/constants/constent";
import {
    moveNextCell,
    DeleteLetter,
    AddLetter,
} from "@/constants/functionality";

const page = () => {
    const [word, setWord] = useState<string>(generateWord(wordLength));
    console.log("word : ", word);

    const [grid, setGrid] = useState<MyCells[][]>(
        Array.from({ length: rows }, () =>
            Array(wordLength).fill({ key: "", value: "no" })
        )
    );

    const [currentRowIndex, setCurrentRowIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [guess, setGuess] = useState("");
    const [error, setError] = useState("");

    const setupGrid = () => {
        const tmp = word.split("");
        const newGuess = guess.split("");
        console.log("tmp: ", tmp);
        console.log("newGuess: ", newGuess);
        for (let i = 0; i < tmp.length; i++) {
            if (tmp[i] == newGuess[i]) {
                console.log("tmp[i] : ", tmp[i]);
                setGrid((prevGrid) => {
                    const newGrid = [...prevGrid];
                    newGrid[currentRowIndex][i] = {
                        ...newGrid[currentRowIndex][i],
                        value: "yes",
                    };
                    return newGrid;
                });
                tmp[i] = " ";
            }
        }
        console.log("newGuess", newGuess);
        for (let i = 0; i < newGuess.length; i++) {
            if (tmp.includes(newGuess[i])) {
                console.log(
                    "found: ",
                    newGuess[i],
                    "at: ",
                    tmp.indexOf(newGuess[i])
                );
                setGrid((prevGrid) => {
                    const newGrid = [...prevGrid];
                    newGrid[currentRowIndex][i] = {
                        ...newGrid[currentRowIndex][i],
                        value: "check",
                    };
                    return newGrid;
                });
                tmp[tmp.indexOf(newGuess[i])] = " ";
            }
        }
        console.log(grid[0][0]);
    };

    const checkWord = async (word: string) => {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        const response = await fetch(url);
        console.log("response: ", response);

        if (!response.ok) {
            return false;
        } else {
            return true;
        }
    };

    useEffect(() => {
        if (currentRowIndex === rows) {
            return;
        }
        async function handleKeyDown(e: any) {
            if (
                e.keyCode >= 65 &&
                e.keyCode <= 90 &&
                guess.length < wordLength &&
                currentCharIndex < wordLength
            ) {
                const newChar = String.fromCharCode(
                    e.keyCode
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
                if (guess.length !== wordLength) {
                    setError("Word length is not correct");
                    return;
                }
                if (!(await checkWord(guess))) {
                    setError("Word is not correct");
                    return;
                }
                setupGrid();
                setGuess("");
                moveNextCell({
                    currentRowIndex,
                    rows,
                    word,
                    setCurrentRowIndex,
                    setCurrentCharIndex,
                    setError,
                });
            } else if (e.key === "Backspace") {
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
        console.log("currentCharIndex", currentCharIndex);
        console.log("grid: ", grid);
        document.addEventListener("keydown", handleKeyDown);

        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentCharIndex, grid]);

    return (
        <main className="w-full h-full flex flex-col justify-center items-center mt-8">
            <div className="grid grid-cols-5 gap-1 relative">
                {grid.map((row, rowIndex) =>
                    row.map((char, charIndex) => (
                        <>
                            <Cells
                                props={{
                                    rowIndex,
                                    charIndex,
                                    char,
                                    currentRowIndex,
                                }}
                            />
                        </>
                    ))
                )}
                {error && (
                    <div className="absolute inset-0 m-auto z-10 flex justify-center items-center">
                        <ErrorDialog message={error} setError={setError} />
                    </div>
                )}
            </div>
            {guess.length === wordLength &&
                guess.length === wordLength &&
                !error && <span className="text-lg"> Press Enter </span>}
        </main>
    );
};

export default page;
