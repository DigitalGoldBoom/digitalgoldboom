import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeCodeForToken } from "@/lib/pinterest";

// GET /api/pinterest/callback?code=...&state=...
// Pinterest sends you here after you approve. We verify the state, swap the code for tokens, and
// show them so you can paste them into your env (locally in .env.local, and in Vercel → Settings →
// Environment Variables). No database yet, so tokens live in env for now.
// TODO[later]: when Vercel KV exists, store the tokens automatically here instead of displaying them.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.json(
      { message: `Pinterest denied the connection: ${error}` },
      { status: 400 },
    );
  }
  if (!code) {
    return NextResponse.json({ message: "Missing authorization code." }, { status: 400 });
  }

  // CSRF check: the state we sent must match the cookie we set in /connect.
  const cookieStore = await cookies();
  const expected = cookieStore.get("pinterest_oauth_state")?.value;
  if (!expected || expected !== state) {
    return NextResponse.json(
      { message: "State mismatch — start again at /api/pinterest/connect." },
      { status: 400 },
    );
  }

  try {
    const tokens = await exchangeCodeForToken(code);
    // Success — hand the owner the values to paste into env. Plain HTML so it's readable in a browser.
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Pinterest connected</title>
<style>body{font-family:system-ui;max-width:720px;margin:40px auto;padding:0 20px;line-height:1.5}
code{background:#0002;padding:2px 6px;border-radius:6px;word-break:break-all}
.box{background:#0001;border-radius:12px;padding:16px;margin:12px 0}</style></head><body>
<h1>✅ Pinterest connected</h1>
<p>Copy these into your env (<code>.env.local</code> and Vercel → Settings → Environment Variables),
then redeploy. Do <strong>not</strong> share them — they are account secrets.</p>
<div class="box"><strong>PINTEREST_ACCESS_TOKEN</strong><br><code>${escapeHtml(tokens.access_token)}</code></div>
<div class="box"><strong>PINTEREST_REFRESH_TOKEN</strong><br><code>${escapeHtml(tokens.refresh_token ?? "(none returned)")}</code></div>
<p>Scopes granted: <code>${escapeHtml(tokens.scope)}</code> · expires in ${tokens.expires_in}s.</p>
</body></html>`;

    const res = new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
    // Burn the one-time state cookie.
    res.cookies.set("pinterest_oauth_state", "", { path: "/", maxAge: 0 });
    return res;
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Token exchange failed." },
      { status: 500 },
    );
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}
