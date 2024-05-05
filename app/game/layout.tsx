import { NavBar } from "@/components/navbar";
import React from "react";

const layoutGame = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-full min-h-screen flex justify-between items-center flex-col">
            <NavBar />
            {children}
            <div className="w-full"></div>
        </main>
    );
};

export default layoutGame;
