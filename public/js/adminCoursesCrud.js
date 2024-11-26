import { API_URL, logout, getCSRF } from "/js/main.js";
import { getAllCourses } from "/js/adminCourses.js";
import { closeAddPopup, closeDeletePopup, closeEditPopup } from "/js/adminCoursesPopups.js";

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

const editCourse = async (name,desc,courseId) => {
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
		await fetch(API_URL + `/admin/updateCourse?course_id=${courseId}`, init);
	} catch {
		logout();
	}
};

const deleteCourse = async (courseId) => {
    const init = {
        method: "GET",
        credentials: "include",
    };

    try {
        await fetch(API_URL + `/admin/deleteCourse?course_id=${courseId}`, init);
    } catch {
        logout();
    }
};

const addCourseBtn = document.querySelector(".add-course-popup-btn");
const deleteCourseBtn = document.querySelector(".delete-course-popup-btn");
const editCourseBtn = document.querySelector(".edit-course-popup-btn");
addCourseBtn.addEventListener("click", async () => {
	const name = document.querySelector(".add-course-popup-input-name");
	const desc = document.querySelector(".add-course-popup-input-desc");
	await addNewCourse(name.value,desc.value);
	await getAllCourses();
	name.value = "";
	desc.value = "";
	closeAddPopup();
})

deleteCourseBtn.addEventListener("click", async () => {
	await deleteCourse(sessionStorage.getItem("course_id"));
	sessionStorage.removeItem("course_id");
	await getAllCourses();
	closeDeletePopup();
})

editCourseBtn.addEventListener("click", async () => {
	const name = document.querySelector(".edit-course-popup-input-name").value;
	const desc = document.querySelector(".edit-course-popup-input-desc").value;
	await editCourse(name,desc,sessionStorage.getItem("course_id"));
	await getAllCourses();
	closeEditPopup();
})
