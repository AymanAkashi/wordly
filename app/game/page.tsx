import React from "react";
import Game from "../Game";
import { NavBar } from "@/components/navbar";

const pageGame = async () => {
    // const user = fetch("/get-user")
    //     .then((res) => res.json())
    //     .then((data) => console.log(data));
    // console.log(user);
    return <Game mode="1x1" />;
};

export default pageGame;
