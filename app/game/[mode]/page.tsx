"use client";
import Game from "@/app/Game";
import React, { useEffect, useState } from "react";
import { socket } from "@/client/client-io";

const page = ({ params }: { params: { mode: string } }) => {
    const { mode } = params;

    if (mode.length > 3 || !RegExp(/[1-4]x[1-4]/).test(mode)) {
        return <div className="text-4xl text-red-500 ">Invalid Game Mode</div>;
    }
    if (mode.startsWith("1")) {
        return <Game mode={mode} />;
    }
    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        async function onConnect() {
            console.log("connected");
            socket.emit("game", { mode });
            const data = await fetch(`/api/matching`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: socket.id,
                    name: "player",
                    status: "join",
                    typeGame: "single",
                    multiPlayer: mode,
                    Players: socket.id,
                }),
            });
            console.log(data.json());
        }

        function onDisconnect() {}

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);
    return <div>Hello World!</div>;
};

export default page;
