"use client";
import React, { useState } from "react";
import DarkMode from "./dark-mode";
import Image from "next/image";
import DialogUi from "@/components/dialog-ui";
import { About, contact } from "@/components/navbar-constent";
import DialogPlay from "./dialog-play";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
} from "@nextui-org/react";
import { FaUserAlt } from "react-icons/fa";
import Menu from "./Menu";
import { DialogCustomer } from "./dialog-customer";
import Link from "next/link";

export const NavBar = async () => {
    const [openedDialog, setOpenedDialog] = useState<boolean[]>([
        false,
        false,
        false,
        false,
    ]);
    return (
        <nav className=" w-full sm:w-3/5 h-auto flex justify-between items-center bg-transparent rounded-2xl mt-1 px-1">
            <Link href={"/home"}>
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={50}
                    height={50}
                    className="w-12 h-12 flex items-center justify-center rounded-full"
                />
            </Link>
            <DialogUi
                dialogItems={About}
                open={openedDialog[0]}
                setOpenedDialog={setOpenedDialog}
            />
            <DialogUi
                dialogItems={contact}
                open={openedDialog[1]}
                setOpenedDialog={setOpenedDialog}
            />
            <DialogCustomer
                open={openedDialog[2]}
                setOpenedDialog={setOpenedDialog}
            />
            <Menu setOpenedDialog={setOpenedDialog} />
        </nav>
    );
};
