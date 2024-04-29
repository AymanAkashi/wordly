import React from "react";

const layoutAuth = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            {children}
        </div>
    );
};

export default layoutAuth;
