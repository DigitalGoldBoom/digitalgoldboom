import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { buildAuthUrl } from "@/lib/pinterest";

// GET /api/pinterest/connect
// Kicks off the one-time OAuth handshake. You visit this once (logged in as the site owner) to
// grant the site access to your Pinterest account. It sends you to Pinterest to approve, then
// Pinterest bounces you back to /api/pinterest/callback with a code.
//
// `state` is a random value we stash in a short-lived cookie and re-check on the way back, so a
// stranger can't forge the callback (standard OAuth CSRF protection).
export async function GET() {
  try {
    const state = randomBytes(16).toString("hex");
    const res = NextResponse.redirect(buildAuthUrl(state));
    res.cookies.set("pinterest_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 10, // 10 minutes — plenty to approve on Pinterest
    });
    return res;
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Pinterest connect failed." },
      { status: 500 },
    );
  }
}
