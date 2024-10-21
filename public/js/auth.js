import { getCSRF, getCurrentUser, logout } from "/public/js/main.js";

(async () => {
	const csrf = await getCSRF();
	const user = await getCurrentUser();

	if (!user) {
		await logout();
		window.location.replace(window.location.origin + "/login.html");
		return;
	}

	sessionStorage.setItem("csrf", csrf);
	sessionStorage.setItem("user", JSON.stringify(user));
})();
