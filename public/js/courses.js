import { API_URL } from "/js/main.js";

const getUserCourses = async () => {
	const init = {
		method: "GET",
		credentials: "include",
		headers: {
			"X-CSRF-TOKEN": sessionStorage.getItem("csrf"),
		},
	};

	try {
        const resp = await fetch(API_URL + "/user/getUserCourses", init)
        const data = await resp.json();
        console.log(data)
	} catch {
        return null;
	}
};

(async () => {
    await getUserCourses();
})();
