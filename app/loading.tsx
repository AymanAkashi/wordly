"use client";
import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "@/public/lottiefiles/Loading.json";

const loading = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <Lottie
                animationData={loadingAnimation}
                loop={true}
                autoPlay={true}
            />
        </div>
    );
};

export default loading;
