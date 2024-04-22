import { generate } from "random-words";

export const generateWord = (len: number) => {
    return generate({ minLength: len, maxLength: len }).toString();
};
