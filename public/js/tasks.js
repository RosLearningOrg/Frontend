import { API_URL } from "/js/main.js";

const contentContainer = document.getElementsByClassName("main-content")[0];

const course_id = sessionStorage.getItem("course_id");
const lesson_id = sessionStorage.getItem("lesson_id");

const getLessonTasks = async () => {
	const init = {
		method: "GET",
		credentials: "include"
	};

	try { 
        const resp = await fetch(API_URL + `/user/getThemeTasks?course_id=${course_id}&theme_id=${lesson_id}`, init)
        const data = await resp.json();
        console.log(data);
		setContent(data);
	} catch {
        return null;
	}
};

const setContent = (data) => {
	let content = "";

	for (let item of data) {
		content += `
            <div class="task-item-container" data-task-id=${item.id}>
                <p class="task-item-name">${item.title}</p>
                <p class="task-item-desc hint">${item.description}</p>
                <div class="task-item-status" data-variant="completed">Не пройдено</div>
			</div>
        `;
	}
	contentContainer.innerHTML = content;
};

(async () => {
    await getLessonTasks();
})();