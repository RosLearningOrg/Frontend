import { API_URL, logout } from "/js/main.js";

const contentContainer = document.getElementsByClassName("main-content")[0];

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
            <a href="tasks.html" class="lesson-item-container" draggable="false" data-lesson-id=${item.id}>
                <div class="lesson-item-info">
                    <p class="lesson-item-title">${item.title}</p>
                    <p class="lesson-item-desc hint">${item.description}</p>
                </div>
                <div class="icon-container open-materials-btn">
                    <img class="lesson-item-materials-icon" src="./images/info.svg" alt="">
                </div>
                <p class="lesson-item-stats">2 / 15</p>
            </a>
        `;
	}
	contentContainer.innerHTML = content;
};

document.addEventListener("click", (e) => {
    const courseItem = e.target.closest(".lesson-item-container");

    if (courseItem) {
        const id = courseItem.getAttribute("data-lesson-id")
        sessionStorage.setItem("lesson_id", id)
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