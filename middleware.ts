import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
    publicRoutes: [
        "/",
        "/auth/sign-in",
        "/auth/sign-up",
        "/auth/verify-email",
        "/api/get-word",
    ],
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
