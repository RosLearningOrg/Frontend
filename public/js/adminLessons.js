import { API_URL, logout } from "/js/main.js";

const contentContainer = document.getElementsByClassName("main-content")[0];
const sideBarInfoName = document.querySelector(".sidebar-info-box-name");
const sideBarInfoHint = document.querySelector(".sidebar-info-box-desc");

const setInfoName = (course) => {
    sideBarInfoName.innerText = course.title;
}
const setInfoDesc = (course) => {
    sideBarInfoHint.innerText = course.description;
}


const getCourse = async () => {
	try {
        console.log("ge");
        
		const resp = await fetch(API_URL + `/admin/getCourse/${sessionStorage.getItem("course_id")}`);
		return resp;
	} catch {
		logout();
	}
};

(async () => {
    console.log(sessionStorage.getItem("course_id"));
    setInfoName(getCourse);
    setInfoDesc(getCourse);
})();

const getAllLessons = async () => {
	const init = {
		method: "GET",
		credentials: "include",
	};

	try {
		const resp = await fetch(API_URL + "/admin/getAllThemes", init);
        // const resp = await fetch(API_URL + `/admin/getCourseThemes/?course_id=${sessionStorage.getItem("course_id")}`, init);
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
                <a href="admin-tasks.html" class="lesson-item-container" draggable="false" data-lesson-id=${item.id}>
                    <div class="lesson-item-info">
                        <p class="lesson-item-title">${item.title}</p>
                        <p class="lesson-item-desc hint">${item.description}</p>
                    </div>
                    <div class="icon-container open-materials-icon">
                        <img class="lesson-item-note-icon" src="images/info.svg" alt="">
                    </div>
                    <div class="icon-container open-dropdown-icon">
                        <img class="lesson-item-dots-icon" src="images/dots.svg" alt="">
                    </div>
                </a>
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
	await getAllLessons();
})();
