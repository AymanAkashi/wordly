import React from "react";
import { cn } from "@/lib/utils";

const CellError = ({
    error,
    className,
}: {
    error: string;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                `rotate-cell rounded-lg size-12 text-3xl sm:size-16 sm:text-4xl lg:size-20 lg:text-5xl  text-center flex justify-center items-center transition-all delay-75 duration-100 bg-red-500`,
                className
            )}
        >
            {error}
        </div>
    );
};

const errorPage = () => {
    const errorCells = ["E", "R", "R", "O", "R"];
    return (
        <div className="flex flex-col justify-center items-start space-y-2 ">
            <div className="flex justify-center items-center space-x-2">
                {errorCells.map((cell, index) => (
                    <CellError key={index} error={cell} />
                ))}
            </div>
            <div className="flex justify-center items-center space-x-1">
                {["4", "0", "4"].map((cell, index) => (
                    <CellError
                        key={index}
                        error={cell}
                        className="size-8 sm:size-10 lg:size-12 text-xl sm:text-xl lg:text-2xl bg-gray-500"
                    />
                ))}
            </div>
        </div>
    );
};

export default errorPage;
