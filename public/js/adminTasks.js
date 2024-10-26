import { API_URL, logout } from "/js/main.js";

const contentContainer = document.getElementsByClassName("main-content")[0];

const sideBarInfoName = document.querySelector(".sidebar-info-box-name");
const sideBarInfoHint = document.querySelector(".sidebar-info-box-desc");
const sideBarTaskInfoName = document.querySelector(".sidebar-lesson-info-box-name");
const sideBarTaskInfoHint = document.querySelector(".sidebar-lesson-info-box-desc");

const setInfoName = (course) => {
    sideBarInfoName.innerText = course.title;
}
const setInfoDesc = (course) => {
    sideBarInfoHint.innerText = course.description;
}

const setLessonInfoName = (lesson) => {
    sideBarTaskInfoName.innerText = lesson.title;
}
const setLessonInfoDesc = (lesson) => {
    sideBarTaskInfoHint.innerText = lesson.description;
}

const getCourse = async () => {
	try {
		const resp = await fetch(API_URL + `/admin/getCourse/${sessionStorage.getItem("course_id")}`);
		return resp;
	} catch {
		logout();
	}
};

const getLesson = async () => {
	try {
		const resp = await fetch(API_URL + `/admin/getLesson/${sessionStorage.getItem("lesson_id")}`);
		return resp;
	} catch {
		logout();
	}
};

(async () => {
    console.log(sessionStorage.getItem("course_id"));
    console.log(sessionStorage.getItem("lesson_id"));
    setInfoName(getCourse);
    setInfoDesc(getCourse);
    setLessonInfoName(getLesson);
    setLessonInfoDesc(getLesson);
})();

const getAllTasks = async () => {
	const init = {
		method: "GET",
		credentials: "include",
	};

	try {
		const resp = await fetch(API_URL + "/admin/getAllTasks", init);
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
        const id = lessonItem.getAttribute("data-task-id")
        sessionStorage.setItem("task_id", id)
		// window.location.href = window.location.origin + "/admin-tasks.html";
    }
});

(async () => {
	await getAllTasks();
})();
