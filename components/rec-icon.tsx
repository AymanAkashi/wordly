"use client";
import { useEffect, useState } from "react";

export const RecIcon = ({
    color = "#FFBF00",
    size = 56,
}: {
    color?: string;
    size?: number;
}) => {
    const palette = ["#FFBF00", "#858585", "#FB923C", "#4ADE80"];
    const [colors, setColors] = useState(
        Array.from(
            { length: 9 },
            () => palette[Math.floor(Math.random() * palette.length)],
        ),
    );
    useEffect(() => {
        const interval = setInterval(() => {
            setColors((colors) => {
                return colors.map((_, i) => (colors[i] = generateColor()));
            });
            console.log("colors cchanged");
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const generateColor = () => {
        return palette[Math.floor(Math.random() * palette.length)];
    };
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 56 56"
            fill="none"
        >
            <rect width="14" height="14" rx="4" fill={colors[0]} />
            <rect x="21" width="14" height="14" rx="4" fill={colors[1]} />
            <rect x="42" width="14" height="14" rx="4" fill={colors[2]} />
            <rect y="21" width="14" height="14" rx="4" fill={colors[3]} />
            <rect
                x="21"
                y="21"
                width="14"
                height="14"
                rx="4"
                fill={colors[4]}
            />
            <rect
                x="42"
                y="21"
                width="14"
                height="14"
                rx="4"
                fill={colors[5]}
            />
            <rect
                x="42"
                y="42"
                width="14"
                height="14"
                rx="4"
                fill={colors[6]}
            />
            <rect
                x="21"
                y="42"
                width="14"
                height="14"
                rx="4"
                fill={colors[7]}
            />
            <rect y="42" width="14" height="14" rx="4" fill={colors[8]} />
        </svg>
    );
};
