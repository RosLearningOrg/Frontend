import { getCSRF, getCurrentUser, logout } from "/public/js/main.js";

const userNameContainer = document.querySelector(".profile-name");

(async () => {
	const csrf = await getCSRF();
	const user = await getCurrentUser();

	if (!user) {
		await logout();
		window.location.replace(window.location.origin + "/login.html");
		return;
	}

    setUserData(user);
	sessionStorage.setItem("csrf", csrf);
	sessionStorage.setItem("user", JSON.stringify(user));
})();

const setUserData = (user) => {
    userNameContainer.innerText = user.name;
}
