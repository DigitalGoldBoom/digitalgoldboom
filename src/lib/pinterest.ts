// Pinterest API v5 OAuth helpers (server-only). Docs: https://developers.pinterest.com/docs/api/v5/
//
// Flow (Authorization Code grant — the only grant that unlocks the full API):
//   1. Send the user to Pinterest's authorize page  -> buildAuthUrl()
//   2. Pinterest redirects back with ?code=...       -> handled in /api/pinterest/callback
//   3. Exchange that code for an access token         -> exchangeCodeForToken()
//   4. When the token expires, swap the refresh token -> refreshAccessToken()
//
// Auth to the token endpoint is HTTP Basic: base64("<appId>:<appSecret>"). Never send the secret
// to the browser — every function here runs on the server only.

const AUTHORIZE_URL = "https://www.pinterest.com/oauth/";
const TOKEN_URL = "https://api.pinterest.com/v5/oauth/token";
export const PINTEREST_API_BASE = "https://api.pinterest.com/v5";

export type PinterestTokens = {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number; // seconds
  scope: string;
};

/** Read the app credentials from env, or throw a clear error if the site isn't configured yet. */
function requireCreds(): { appId: string; appSecret: string; redirectUri: string } {
  const appId = process.env.PINTEREST_APP_ID;
  const appSecret = process.env.PINTEREST_APP_SECRET;
  const redirectUri = process.env.PINTEREST_REDIRECT_URI;
  if (!appId || !appSecret || !redirectUri) {
    throw new Error(
      "Pinterest is not configured. Set PINTEREST_APP_ID, PINTEREST_APP_SECRET and " +
        "PINTEREST_REDIRECT_URI (see .env.example).",
    );
  }
  return { appId, appSecret, redirectUri };
}

/** Step 1 — the Pinterest page we send the user to. `state` is our CSRF guard (verified on return). */
export function buildAuthUrl(state: string): string {
  const { appId, redirectUri } = requireCreds();
  const scopes = process.env.PINTEREST_SCOPES ?? "user_accounts:read,boards:read,pins:read";
  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    response_type: "code",
    // Pinterest wants scopes comma-separated; tolerate spaces in the env value.
    scope: scopes.replace(/\s+/g, ""),
    state,
  });
  return `${AUTHORIZE_URL}?${params.toString()}`;
}

function basicAuthHeader(appId: string, appSecret: string): string {
  return "Basic " + Buffer.from(`${appId}:${appSecret}`).toString("base64");
}

/** Step 3 — trade the one-time authorization code for a real access token. */
export async function exchangeCodeForToken(code: string): Promise<PinterestTokens> {
  const { appId, appSecret, redirectUri } = requireCreds();
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(appId, appSecret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });
  if (!res.ok) {
    throw new Error(`Pinterest token exchange failed (${res.status}): ${await res.text()}`);
  }
  return (await res.json()) as PinterestTokens;
}

/** Step 4 — get a fresh access token using the long-lived refresh token. */
export async function refreshAccessToken(refreshToken: string): Promise<PinterestTokens> {
  const { appId, appSecret } = requireCreds();
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(appId, appSecret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
  });
  if (!res.ok) {
    throw new Error(`Pinterest token refresh failed (${res.status}): ${await res.text()}`);
  }
  return (await res.json()) as PinterestTokens;
}

/** Sanity check the connection: fetch the connected account. Uses env token unless one is passed. */
export async function getUserAccount(accessToken = process.env.PINTEREST_ACCESS_TOKEN) {
  if (!accessToken) throw new Error("No Pinterest access token. Run the connect flow first.");
  const res = await fetch(`${PINTEREST_API_BASE}/user_account`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(`Pinterest user_account failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}
