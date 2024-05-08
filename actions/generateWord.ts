"use server";
import { generate } from "random-words";

export async function generateWord(len: number) {
    const word = generate({ minLength: len, maxLength: len }).toString();
    console.log(`Generated word: ${word}`);
    return word.toString();
}
