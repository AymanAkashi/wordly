import React, { useEffect, useState } from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    Button,
    User,
    Avatar,
} from "@nextui-org/react";
import { SignedOut, useClerk } from "@clerk/nextjs";
import DialogPlay from "./dialog-play";
import { useRouter } from "next/navigation";
import DarkMode from "./dark-mode";
import { FiMoon, FiSun } from "react-icons/fi";

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

export default function Menu() {
    const { signOut } = useClerk();
    const router = useRouter();
    const [darkMode, setDarkMode] = React.useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const pressedKeys: { [key: string]: boolean } = {};

    useEffect(() => {
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
        <Dropdown
            showArrow
            radius="sm"
            classNames={{
                base: "before:bg-default-200", // change arrow background
                content:
                    "p-0 border-small border-divider bg-background py-1 bg-gray-200 dark:bg-gray-800 rounded-md shadow-lg dark:shadow-white/15",
            }}
        >
            <DropdownTrigger>
                <Button variant="ghost" disableRipple>
                    <Avatar
                        size="lg"
                        src="https://api.dicebear.com/8.x/lorelei/svg"
                    />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Custom item styles"
                disabledKeys={["profile"]}
                className="p-3"
                itemClasses={{
                    base: [
                        "w-full rounded-md",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-slate-400",
                        "data-[hover=true]:bg-natur",
                        "dark:data-[hover=true]:bg-neutral-900",
                        "data-[selectable=true]:focus:bg-neutral-700",
                        "data-[pressed=true]:opacity-70",
                        "data-[focus-visible=true]:ring-default-500",
                    ],
                }}
            >
                <DropdownSection aria-label="Profile & Actions" showDivider>
                    <DropdownItem
                        isReadOnly
                        key="profile"
                        className="h-14 gap-2 cursor-default"
                    >
                        <User
                            name="Junior Garcia"
                            description="@jrgarciadev"
                            classNames={{
                                name: "text-default-600",
                                description: "text-default-500",
                            }}
                            avatarProps={{
                                size: "sm",
                                src: "https://api.dicebear.com/8.x/lorelei/svg",
                            }}
                        />
                    </DropdownItem>
                    <DropdownItem key="dashboard">
                        <DialogPlay open={open} setOpen={setOpen} />
                    </DropdownItem>
                    <DropdownItem key="settings">Settings</DropdownItem>
                    <DropdownItem
                        key="new_project"
                        endContent={<PlusIcon className="text-large" />}
                    >
                        New Project
                    </DropdownItem>
                </DropdownSection>

                <DropdownSection aria-label="Preferences">
                    <DropdownItem
                        key="theme"
                        className="cursor-pointer"
                        shortcut="⌘⌥D"
                        closeOnSelect={false}
                        onClick={() => {
                            localStorage.setItem(
                                "theme",
                                darkMode ? "light" : "dark"
                            );
                            document.documentElement.classList.toggle("dark");
                            setDarkMode((prev) => !prev);
                        }}
                    >
                        {darkMode != null && darkMode ? (
                            <FiMoon className="h-6 w-6" />
                        ) : (
                            <FiSun className="h-6 w-6" />
                        )}
                    </DropdownItem>
                </DropdownSection>

                <DropdownSection aria-label="Help & Feedback">
                    <DropdownItem key="help_and_feedback">
                        Help & Feedback
                    </DropdownItem>
                    <DropdownItem
                        key="logout"
                        onClick={() => signOut(() => router.push("/"))}
                    >
                        Logout
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}
