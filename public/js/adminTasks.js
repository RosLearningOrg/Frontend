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
    if(sessionStorage.getItem("course_id")==undefined || sessionStorage.getItem("course_title")==undefined || sessionStorage.getItem("course_desc")==undefined) {
        window.location.href = window.location.origin + "/admin-courses.html";
        return
    } 
    if(sessionStorage.getItem("lesson_id")==undefined || sessionStorage.getItem("lesson_title")==undefined || sessionStorage.getItem("lesson_desc")==undefined){
        window.location.href = window.location.origin + "/admin-lessons.html";
        return
    }
	await getTasks();  
})();

(async () => {
    const course_name = document.getElementsByClassName("sidebar-info-box-name");
    course_name[0].innerHTML = sessionStorage.getItem("course_title");
    const course_desc = document.getElementsByClassName("sidebar-info-box-desc");
    course_desc[0].innerHTML = sessionStorage.getItem("course_desc");
    const lesson_name = document.getElementsByClassName("sidebar-lesson-info-box-name");
    lesson_name[0].innerHTML = sessionStorage.getItem("lesson_title");
    const lesson_desc = document.getElementsByClassName("sidebar-lesson-info-box-desc");
    lesson_desc[0].innerHTML = sessionStorage.getItem("lesson_desc");
})();