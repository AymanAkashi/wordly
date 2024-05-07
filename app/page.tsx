"use client";
import React from "react";
import Game from "./Game";
import Home from "./Home";
import Image from "next/image";

const page = () => {
    return (
        <div className="min-h-screen  bg-gradient-to-bl from-[#557C93] to-[#08203E] w-full flex flex-col justify-between items-center bg-gradient-tr  relative">
            <div className="flex justify-between items-center h-24 w-full z-20 px-2">
                <h1>Logo</h1>
                <div className="flex justify-around items-center space-x-4 mr-6 text-lg sm:text-xl">
                    <button
                        type="button"
                        className="px-2 hover:scale-105 transition-all delay-75 duration-100 hover:text-amber-400"
                    >
                        Home
                    </button>
                    <button
                        type="button"
                        className="px-2 hover:scale-105 transition-all delay-75 duration-100 hover:text-amber-400"
                    >
                        Game
                    </button>
                    <button
                        type="button"
                        className="px-2 hover:scale-105 transition-all delay-75 duration-100 hover:text-amber-400"
                    >
                        Leaderboard
                    </button>
                    <button
                        type="button"
                        className="px-2 hover:scale-105 transition-all delay-75 duration-100 hover:text-amber-400 "
                    >
                        Profile
                    </button>
                </div>
                <div></div>
            </div>
            <img
                src="/draw.svg"
                alt="draw"
                className="fixed z-0 sm:block hidden drop-shadow-lg  -right-[30%] rotate-180 min-h-full w-auto bottom-0 self-end object-cover "
            />
            <Home />
            <div></div>
        </div>
    );
};

export default page;
