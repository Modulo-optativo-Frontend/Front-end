const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

export function getAuthToken() {
	return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
	if (token) {
		localStorage.setItem(TOKEN_KEY, token);
	} else {
		localStorage.removeItem(TOKEN_KEY);
	}
}

export function setAuthUser(user) {
	if (user) {
		localStorage.setItem(USER_KEY, JSON.stringify(user));
	} else {
		localStorage.removeItem(USER_KEY);
	}
}

export function getAuthUser() {
	const raw = localStorage.getItem(USER_KEY);
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

export function clearAuth() {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
}

