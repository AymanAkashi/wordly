"use client";
import Game from "@/app/Game";
import React, { useContext, useEffect, useState } from "react";
import { User } from "@clerk/nextjs/server";
import { getUser } from "@/actions/getUser";
import { generate } from "random-words";
import GameMode from "./GameMode";
import { userType } from "@/lib/types";
import { GameContext } from "@/context/ContextProvider";
import { useRouter } from "next/navigation";

const page = ({ params }: { params: { mode: string } }) => {
    const { socket } = useContext(GameContext);
    const { mode } = params;

    if (mode.length > 3 || !RegExp(/[1-4]x[1-4]/).test(mode)) {
        return <div className="text-4xl text-red-500 ">Invalid Game Mode</div>;
    }
    if (mode.startsWith("1")) {
        return <Game mode={mode} />;
    }
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const [message, setMessage] = useState("");
    const [myInput, setMyInput] = useState("");
    const [word, setWord] = useState("");
    const [users, setUsers] = useState<userType[]>([]);
    const [room, setRoom] = useState<string>("");
    const [waiting, setWaiting] = useState<string[]>([]);
    useEffect(() => {
        const leavingGame = () => {
            if (confirm("Are you sure you want to leave the game?")) {
                socket.emit("leave-room", { room });
                router.push("/home");
            }
        };
        console.log("leaving game");
        window.addEventListener("beforeunload", leavingGame);
        if (!user) {
            getUser()
                .then((data) => JSON.parse(data))
                .then(setUser);
            return;
        }
        socket.emit("join", {
            name: user.username || user.fullName || user.firstName,
            mode: mode,
            avatar: user.imageUrl,
        });
        socket.on("joined", (data) => {
            console.log("data was recv: ", data);
            const { players, room, word } = data;
            setUsers(players);
            setRoom(room);
            setTimeout(() => {
                setWord(word);
            }, 5000);
        });

        setTimeout(() => {
            let word = generate().toString();
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then((res) => res.json())
                .then((data) => {
                    setWaiting((prev: string[]) => {
                        const newData = [...prev];
                        newData.push(data[0].word);
                        newData.push(
                            data[0].meanings[0].definitions[0].definition,
                        );
                        return newData;
                    });
                }),
                1000;
        });

        return () => {
            window.removeEventListener("beforeunload", leavingGame);
            socket.off("join");
            socket.off("start");
            socket.off("leave-room");
            socket.off("joined");
        };
    }, [user]);

    return (
        <>
            {word ? (
                <GameMode
                    mode={mode}
                    newWord={word}
                    socket={socket}
                    room={room}
                    name={
                        user?.username ||
                        user?.fullName ||
                        user?.firstName ||
                        ""
                    }
                    avatar={user?.imageUrl || ""}
                />
            ) : (
                <div className="flex flex-col justify-center items-center space-y-4 w-full">
                    <div className="text-4xl">Game Mode: {mode}</div>
                    <div className="grid grid-cols-2 grid-flow-dense gap-2 w-1/2 place-content-center">
                        {users.length >= 1 &&
                            users.map((user, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col justify-center items-center"
                                >
                                    <img
                                        src={
                                            user.avatar ||
                                            "https://www.gravatar.com/avatar/"
                                        }
                                        alt={"avatar of " + user.user}
                                        className="w-20 h-20 rounded-full"
                                    />
                                    <div className="text-xl font-serif">
                                        {user.user}
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="font-mono">waiting other players...</div>
                    {waiting.length > 1 && (
                        <div className="flex flex-col justify-center items-center animate-fading-up w-1/2">
                            <div className="text-4xl">{waiting[0]}</div>
                            <div className="text-3xl font-serif">
                                {waiting[1]}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default page;
