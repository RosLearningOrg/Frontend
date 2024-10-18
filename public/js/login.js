const form = document.getElementById("login-form");
const submitBtn = document.getElementById("login-btn");
const loginInput = document.getElementById("login-input");
const passwdInput = document.getElementById("passwd-input");

const API_URL = "http://localhost:8080/api";

const disableBtn = () => {
	submitBtn.disabled = true;
};

const enableBtn = () => {
	submitBtn.disabled = false;
};

const handleInput = () => {
	loginInput.value.length < 1 || passwdInput.value.length < 1
		? disableBtn()
		: enableBtn();
};

const getCSRF = async () => {
	const init = {
		method: "GET",
	};

	const resp = await fetch(API_URL + "/csrf", init);
	const data = await resp.json();
    return data.token
};

const reqLogin = async (csrf) => {
    const init = {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrf
        },
        body: {
            username: loginInput.value,
            password: passwdInput.value
        }
    }

	const resp = await fetch(API_URL + "/login", init);
	const data = await resp.json();
    return data;
}

const login = async (e) => {
    e.preventDefault();
	const csrf = await getCSRF();
    console.log(csrf);
    const data = await reqLogin(csrf);
    console.log(data);
};

loginInput.value = "";
passwdInput.value = "";
disableBtn();

form.onsubmit = login;
loginInput.oninput = handleInput;
passwdInput.oninput = handleInput;
