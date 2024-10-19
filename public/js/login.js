const form = document.getElementById("login-form");
const submitBtn = document.getElementById("login-btn");
const loginInput = document.getElementById("login-input");
const passwdInput = document.getElementById("passwd-input");
const errorMsg = document.getElementById("error-msg");

const API_URL = "http://localhost:8080/api";
const NETWORK_ERROR_MSG = "Произошла ошибка, проверьте ваше интернет-соединение";
const SERVER_ERROR_MSG = "Ошибка сервера, попробуйте повторить попытку позже";
const INVALID_DATA_MSG = "Вы ввели несуществующий логин или пароль, проверьте данные и повторите попытку";

const disableBtn = () => {
	submitBtn.disabled = true;
};

const enableBtn = () => {
	submitBtn.disabled = false;
};

const showErrorMsg = (msg) => {
	errorMsg.innerText = msg;
	errorMsg.setAttribute("data-visible", "true");
};

const hideErrorMsg = () => {
	errorMsg.innerText = "";
	errorMsg.setAttribute("data-visible", "false");
};

const handleInput = () => {
	hideErrorMsg();
	loginInput.value.length < 1 || passwdInput.value.length < 1
		? disableBtn()
		: enableBtn();
};

const getCSRF = async () => {
	const init = {
		method: "GET",
		credentials: "include",
	};

	try {
		const resp = await fetch(API_URL + "/csrf", init);
		const data = await resp.json();
		return data.token;
	} catch {
		return null;
	}
};

const reqLogin = async (csrf) => {
	const body = {
		username: loginInput.value,
		password: passwdInput.value,
	};

	const init = {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			"X-CSRF-TOKEN": csrf,
		},
		body: JSON.stringify(body),
	};

	try {
		const resp = await fetch(API_URL + "/login", init);
		const data = await resp.json();

		if (resp.status == 400) {
			const error = new Error(data.message);
			error.name = "InvalidDataError";
			throw error;
		}

		return data;
	} catch (error) {
		if (error.name == "NetworkError") {
			showErrorMsg(NETWORK_ERROR_MSG);
		}
		if (error.name == "TypeError") {
			showErrorMsg(SERVER_ERROR_MSG);
		}
		if (error.name == "InvalidDataError") {
			showErrorMsg(INVALID_DATA_MSG);
		}

		return null;
	}
};

const getCurrentUser = async () => {
	const init = {
		method: "GET",
		credentials: "include",
	};

	try {
		const resp = await fetch(API_URL + "/current-user", init);
		const data = await resp.json();
		return data;
	} catch {
		return null;
	}
};

const login = async (e) => {
	e.preventDefault();

	const csrf = await getCSRF();
	await reqLogin(csrf);
	const user = await getCurrentUser();

	localStorage.setItem("user", JSON.stringify(user));
    redirect(user);
};

const redirect = (user) => {
	if (user.admin) {
		window.location.replace(window.location.origin + "/admin-courses.html");
	} else {
		window.location.replace(window.location.origin + "/courses.html");
	}
}

(async () => {
    const user = await getCurrentUser();
    if (user) redirect(user);
})();

loginInput.value = "";
passwdInput.value = "";
disableBtn();

form.onsubmit = login;
loginInput.oninput = handleInput;
passwdInput.oninput = handleInput;
