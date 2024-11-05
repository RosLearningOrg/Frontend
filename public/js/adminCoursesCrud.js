import { API_URL, logout, getCSRF } from "/js/main.js";
import { getAllCourses } from "/js/adminCourses.js";

const addNewCourse = async (name,desc) => {
    const csrf = await getCSRF();
	const init = {
		method: "POST",
        credentials: "include",
        headers: {
			"Content-Type": "application/json",
			"X-CSRF-TOKEN": csrf,
		},
        body: JSON.stringify({
            title: name,
            description: desc,
        }),
	};

	try {
		await fetch(API_URL + "/admin/createCourse", init);
	} catch {
		logout();
	}
};

document.addEventListener("click", (e) => {
    const addCourseBtn = e.target.closest(".add-course-popup-btn");
    if (addCourseBtn) {
        const name = document.querySelector(".add-course-popup-input-name");
        const desc = document.querySelector(".add-course-popup-input-desc");
        addNewCourse(name.value,desc.value)
        getAllCourses();
    }
});