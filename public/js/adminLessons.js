import { API_URL, logout } from "/js/main.js";
import { showEditLessonPopup, showDeleteLessonPopup } from "/js/adminLessonsPopups.js";

const contentContainer = document.getElementsByClassName("main-content")[0];

export const getLessons = async () => {
	const init = {
		method: "GET",
		credentials: "include",
	};

	try {
        const resp = await fetch(API_URL + `/admin/getCourseThemes?course_id=${sessionStorage.getItem("course_id")}`,init);
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
                <div href="admin-tasks.html" class="lesson-item-container" draggable="false" data-lesson-id=${item.id}>
                    <div class="lesson-item-info">
                        <p class="lesson-item-title">${item.title}</p>
                        <p class="lesson-item-desc hint">${item.description}</p>
                    </div>
                    <div class="icon-container open-materials-icon">
                        <img class="lesson-item-note-icon" src="images/info.svg" alt="">
                    </div>
                    <!-- 
                    <div class="icon-container open-dropdown-icon">
                        <img class="lesson-item-dots-icon" src="images/dots.svg" alt="">
                    </div>
                    -->
                    <div class="icon-container edit-lesson-btn">
                        <img src="images/edit.svg" alt="">
                    </div>
                    <div class="icon-container delete-lesson-btn">
                        <img src="images/delete.svg" alt="">
                    </div>

                </div>

                
        `;
	}
	contentContainer.innerHTML = content;
};

document.addEventListener("click", (e) => {
    const lessonItem = e.target.closest(".lesson-item-container");
    const lessonEdit = e.target.closest(".edit-lesson-btn");
    const lessonDelete = e.target.closest(".delete-lesson-btn");
    
    if(lessonEdit){
        const id = lessonItem.getAttribute("data-lesson-id")
        const title = lessonItem.getElementsByClassName("lesson-item-title")[0].childNodes[0].data;
        const desc = lessonItem.getElementsByClassName("lesson-item-desc")[0].childNodes[0].data;
        document.querySelector(".edit-lesson-popup-input-name").value = title;
        document.querySelector(".edit-lesson-popup-input-desc").value = desc;
        sessionStorage.setItem("lesson_id", id)
        showEditLessonPopup();
        
        
        return;
    }
    if(lessonDelete){
        showDeleteLessonPopup();
        const id = lessonItem.getAttribute("data-lesson-id")
        sessionStorage.setItem("lesson_id", id)
        return;
    }
    if (lessonItem) {
        const id = lessonItem.getAttribute("data-lesson-id")
        const title = lessonItem.getElementsByClassName("lesson-item-title")[0].childNodes[0].data;
        const desc = lessonItem.getElementsByClassName("lesson-item-desc")[0].childNodes[0].data;
        sessionStorage.setItem("lesson_id", id)
        sessionStorage.setItem("lesson_title", title)
        sessionStorage.setItem("lesson_desc", desc)
		window.location.href = window.location.origin + "/admin-tasks.html";
    }
});

document.addEventListener("click", (e) => {
    const manageButton = e.target.closest(".manage-materials-btn")

    if (manageButton) {
        window.location.href = window.location.origin + "/admin-materials.html";
    }
});

(async () => {
    if(sessionStorage.getItem("course_id")==undefined || sessionStorage.getItem("course_title")==undefined || sessionStorage.getItem("course_desc")==undefined) {
        window.location.href = window.location.origin + "/admin-courses.html";
        return;
    } 
	await getLessons();  
})();

(async () => {
    const name = document.getElementsByClassName("sidebar-info-box-course-name");
    name[0].innerHTML = sessionStorage.getItem("course_title");
    const desc = document.getElementsByClassName("sidebar-info-box-course-desc");
    desc[0].innerHTML = sessionStorage.getItem("course_desc");
})();

document.addEventListener("click", (e) => {
    const logoutDiv = e.target.closest(".sidebar-links-logout");

    if (logoutDiv) {
        logout();
        window.location.href = window.location.origin + "/login.html";
    }
});