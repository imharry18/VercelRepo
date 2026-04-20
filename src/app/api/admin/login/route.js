import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createAdminSessionToken, getAdminSessionCookieName } from "@/lib/adminAuth";

export async function POST(request) {
  try {
    const { password } = await request.json();
    const rawHash = process.env.ADMIN_PASSWORD_HASH;

    if (!rawHash) {
      return NextResponse.json({ success: false }, { status: 500 });
    }

    const passwordHash = rawHash.trim().replace(/^['"]|['"]$/g, "").replace(/\\\\/g, "");
    const passwordValue = typeof password === "string" ? password.trim() : "";
    
    console.log("---- DEBUG LOGIN ----");
    console.log("Raw Hash from ENV:", rawHash);
    console.log("Cleaned Hash:", passwordHash);
    console.log("Password entered:", passwordValue);
    
    const isValid = await bcrypt.compare(passwordValue, passwordHash);
    console.log("Is Valid Password?", isValid);
    console.log("---------------------");

    if (isValid) {
      const token = createAdminSessionToken();
      if (!token) {
        return NextResponse.json({ success: false }, { status: 500 });
      }

      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: getAdminSessionCookieName(),
        value: token,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });

      return response;
    } else {
      return NextResponse.json({ success: false }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
