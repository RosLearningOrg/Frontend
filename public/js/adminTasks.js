import { API_URL, logout } from "/js/main.js";

const contentContainer = document.getElementsByClassName("main-content")[0];

const getTasks = async () => {
	const init = {
		method: "GET",
		credentials: "include",
	};

	try {
        const resp = await fetch(API_URL + `/admin/getThemeTasks?course_id=${sessionStorage.getItem("course_id")}
            &theme_id=${sessionStorage.getItem("lesson_id")}`,init);
		const data = await resp.json();
		setContent(data);
	} catch {
		logout();
	}
};

const setContent = (data) => {
	let content = "";

	for (let item of data) {
        content += `             
                <div class="task-item-container" data-task-id=${item.id}>
                    <p class="task-item-name">${item.title}</p>
                    <p class="task-item-desc hint">${item.description}</p>
                    <div class="icon-buttons">
                        <div class="icon-container">
                            <img src="images/edit.svg" alt="">
                        </div>
                        <div class="icon-container">
                            <img src="images/delete.svg" alt="">
                        </div>
                    </div>
                </div>
                `;
	}
	contentContainer.innerHTML = content;
};

document.addEventListener("click", (e) => {
    const lessonItem = e.target.closest(".lesson-item-container");

    if (lessonItem) {
        const id = lessonItem.getAttribute("data-lesson-id")
        sessionStorage.setItem("lesson_id", id)
		window.location.href = window.location.origin + "/admin-tasks.html";
    }
});

(async () => {
    if(sessionStorage.getItem("course_id")==null) {
        window.location.href = window.location.origin + "/admin-courses.html";
        return
    } 
    if(sessionStorage.getItem("lesson_id")==null){
        window.location.href = window.location.origin + "/admin-lessons.html";
        return
    }
	await getTasks();  
})();