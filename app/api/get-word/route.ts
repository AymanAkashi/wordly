import { NextRequest, NextResponse } from "next/server";
import { generateWord } from "@/actions/generateWord";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        // do something you need to do in the backend
        // (like database operations, etc.)
        const word = await generateWord(5)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return error;
            });
        // socket.emit("message1", "Sync Process Completed");

        return NextResponse.json({ data: word }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error }, { status: 200 });
    }
}
