import { API_URL, logout, getCSRF } from "/js/main.js";
import { getLessons } from "/js/adminLessons.js";
import { closeAddPopup, closeDeletePopup, closeEditPopup } from "/js/adminLessonsPopups.js";

const addNewLesson = async (name,desc) => {
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
		await fetch(API_URL + "/admin/createTheme", init);
	} catch {
		logout();
	}
};

const editLesson = async (name,desc,themeId) => {
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
		await fetch(API_URL + `/admin/updateTheme?theme_id=${themeId}`, init);
	} catch {
		logout();
	}
};

const deleteLesson = async (courseId,themeId) => {
    const init = {
        method: "GET",
        credentials: "include",
    };

    try { 	
        const resp = await fetch(API_URL + `/admin/removeCourseThemes?course_id=${courseId}&theme_id=${themeId}`, init);
        const data = await resp.json();
        setContent(data);
    } catch {
        logout();
    }
};

const addLessonBtn = document.querySelector(".add-lesson-popup-create-btn");
const deleteLessonBtn = document.querySelector(".delete-lesson-popup-btn");
const editLessonBtn = document.querySelector(".edit-lesson-popup-btn");
addLessonBtn.addEventListener("click", async () => {
	const name = document.querySelector(".add-lesson-popup-input-name");
	const desc = document.querySelector(".add-lesson-popup-input-desc");
	await addNewLesson(name.value,desc.value);
	await getLessons();
	name.value = "";
	desc.value = "";
	closeAddPopup();
})

deleteLessonBtn.addEventListener("click", async () => {
	await deleteLesson(sessionStorage.getItem("course_id"), sessionStorage.getItem("lesson_id"));
	sessionStorage.removeItem("lesson_id");
	sessionStorage.removeItem("lesson_desc");
	sessionStorage.removeItem("lesson_title");
	await getLessons();
	closeDeletePopup();
})

editLessonBtn.addEventListener("click", async () => {
	const name = document.querySelector(".edit-lesson-popup-input-name").value;
	const desc = document.querySelector(".edit-lesson-popup-input-desc").value;
	await editLesson(name,desc,sessionStorage.getItem("lesson_id"));
	await getLessons();
	closeEditPopup();
})