import { API_URL, logout } from "/js/main.js";

const contentContainer = document.getElementsByClassName("main-content")[0];

const course_id = sessionStorage.getItem("course_id");
const lesson_id = sessionStorage.getItem("lesson_id");

const sidebarTitle = document.querySelector(".course-title");
const siderbarDescription = document.querySelector(".course-desc");

sidebarTitle.innerHTML = sessionStorage.getItem("course_title");
siderbarDescription.innerHTML = sessionStorage.getItem("course_description");

const sidebarLessonTitle = document.querySelector(".lesson-title");
const siderbarLessonDescription = document.querySelector(".lesson-desc");

sidebarLessonTitle.innerHTML = sessionStorage.getItem("lesson_title");
siderbarLessonDescription.innerHTML = sessionStorage.getItem("lesson_description");

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
            <div class="task-item-container hoverable" data-task-id=${item.id}>
                <p class="task-item-name">${item.title}</p>
                <p class="task-item-desc hint">${item.description}</p>
                <div class="task-item-status" data-variant="completed">Не пройдено</div>
			</div>
        `;
	}
	contentContainer.innerHTML = content;
};

document.addEventListener("click", (e) => {
    const logoutDiv = e.target.closest(".sidebar-links-logout");

    if (logoutDiv) {
        logout();
        window.location.href = window.location.origin + "/login.html";
		const cookieNames = document.cookie.split('; ').map(cookie => cookie.split('=')[0]);
		sessionStorage.clear();
		  
		cookieNames.forEach(name => {
		  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		});
    }
});

(async () => {
    await getLessonTasks();
})();