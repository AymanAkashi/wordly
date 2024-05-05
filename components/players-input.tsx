"use clinet";
import React, { useEffect, useState } from "react";

export const PlayersInput = ({
    setPlayers,
    Players,
}: {
    setPlayers: React.Dispatch<React.SetStateAction<number>>;
    Players: number;
}) => {
    useEffect(() => {
        const first = () => {
            setPlayers(2);
        };

        first();
    }, []);

    const handleChange = (Players: number) => {
        setPlayers(Players);
        console.log(Players);
    };

    return (
        <div className="space-x-2 flex justify-start items-center">
            <div
                id="player-2"
                className={`w-auto px-2 h-12 rounded-lg cursor-pointer text-center flex justify-center items-center ${
                    Players === 2
                        ? "bg-sky-500 text-white border-sky-300 border-2"
                        : "bg-sky-500/20 text-white/30"
                } select-none transition-all delay-75 duration-100`}
                onClick={() => handleChange(2)}
            >
                2 Players
            </div>
            <div
                id="player-3"
                className={`w-auto px-2 h-12 rounded-lg cursor-pointer text-center flex justify-center items-center ${
                    Players === 3
                        ? "bg-sky-500 text-white border-sky-300 border-2"
                        : "bg-sky-500/20 text-white/30"
                } select-none transition-all delay-75 duration-100`}
                onClick={() => handleChange(3)}
            >
                3 Players
            </div>
            <div
                id="player-4"
                className={`w-auto px-2 h-12 rounded-lg cursor-pointer text-center flex justify-center items-center ${
                    Players === 4
                        ? "bg-sky-500 text-white border-sky-300 border-2"
                        : "bg-sky-500/20 text-white/30"
                } select-none transition-all delay-75 duration-100`}
                onClick={() => handleChange(4)}
            >
                4 Players
            </div>
        </div>
    );
};
