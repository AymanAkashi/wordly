"use client";
import React, { useEffect } from "react";
import Cells from "@/components/cells";
import { Image } from "@nextui-org/react";
import { generateWord } from "@/constants/generateWord";

const Home = ({ setHide }: { setHide: (hide: boolean) => void }) => {
    const generate = () => {
        const ret: { word: string; value: string }[] = [];
        const values = ["yes", "no", "check"];
        const alphabets = generateWord(6);
        for (let i = 0; i < 6; i++) {
            ret.push({
                word: alphabets[i],
                value: values[Math.floor(Math.random() * values.length)],
            });
        }
        return ret;
    };

    const [word, setWord] = React.useState<{ word: string; value: string }[]>(
        generate()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setWord(generate());
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`w-full min-h-screen flex justify-center items-center px-12 absolute inset-0 z-50 bg-black`}
            id="home"
        >
            <div className="flex-col justify-center items-start flex space-y-4 w-auto sm:w-3/5 m-auto ">
                <h1 className="text-6xl font-bold">Test Your Vocabulary </h1>
                <h1 className="text-5xl font-bold">Skills!</h1>
                <div className="flex justify-center items-center space-x-1">
                    <Cells
                        props={{
                            rowIndex: 0,
                            charIndex: 0,
                            char: { key: word[0].word, value: word[0].value },
                            currentRowIndex: 0,
                        }}
                    />
                    <Cells
                        props={{
                            rowIndex: 0,
                            charIndex: 0,
                            char: { key: word[1].word, value: word[1].value },
                            currentRowIndex: 0,
                        }}
                    />
                    <Cells
                        props={{
                            rowIndex: 0,
                            charIndex: 0,
                            char: { key: word[2].word, value: word[2].value },
                            currentRowIndex: 0,
                        }}
                    />
                    <Cells
                        props={{
                            rowIndex: 0,
                            charIndex: 0,
                            char: { key: word[3].word, value: word[3].value },
                            currentRowIndex: 0,
                        }}
                    />
                    <Cells
                        props={{
                            rowIndex: 0,
                            charIndex: 0,
                            char: { key: word[4].word, value: word[4].value },
                            currentRowIndex: 0,
                        }}
                    />
                    <Cells
                        props={{
                            rowIndex: 0,
                            charIndex: 0,
                            char: { key: word[5].word, value: word[5].value },
                            currentRowIndex: 0,
                        }}
                    />
                </div>
                <p className="text-lg font-mono text-clip indent-12">
                    Improve your vocabulary by playing this game. You will be
                    given a word and you have to guess the word by typing the
                    correct word. You can also delete the word by pressing the
                    backspace key.
                </p>
                <div className="w-full grid place-content-center ">
                    <button
                        className="bg-orange-500 hover:bg-green-500 transition-all delay-75 duration-100 text-white px-4 py-2 mt-4 rounded-md flex-auto"
                        onClick={() => {
                            setHide(true);
                        }}
                    >
                        Click meee
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
