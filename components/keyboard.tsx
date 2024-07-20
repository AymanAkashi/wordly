import { update } from "@/app/Game";
import { rows, wordLength } from "@/constants/constent";
import {
    AddLetter,
    DeleteLetter,
    handleWord,
    moveNextCell,
} from "@/constants/functionality";
import { setupGrid } from "@/constants/setup-game";
import { validWord } from "@/constants/valid-word";
import { GameContext } from "@/context/ContextProvider";
import { cn } from "@/lib/utils";
import React, { useContext } from "react";

const Keyboard = ({ mode }: { mode: string }) => {
    const { wordly, setWordly } = useContext(GameContext);

    const handleClick = (e: any) => {
        if (wordly.timer === -1)
            update(
                setWordly,
                "timer",
                mode === "1x1" ? 60 : mode === "1x2" ? 120 : 180,
            );
        if (wordly.game !== "on") return;
        const newChar = e.target.innerText.toLowerCase();
        if (wordly.guess.length >= wordLength) {
            return;
        }
        AddLetter({
            wordly,
            setWordly,
            newChar,
        });
    };
    const handleEnter = () => {
        if (wordly.game !== "on") return;
        handleWord({
            wordly,
            setWordly,
            validWord,
        });
    };
    const handleDelete = () => {
        if (wordly.game !== "on") return;
        DeleteLetter({
            wordly,
            setWordly,
        });
    };

    const kbdStyle =
        "cursor-pointer hover:scale-90 capitalize font-sans text-lg p-1 sm:rounded-md shadow-sm  transition-all duration-100 delay-75 hover:shadow-lg hover:bg-sky-500 hover:text-white dark:text-white select-none text-black  flex justify-center items-center border-b-2 border-gray-800/50 border-[0.5px] w-7 py-3 text-sm rounded-sm sm:w-12 sm:text-md xl:w-14 xl:text-lg h-auto";
    return (
        <div className="flex flex-col justify-normal items-center w-full">
            <div className="flex justify-center gap-1 my-1">
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-q">
                    q
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-w">
                    w
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-e">
                    e
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-r">
                    r
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-t">
                    t
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-y">
                    y
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-u">
                    u
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-i">
                    i
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-o">
                    o
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-p">
                    p
                </kbd>
            </div>
            <div className="flex justify-center gap-1 my-1 w-full">
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-a">
                    a
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-s">
                    s
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-d">
                    d
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-f">
                    f
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-g">
                    g
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-h">
                    h
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-j">
                    j
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-k">
                    k
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-l">
                    l
                </kbd>
                <kbd
                    className={cn(
                        kbdStyle,
                        "min-w-auto px-8 border-b-2 border-gray-800/50",
                    )}
                    onClick={handleEnter}
                    id="kbd-enter"
                >
                    ↲
                </kbd>
            </div>
            <div className="flex justify-center gap-1 my-1 w-full">
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-z">
                    z
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-x">
                    x
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-c">
                    c
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-v">
                    v
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-b">
                    b
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-n">
                    n
                </kbd>
                <kbd className={kbdStyle} onClick={handleClick} id="kbd-m">
                    m
                </kbd>
                <kbd
                    className={cn(
                        kbdStyle,
                        "border-b-2 border-gray-800/50 w-10",
                    )}
                    onClick={handleDelete}
                    id="kbd-delete"
                >
                    {"    "}⌫{"   "}
                </kbd>
            </div>
        </div>
    );
};

export default Keyboard;
