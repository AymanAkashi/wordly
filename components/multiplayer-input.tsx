"use clinet";
import React, { useEffect } from "react";

export const MultiplayerInput = () => {
    useEffect(() => {
        const inputOnline = document.getElementById(
            "online"
        ) as HTMLInputElement;
        const labelOnline = document.getElementById("label-online");
        if (!inputOnline || !labelOnline) return;
        const first = () => {
            inputOnline.checked = true;
            labelOnline.classList.remove("bg-blue-500/20", "text-white/30");
            labelOnline.classList.add(
                "bg-blue-500",
                "text-white",
                "border-blue-300",
                "border-2"
            );
        };

        first();

        return () => {
            inputOnline.checked = false;
        };
    }, []);

    const handleChange = (e: any) => {
        const nameLabel = e.target.id.split("-")[1];
        const input = document.getElementById(nameLabel) as HTMLInputElement;
        const label = document.getElementById(e.target.id) as HTMLElement;
        const otherInput = document.getElementById(
            nameLabel === "online" ? "offline" : "online"
        ) as HTMLInputElement;
        const otherLabel = document.getElementById(
            `label-${nameLabel === "online" ? "offline" : "online"}`
        ) as HTMLElement;
        input.checked = true;
        label.classList.remove("bg-blue-500/20", "text-white/30");
        label.classList.add(
            "bg-blue-500",
            "text-white",
            "border-blue-300",
            "border-2"
        );
        otherInput.checked = false;
        otherLabel.classList.remove(
            "bg-blue-500",
            "text-white",
            "border-blue-300",
            "border-2"
        );
        otherLabel.classList.add("bg-blue-500/20", "text-white/30");
        console.log(nameLabel);
    };

    return (
        <div className="space-x-2 flex justify-start items-center">
            <div className="flex justify-start items-center">
                <label
                    htmlFor="online"
                    id="label-online"
                    className="w-16 h-12  rounded-lg cursor-pointer text-center flex justify-center items-center text-white/30 bg-blue-500/20 select-none"
                    onClick={handleChange}
                >
                    Online
                </label>
                <input
                    checked
                    type="radio"
                    name="online"
                    id="online"
                    className="w-16 h-12"
                    hidden
                />
            </div>
            <div className="flex justify-start items-center">
                <label
                    htmlFor="offline"
                    id="label-offline"
                    className={`w-16 h-12  rounded-lg cursor-pointer text-center flex justify-center items-center text-white/30 bg-blue-500/20 select-none`}
                    onClick={handleChange}
                >
                    Offline
                </label>
                <input
                    type="radio"
                    name="offline"
                    id="offline"
                    className="w-16 h-12"
                    hidden
                />
            </div>
        </div>
    );
};
