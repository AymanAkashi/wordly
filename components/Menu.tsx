"use client";
import React, { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HiOutlineStatusOffline, HiOutlineStatusOnline } from "react-icons/hi";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FiMoon, FiSun } from "react-icons/fi";
import { Avatar } from "@nextui-org/react";
import {
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Plus,
    PlusCircle,
    CircleUser,
    Contact,
    Gamepad2,
} from "lucide-react";
import { getUser } from "@/actions/getUser";
import { User } from "@clerk/nextjs/server";

const PlusIcon = (props: any) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
    >
        <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        >
            <path d="M6 12h12" />
            <path d="M12 18V6" />
        </g>
    </svg>
);

export default function Menu({
    setOpenedDialog,
}: {
    setOpenedDialog: React.Dispatch<React.SetStateAction<boolean[]>>;
}) {
    const router = useRouter();
    const [darkMode, setDarkMode] = React.useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const pressedKeys: { [key: string]: boolean } = {};
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        if (!user) {
            getUser()
                .then((data) => {
                    return JSON.parse(data);
                })
                .then((data) => {
                    setUser(data);
                });
        }
        window.addEventListener("keydown", (event) => {
            if (pressedKeys[event.key]) return;
            pressedKeys[event.key] = true;
            console.log(event.key);
            if (
                event.key === "∂" || // Mac
                (event.key === "D" && pressedKeys["Meta"]) || // Mac
                (event.key === "D" && pressedKeys["Control"]) // Windows
            ) {
                console.log("pressed");
                localStorage.setItem("theme", darkMode ? "light" : "dark");
                document.documentElement.classList.toggle("dark");
                setDarkMode((prev) => !prev);
            }
        });

        window.addEventListener("keyup", (event) => {
            delete pressedKeys[event.key];
        });
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                className="cursor-pointer select-none border border-amber-400 hover:border-2 transition-all delay-75 duration-100 border-collapse"
            >
                <Avatar
                    src={
                        user == null
                            ? `https://avatars.githubusercontent.com/u/45667409?v=4`
                            : user.imageUrl
                    }
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="text-xl color-change">
                    {!user
                        ? "Loading..."
                        : user && user.firstName != null
                          ? `${user.firstName} ${user.lastName}`
                          : user.username}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                        <CircleUser className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <Keyboard className="mr-2 h-4 w-4" />
                        <span>Keyboard shortcuts</span>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer">
                            <Gamepad2 className="mr-2 h-4 w-4" />
                            <span>New Game</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem
                                    onClick={() => {
                                        router.push("/game/1x1"); // Loading get Default setting game
                                    }}
                                    className="cursor-pointer"
                                >
                                    <HiOutlineStatusOffline className="mr-2 h-4 w-4" />
                                    <span>offline</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        router.push("/game/2x1"); // get Default setting game
                                    }}
                                    className="cursor-pointer"
                                >
                                    <HiOutlineStatusOnline className="mr-2 h-4 w-4" />
                                    <span>online</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setOpenedDialog((prev: boolean[]) => {
                                            const newState = [...prev];
                                            newState[2] = true;
                                            return newState;
                                        });
                                    }}
                                >
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    <span>More...</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                            setOpenedDialog((prev: boolean[]) => {
                                const newState = [...prev];
                                newState[2] = true;
                                return newState;
                            });
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Customer Game</span>
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    key="theme"
                    className="cursor-pointer"
                    onClick={() => {
                        localStorage.setItem(
                            "theme",
                            darkMode ? "light" : "dark",
                        );
                        document.documentElement.classList.toggle("dark");
                        setDarkMode((prev) => !prev);
                    }}
                >
                    {darkMode != null && darkMode ? (
                        <FiMoon className="mr-2 h-4 w-4" />
                    ) : (
                        <FiSun className="mr-2 h-4 w-4" />
                    )}
                    <span>Dark Mode</span>
                    <DropdownMenuShortcut>⌘⌥D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer">
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                        console.log("clicked");
                        setOpenedDialog((prev: boolean[]) => {
                            const newState = [...prev];
                            newState[0] = true;
                            return newState;
                        });
                    }}
                >
                    <Contact className="mr-2 h-4 w-4" />
                    <span>About</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                        console.log("clicked");
                        setOpenedDialog((prev: boolean[]) => {
                            const newState = [...prev];
                            newState[1] = true;
                            return newState;
                        });
                    }}
                >
                    <Contact className="mr-2 h-4 w-4" />
                    <span>Contact</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                        router.push("https://www.github.com/AymanAkashi");
                    }}
                >
                    <Github className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <SignOutButton>Log out</SignOutButton>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
