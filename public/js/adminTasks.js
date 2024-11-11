import { API_URL, logout } from "/js/main.js";
import { showEditTaskPopup, showDeleteTaskPopup } from "/js/adminTasksPopups.js";

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
                    <div class="icon-buttons ">
                        <div class="icon-container edit-task-btn">
                            <img src="images/edit.svg" alt="">
                        </div>
                        <div class="icon-container delete-task-btn">
                            <img src="images/delete.svg" alt="">
                        </div>
                    </div>
                </div>
                `;
	}
	contentContainer.innerHTML = content;
};

document.addEventListener("click", (e) => {
    const taskItem = e.target.closest(".task-item-container");
    const taskEdit = e.target.closest(".edit-task-btn");
    const taskDelete = e.target.closest(".delete-task-btn");
    if(taskEdit){
        showEditTaskPopup();
        const id = taskItem.getAttribute("data-task-id")
        sessionStorage.setItem("task_id", id)
        return;
    }
    if(taskDelete){
        showDeleteTaskPopup();
        const id = taskItem.getAttribute("data-task-id")
        sessionStorage.setItem("task_id", id)
        return;
    }
    if (taskItem) {
        const id = taskItem.getAttribute("data-task-id")
        sessionStorage.setItem("task_id", id)
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