import { Navigate, useLocation } from "react-router-dom";
import { getAuthToken, getAuthUser, isAdminUser } from "../../lib/auth.js";

export function ProtectedRoute({ children, adminOnly = false }) {
	const location = useLocation();
	const authToken = getAuthToken();
	const user = getAuthUser();

	if (!authToken) {
		return (
			<Navigate
				to="/login"
				replace
				state={{ from: location.pathname }}
			/>
		);
	}

	if (adminOnly && !isAdminUser(user)) {
		return (
			<Navigate
				to="/dashboard"
				replace
			/>
		);
	}

	return children;
}
