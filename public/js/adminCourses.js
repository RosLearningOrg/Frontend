import { API_URL, logout } from "/js/main.js";

const contentContainer = document.getElementsByClassName("main-content")[0];

const getAllCourses = async () => {
	const init = {
		method: "GET",
		credentials: "include",
	};

	try {
		const resp = await fetch(API_URL + "/admin/getAllCourses", init);
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
            <div href="lessons.html" class="course-item-container" draggable="false" data-course-id=${item.id}>
                <div class="course-item-info">
                    <p class="course-item-title">${item.title}</p>
                    <p class="course-item-desc hint">${item.description}</p>
                </div>

                <div class="icon-container view-personal-icon">
                    <img class="course-item-personal-icon" src="./images/fluent_people-28-regular.svg" alt="">
                </div>
                <div class="icon-container open-dropdown-icon">
                    <img class="course-item-dots-icon" src="./images/Vector.svg" alt="">
                </div>
            </div>
        `;
	}
	contentContainer.innerHTML = content;
};

document.addEventListener("click", (e) => {
    const courseItem = e.target.closest(".course-item-container");

    if (courseItem) {
        const id = courseItem.getAttribute("data-course-id")
        sessionStorage.setItem("course_id", id)
		window.location.href = window.location.origin + "/admin-lessons.html";
    }
});

(async () => {
	await getAllCourses();
})();
