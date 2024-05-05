"use clinet";
import React, { useEffect, useState } from "react";

export const MultiplayerInput = ({
    setSelectedOption,
    selectedOption,
}: {
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
    selectedOption: string;
}) => {
    useEffect(() => {
        const first = () => {
            setSelectedOption("online");
        };

        first();
    }, []);

    const handleChange = (option: string) => {
        setSelectedOption(option);
        console.log(option);
    };

    return (
        <div className="space-x-2 flex justify-start items-center">
            <div
                id="label-online"
                className={`w-16 h-12 rounded-lg cursor-pointer text-center flex justify-center items-center ${
                    selectedOption === "online"
                        ? "bg-blue-500 text-white border-blue-300 border-2"
                        : "bg-blue-500/20 text-white/30"
                } select-none transition-all delay-75 duration-100`}
                onClick={() => handleChange("online")}
            >
                Online
            </div>
            <div
                id="label-offline"
                className={`w-16 h-12 rounded-lg cursor-pointer text-center flex justify-center items-center ${
                    selectedOption === "offline"
                        ? "bg-blue-500 text-white border-blue-300 border-2"
                        : "bg-blue-500/20 text-white/30"
                } select-none transition-all delay-75 duration-100`}
                onClick={() => handleChange("offline")}
            >
                Offline
            </div>
        </div>
    );
};
