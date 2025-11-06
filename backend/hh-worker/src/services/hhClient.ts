import { Common, Applicant, setHttpConfig } from "node-hhru-api";
import type { ApplicantTypes, VacancySearchParams } from "node-hhru-api";
import { env } from "../config/env.js";

setHttpConfig({
	userAgent: env.hhUserAgent,
});

type TokenState = {
	accessToken: string | null;
	refreshToken: string;
	expiresAt?: number;
};

const tokenState: TokenState = {
	accessToken: env.hhAccessToken ?? null,
	refreshToken: env.hhRefreshToken,
};

function isTokenValid(): boolean {
	if (!tokenState.accessToken) return false;
	if (!tokenState.expiresAt) return true;
	return tokenState.expiresAt - Date.now() > 5_000;
}

export function setTokens({
	accessToken,
	refreshToken,
	expiresIn,
}: {
	accessToken: string;
	refreshToken?: string;
	expiresIn?: number;
}) {
	tokenState.accessToken = accessToken;
	if (refreshToken) {
		tokenState.refreshToken = refreshToken;
	}
	if (expiresIn) {
		tokenState.expiresAt = Date.now() + expiresIn * 1000;
	}
}

export async function refreshAccessToken(): Promise<string> {
	const response = await Common.refreshUserToken(
		env.hhClientId,
		env.hhClientSecret,
		tokenState.refreshToken,
	);

	setTokens({
		accessToken: response.access_token,
		refreshToken: response.refresh_token,
		expiresIn: response.expires_in,
	});

	return response.access_token;
}

export async function getAccessToken(): Promise<string> {
	if (isTokenValid()) {
		return tokenState.accessToken as string;
	}
	return refreshAccessToken();
}

export async function searchVacancies(query: Partial<VacancySearchParams>) {
	const token = await getAccessToken();
	return Common.searchVacancies(token, query);
}

export async function getMyResumes() {
	const token = await getAccessToken();
	return Applicant.getMyResumes(token);
}

export async function applyVacancy(payload: ApplicantTypes.ApplyVacancyBody) {
	const token = await getAccessToken();
	return Applicant.applyVacancy(token, payload);
}

export const hhClient = {
	getAccessToken,
	refreshAccessToken,
	searchVacancies,
	getMyResumes,
	applyVacancy,
	setTokens,
};

export type HHClient = typeof hhClient;
