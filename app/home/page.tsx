import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-4/5 h-full flex justify-center items-center m-auto border">
            {children}
        </div>
    );
};

const GameMode = () => {
    return (
        <div className="grid grid-cols-5 grid-rows-3 gap-2 w-full h-full">
            <div className="col-span-1 row-span-3 border border-yellow-400">
                First Div
            </div>
            {/* Render 9 cells inside the middle div */}
            <div className="col-span-3 row-span-3 border border-yellow-400 grid grid-rows-3 grid-cols-3 gap-2">
                <div className="col-span-1 row-span-1 border border-yellow-400">
                    Cell 1
                </div>
                <div className="col-span-1 row-span-1 border border-yellow-400">
                    Cell 2
                </div>
                <div className="col-span-1 row-span-1 border border-yellow-400">
                    Cell 3
                </div>
                <div className="col-span-1 row-span-1 border border-yellow-400">
                    Cell 4
                </div>
                <div className="col-span-1 row-span-1 border border-yellow-400">
                    Cell 5
                </div>
                <div className="col-span-1 row-span-1 border border-yellow-400">
                    Cell 6
                </div>
                <div className="col-span-1 row-span-1 border border-yellow-400">
                    Cell 7
                </div>
                <div className="col-span-1 row-span-1 border border-yellow-400">
                    Cell 8
                </div>
                <div className="col-span-1 row-span-1 border border-yellow-400">
                    Cell 9
                </div>
            </div>
            <div className="col-span-1 row-span-3 border border-yellow-400">
                Last Div
            </div>
        </div>
    );
};

const page = () => {
    return (
        <Container>
            <GameMode />
        </Container>
    );
};

export default page;
