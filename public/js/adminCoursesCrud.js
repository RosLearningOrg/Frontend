import { API_URL, logout, getCSRF } from "/js/main.js";
import { getAllCourses } from "/js/adminCourses.js";
import { closeAddPopup } from "/js/adminCoursesPopups.js";

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

const deleteNewCourse = async (name,desc) => {
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

const addCourseBtn = document.querySelector(".add-course-popup-btn");
addCourseBtn.addEventListener("click", async () => {
	const name = document.querySelector(".add-course-popup-input-name");
	const desc = document.querySelector(".add-course-popup-input-desc");
	await addNewCourse(name.value,desc.value)
	await getAllCourses();
	name.value = "";
	desc.value = "";
	closeAddPopup();
})
