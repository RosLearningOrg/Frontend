import { API_URL, logout, getCSRF } from "/js/main.js";
import { getTasks } from "/js/adminTasks.js";
import { closeAddPopup, closeDeletePopup, closeEditPopup } from "/js/adminTasksPopups.js";

// const addNewLesson = async (name,desc) => {
//     const csrf = await getCSRF();
// 	const init = {
// 		method: "POST",
//         credentials: "include",
//         headers: {
// 			"Content-Type": "application/json",
// 			"X-CSRF-TOKEN": csrf,
// 		},
//         body: JSON.stringify({
//             title: name,
//             description: desc,
//         }),
// 	};

// 	try {
// 		await fetch(API_URL + "/admin/createTheme", init);
// 	} catch {
// 		logout();
// 	}
// };

const editLesson = async (name,desc,taskId) => {
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
		await fetch(API_URL + `/admin/updateTask?task_id=${taskId}`, init);
	} catch {
		logout();
	}
};

const deleteTask = async (themeId,taskId) => {
    const init = {
        method: "GET",
        credentials: "include",
    };

    try { 	
        const resp = await fetch(API_URL + `/admin/removeThemeTask?theme_id=${themeId}&task_id=${taskId}`, init);
        const data = await resp.json();
        setContent(data);
    } catch {
        logout();
    }
};

// const addLessonBtn = document.querySelector(".add-lesson-popup-create-btn");
const deleteLessonBtn = document.querySelector(".delete-task-popup-delete-btn");
const editLessonBtn = document.querySelector(".edit-task-popup-create-btn");
// addLessonBtn.addEventListener("click", async () => {
// 	const name = document.querySelector(".add-lesson-popup-input-name");
// 	const desc = document.querySelector(".add-lesson-popup-input-desc");
// 	await addNewLesson(name.value,desc.value);
// 	await getLessons();
// 	name.value = "";
// 	desc.value = "";
// 	closeAddPopup();
// })

deleteLessonBtn.addEventListener("click", async () => {
	await deleteTask(sessionStorage.getItem("lesson_id"),sessionStorage.getItem("task_id"));
	sessionStorage.removeItem("task_id");
	sessionStorage.removeItem("task_desc");
	sessionStorage.removeItem("task_title");
	await getTasks();
	closeDeletePopup();
})

editLessonBtn.addEventListener("click", async () => {
	const name = document.querySelector(".edit-task-popup-input-name").value;
	const desc = document.querySelector(".edit-task-popup-input-desc").value;
	await editLesson(name,desc,sessionStorage.getItem("task_id"));
	await getTasks();
	closeEditPopup();
})