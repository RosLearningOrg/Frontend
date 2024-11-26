import { API_URL, logout } from "/js/main.js";
import { showMaterialSelectPopup } from "/js/lessonsPopups.js";

const contentContainer = document.getElementsByClassName("main-content")[0];

const sidebarTitle = document.getElementsByClassName("sidebar-info-box-title")[0];
const siderbarDescription = document.getElementsByClassName("sidebar-info-box-desc")[0];

sidebarTitle.innerHTML = sessionStorage.getItem("course_title");
siderbarDescription.innerHTML = sessionStorage.getItem("course_description");

const course_id = sessionStorage.getItem("course_id");

const getCourseLessons = async () => {
	const init = {
		method: "GET",
		credentials: "include"
	};

	try {
        const resp = await fetch(API_URL + `/user/getCourseThemes?course_id=${course_id}`, init)
        const data = await resp.json();
        console.log(data)
		setContent(data)
	} catch {
        return null;
	}
};

const setContent = (data) => {
	let content = "";

	for (let item of data) {
		content += `
            <div href="tasks.html" class="lesson-item-container hoverable" draggable="false" data-lesson-id=${item.id}>
                <div class="lesson-item-info">
                    <p class="lesson-item-title">${item.title}</p>
                    <p class="lesson-item-desc hint">${item.description}</p>
                </div>
                <div class="icon-container open-materials-btn">
                    <img class="lesson-item-materials-icon" src="./images/info.svg" alt="">
                </div>
                    <p class="lesson-item-stats">2 / 15</p>
                </div>
        `;
	}
	contentContainer.innerHTML = content;
};

document.addEventListener("click", (e) => {
    const materialIcon = e.target.closest(".open-materials-btn")

    if (materialIcon) {
        const lesson_div = materialIcon.parentElement.tagName === 'DIV' ? materialIcon.parentElement : null;
        const lesson_id = lesson_div.getAttribute("data-lesson-id");
        const lesson_name = lesson_div.getElementsByClassName("lesson-item-title")[0].innerHTML;
        showMaterialSelectPopup(lesson_id, lesson_name);
        return;
    }

    const lessonItem = e.target.closest(".lesson-item-container");

    if (lessonItem) {
        const id = lessonItem.getAttribute("data-lesson-id");
        sessionStorage.setItem("lesson_id", id);

        const lessonTitle = lessonItem.getElementsByClassName("lesson-item-title")[0].innerHTML;
        sessionStorage.setItem("lesson_title", lessonTitle);

        const lessonDescription = lessonItem.getElementsByClassName("lesson-item-desc")[0].innerHTML;
        sessionStorage.setItem("lesson_description", lessonDescription);

		window.location.href = window.location.origin + "/tasks.html";
    }
});

document.addEventListener("click", (e) => {
    const logoutDiv = e.target.closest(".sidebar-links-logout");

    if (logoutDiv) {
        logout();
        window.location.href = window.location.origin + "/login.html";
    }
});

(async () => {
    await getCourseLessons();
})();