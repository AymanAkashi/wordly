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
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const [message, setMessage] = useState("");
    const [myInput, setMyInput] = useState("");
    useEffect(() => {
        socket.on("connection", () => {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);
        });
        socket.on("disconnect", () => {
            setIsConnected(false);
        });
        socket.on("message", (data: { user: string; message: string }) => {
            setMessage(`${data.user}: ${data.message}`);
        });
        return () => {
            socket.off("connection");
            socket.off("message");
            // socket.disconnect();
        };
    }, []);

    const handleClick = (e: any) => {
        // socket.emit("click", `clicked ${myInput}`);
        console.log("click");
    };

    return (
        <div className="flex flex-col justify-center items-start">
            Hello World! {isConnected ? "connected" : "disconnected"}{" "}
            {transport}
            <div>{message}</div>
            <label htmlFor="myinput">write message</label>
            <input
                id="myinput"
                type="text"
                value={myInput}
                onChange={(e) => setMyInput(e.target.value)}
                className="text-black bg-white border-2 border-black rounded-2xl px-2 py-1 w-40"
            />
            <button
                type="button"
                title="click me"
                onClick={handleClick}
                className="px-2 bg-yellow-300 rounded-2xl hover:scale-110"
            >
                {" "}
                Click me
            </button>
        </div>
    );
};

export default page;
