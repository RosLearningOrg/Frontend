import { API_URL, logout } from "/js/main.js";

const contentContainer = document.getElementsByClassName("main-content")[0];

const getUserCourses = async () => {
	const init = {
		method: "GET",
		credentials: "include"
	};

	try {
        const resp = await fetch(API_URL + "/user/getUserCourses", init)
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
            <a href="lessons.html" class="course-item-container" draggable="false" data-course-id=${item.id}>
                <div class="course-item-info">
                    <p class="course-item-title">${item.title}</p>
                    <p class="hint course-item-desc">${item.description}</p>
                </div>
                 <p class="course-item-stats">2 / 15</p>
            </daiv>
        `;
	}    
    contentContainer.innerHTML = content;
    
};

document.addEventListener("click", (e) => {
    const courseItem = e.target.closest(".course-item-container");

    if (courseItem) {
        const id = courseItem.getAttribute("data-course-id")
        sessionStorage.setItem("course_id", id)

        const courseTitle = courseItem.getElementsByClassName("course-item-title")[0].innerText;
        sessionStorage.setItem("course_title", courseTitle);

        const courseDescription = courseItem.getElementsByClassName("course-item-desc")[0].innerText;
        sessionStorage.setItem("course_description", courseDescription);
        
		window.location.href = window.location.origin + "/lessons.html";
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
    await getUserCourses();
})();
