import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { RecIcon } from "@/components/rec-icon";

const Home = () => {
    return (
        <div
            className={`w-full min-h-[calc(100vh-96px)] mt-20 flex md:flex-row flex-col justify-center items-center overflow-x-hidden px-12 absolute inset-0 z-20`}
            id="home"
        >
            <div className="w-full md:w-1/2 h-full flex justify-center items-center relative ">
                <div className="flex ml-[20%] flex-col justify-center items-start border-l-8 border-white pl-4 ">
                    <h1 className="ml-6 px-1 py-2 bg-[linear-gradient(90deg,#858585_20%,#FB923C_20%_50%,#4ADE80_50%)] text-7xl">
                        {" "}
                        Worldy
                    </h1>
                    <h4 className="w-full md:w-3/4 text-wrap text-4xl">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s
                    </h4>
                    <Link
                        href={"/home"}
                        title="Play Now"
                        className="ml-[25%] my-4 bg-amber-400 px-2 py-1 rounded-xl border-2 border-black text-2xl hover:bg-amber-500 transition-all delay-75 duration-100 outline-dashed bg-size-200hover:text-black hover:outline-4" // TODO: add animation to this button
                    >
                        Play Now
                    </Link>
                    <div className="size-48 absolute bg-amber-400 rotate-45 -z-10 inset-x-4 animate-[bounce-rotate_ease-in-out_2s_infinite]" />
                    <div className="size-48 absolute outline-dashed outline-4 outline-amber-400 rotate-45 -z-10 inset-x-0 animate-[bounce-rotate_ease-in-out_1.5s_infinite]" />
                    <div className="absolute -left-[5%] bottom-[12%] -z-20">
                        <RecIcon />
                    </div>
                    <div className="absolute left-0 bottom-[25%] -z-20">
                        <RecIcon />
                    </div>
                    <div className="absolute left-[15%] bottom-[20%] -z-20">
                        <RecIcon />
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center relative  h-full ">
                <video
                    id="video"
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    className="rounded-xl shadow-[0_40px_40px_-8px_#00000022] dark:shadow-[0_40px_40px_-8px_#ffffff11]"
                    style={{
                        animation: "rotate-vd 1.5s linear forwards",
                        width: "80%",
                        maxWidth: "500px",
                    }}
                >
                    <source src="/screen.mp4" type="video/mp4" />
                    your browser does not support the video tag
                </video>
                <div className="absolute -right-[5%] top-[12%] -z-20">
                    <RecIcon />
                </div>
                <div className="absolute right-0 top-[25%] -z-20">
                    <RecIcon />
                </div>
                <div className="absolute right-[15%] top-[20%] -z-20">
                    <RecIcon />
                </div>
            </div>
        </div>
    );
};

export default Home;
