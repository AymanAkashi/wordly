import { NextRequest, NextResponse } from "next/server";

import { socket } from "@/client/client-io";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        // do something you need to do in the backend
        // (like database operations, etc.)

        console.log("Sync Process Started");
        socket.emit("message1", "Sync Process Completed");

        return NextResponse.json({ data: "Success" }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error }, { status: 200 });
    }
}
