import React from "react";
import DarkMode from "./dark-mode";
import { GiConsoleController } from "react-icons/gi";
import Image from "next/image";
import { GrContact } from "react-icons/gr";
import DialogUi from "@/components/dialog-ui";
import { About, contact } from "@/constants/navbar-constent";

export const NavBar = () => {
    return (
        <nav className=" w-full sm:w-3/5 h-auto flex justify-between items-center bg-gray-300 dark:bg-gray-800 rounded-2xl mt-1 px-1">
            <Image
                src="/logo.png"
                alt="logo"
                width={50}
                height={50}
                className="w-12 h-12 flex items-center justify-center rounded-2xl"
            />
            <div>
                <ul className="flex justify-evenly items-center">
                    <li className="p-4 hover:translate-x-2 hover:-translate-y-2 hover:text-sky-500 cursor-pointer transition-all duration-100 delay-76 sm:inline-block hidden">
                        Play
                    </li>
                    <li className="p-2 hover:translate-x-2 hover:-translate-y-2 hover:text-sky-500 cursor-pointer transition-all duration-100 delay-76 inline-block sm:hidden">
                        <GiConsoleController className="h-8 w-8" />
                    </li>
                    <li className="p-4 hover:translate-x-2 hover:-translate-y-2 hover:text-sky-500 cursor-pointer transition-all duration-100 delay-75">
                        <DialogUi dialogItems={About} />
                    </li>
                    <li className="p-4 hover:translate-x-2 hover:-translate-y-2 hover:text-sky-500 cursor-pointer transition-all duration-100 delay-75">
                        <DialogUi dialogItems={contact} />
                    </li>
                </ul>
            </div>
            <DarkMode />
        </nav>
    );
};
