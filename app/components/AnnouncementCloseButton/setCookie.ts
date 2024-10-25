"use server";
import { cookies } from "next/headers";

export async function setCookie(updatedAt: string) {
    const monthInSeconds = 2678400;
    cookies().set("hide-banner", updatedAt, {maxAge: monthInSeconds});
}
