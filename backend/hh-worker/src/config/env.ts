import "dotenv/config";

export const env = {
	port: Number(process.env.PORT ?? 3000),
	hhClientId: process.env.HH_CLIENT_ID ?? "",
	hhClientSecret: process.env.HH_CLIENT_SECRET ?? "",
	hhRedirectUri: process.env.HH_REDIRECT_URI ?? "",
	hhUserAgent: process.env.HH_USER_AGENT ?? "",
	hhRefreshToken: process.env.HH_REFRESH_TOKEN ?? "",
	hhAccessToken: process.env.HH_ACCESS_TOKEN || undefined,
	hhDefaultResumeId: process.env.HH_DEFAULT_RESUME_ID || undefined,
	corsOrigin: process.env.CORS_ORIGIN || undefined,
};

const required = [
	"hhClientId",
	"hhClientSecret",
	"hhRedirectUri",
	"hhUserAgent",
	"hhRefreshToken",
] as const;

for (const key of required) {
	if (!env[key]) {
		throw new Error(`Missing ${key} in .env`);
	}
}
