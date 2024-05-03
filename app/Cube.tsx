"use client";
import React, { useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useMotionValue, useSpring } from "framer-motion";
import { motion } from "framer-motion-3d";

const Cube = () => {
    const mesh = React.useRef(null);
    const option = {
        damping: 20,
    };
    const mouse = {
        x: useSpring(useMotionValue(0), option),
        y: useSpring(useMotionValue(0), option),
    };

    const handleMouseMove = (e: any) => {
        const { innerWidth, innerHeight } = window;
        const { clientX, clientY } = e;
        const x = clientX / innerWidth - 0.5;
        const y = -(clientY / innerHeight - 0.5);
        mouse.x.set(x);
        mouse.y.set(y);
        // console.log(mouse.x.get(), mouse.y.get());
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const textures = [
        useLoader(TextureLoader, "/Group 1.png"),
        useLoader(TextureLoader, "/Group 5.png"),
        useLoader(TextureLoader, "/Group 2.png"),
        useLoader(TextureLoader, "/Group 4.png"),
        useLoader(TextureLoader, "/Group 6.png"),
        useLoader(TextureLoader, "/Group 3.png"),
    ];

    return (
        <motion.mesh ref={mesh} rotation-y={mouse.x} rotation-x={mouse.y}>
            <boxGeometry args={[1, 1, 1]} />
            {textures.map((texture, index) => {
                return (
                    <meshStandardMaterial
                        key={index}
                        map={texture}
                        attach={`material-${index}`}
                    />
                );
            })}
        </motion.mesh>
    );
};

export default Cube;
