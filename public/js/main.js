export const API_URL = "http://localhost:8080/api";

export const getCSRF = async () => {
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

export const getCurrentUser = async () => {
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

export const logout = async () => {
	const init = {
		method: "GET",
		credentials: "include",
	};

	try {
		const resp = await fetch(API_URL + "/logout", init);
		const data = await resp.json();
		return data;
	} catch {
		return null;
	}
};

export const genCourse = async (name) => {
	const init = {
		method: "GET",
		credentials: "include",
	};

	try {
        const resp = await fetch(`http://localhost:8080/generateData?course_name=${name}`, init);
		const data = await resp.json();
		return data;
	} catch {
		return null;
	}
}
