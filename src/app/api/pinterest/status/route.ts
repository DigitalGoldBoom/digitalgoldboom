import { NextResponse } from "next/server";
import { getUserAccount } from "@/lib/pinterest";

// GET /api/pinterest/status
// Quick "is the Pinterest connection alive?" check. Reads PINTEREST_ACCESS_TOKEN from env and asks
// Pinterest who we are. Visit http://localhost:3000/api/pinterest/status after pasting a token.
//   - connected: true  + your username  => the connection works.
//   - connected: false + a message      => not set up / token expired.
export async function GET() {
  try {
    const account = await getUserAccount();
    return NextResponse.json({ connected: true, account });
  } catch (err) {
    return NextResponse.json(
      { connected: false, message: err instanceof Error ? err.message : "Not connected." },
      { status: 200 },
    );
  }
}
