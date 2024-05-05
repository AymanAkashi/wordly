import Link from "next/link";
import React from "react";

const pageHome = () => {
    if (typeof window !== "undefined") {
        // document.getElementById("video")?.play();
        // document.querySelector("video")?.playbackRate = 1.5;
    }
    return (
        <div className="w-full sm:max-w-[1000px] flex justify-center items-center  h-[800px] px-4">
            <div className="w-1/2 relative flex justify-center items-center h-full">
                <div className="absolute animate-pulse -translate-x-6  outline-4 outline-dotted outline-sky-500 rounded-xl rotate-45 size-80"></div>
                <div className="absolute  bg-gradient-to-tr dark:bg-gradient-to-br from-sky-500 to-80%  to-sky-950 rotate-45  rounded-xl  size-80 animate-[bounce-rotate_2s_linear_infinite] "></div>
                <div className="absolute  w-52 text-5xl border-l-2 border-sky-200/50 pl-4 ">
                    Challange <br /> Your <br /> Limits <br />
                    <Link
                        href="/game"
                        passHref
                        type="button"
                        title="start game"
                        className=" py-1 px-4 rounded-2xl  bg-gradient-to-t from-emerald-600 via-green-400 to-teal-700 bg-size-200 bg-pos-100 hover:scale-105 transition-all duration-100 delay-75 hover:bg-pos-0  text-2xl"
                    >
                        Start Now
                    </Link>
                </div>
                <div className="absolute w-1/2 h-8 bg-gray-600/50 rounded-full blur-md bottom-[15%] animate-[bounce_2s_linear_infinite]"></div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
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
            </div>
        </div>
    );
};

export default pageHome;
