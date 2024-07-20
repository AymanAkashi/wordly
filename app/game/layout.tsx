import { NavBar } from "@/components/navbar";
import React from "react";

const layoutGame = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-full min-h-screen flex justify-normal items-center flex-col overflow-hidden">
            <NavBar />
            {children}
        </main>
    );
};

export default layoutGame;
