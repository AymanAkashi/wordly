"use client";
import React from "react";
import Game from "./Game";
import Home from "./Home";

const page = () => {
    const [hide, setHide] = React.useState(false);
    return <>{!hide ? <Home setHide={setHide} /> : <Game mode="1x1" />}</>;
};

export default page;
