"use clinet";
import React, { useEffect, useState } from "react";
import { Mode } from "@/lib/types";

export const ModeInput = ({
    selectedMode,
    setSelectedMode,
}: {
    selectedMode: Mode;
    setSelectedMode: React.Dispatch<React.SetStateAction<Mode>>;
}) => {
    const colors = new Map([
        ["easy", "bg-green-500"],
        ["normal", "bg-orange-500"],
        ["hard", "bg-red-500"],
    ]);

    useEffect(() => {
        const first = () => {
            setSelectedMode("normal");
        };

        first();
    }, []);

    const handleChange = (mode: string) => {
        if (mode === "easy" || mode === "normal" || mode === "hard")
            setSelectedMode(mode);
    };

    return (
        <div className="space-x-2 flex justify-start items-center">
            <div
                id="label-easy"
                className={`w-16 h-12 rounded-lg transition-all delay-75 duration-100 cursor-pointer text-center flex justify-center items-center ${
                    selectedMode === "easy"
                        ? `bg-green-500 text-white border-green-300 border-2`
                        : `bg-green-500/20 text-white/30`
                }`}
                onClick={() => handleChange("easy")}
            >
                Easy
            </div>
            <div
                id="label-normal"
                className={`w-16 h-12 rounded-lg transition-all delay-75 duration-100 cursor-pointer text-center flex justify-center items-center ${
                    selectedMode === "normal"
                        ? `bg-orange-500 text-white border-orange-300 border-2`
                        : `bg-orange-500/20 text-white/30`
                }`}
                onClick={() => handleChange("normal")}
            >
                Normal
            </div>
            <div
                id="label-hard"
                className={`w-16 h-12 rounded-lg transition-all delay-75 duration-100 cursor-pointer text-center flex justify-center items-center ${
                    selectedMode === "hard"
                        ? `bg-red-500 text-white border-red-300 border-2`
                        : `bg-red-500/20 text-white/30`
                }`}
                onClick={() => handleChange("hard")}
            >
                Hard
            </div>
        </div>
    );
};
