import { API_URL } from "/js/main.js";

const getUserCourses = async () => {
	const init = {
		method: "GET",
		credentials: "include",
	};

	try {
        const resp = await fetch(API_URL + "/getUserCourses", init)
        const data = await resp.json();
        console.log(data)
	} catch {
        return null;
	}
};

(async () => {
    await getUserCourses();
})();
