import { API_URL, logout } from "/js/main.js";
import { showEditCoursePopup, showDeleteCoursePopup } from "/js/adminCoursesPopups.js";

const contentContainer = document.getElementsByClassName("main-content")[0];

export const getAllCourses = async () => {
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
 <!--  -->
                    <div class="icon-buttons">
                        <div class="icon-container edit-course-btn">
                            <img src="images/edit.svg" alt="">
                        </div>
                        <div class="icon-container delete-course-btn">
                            <img src="images/delete.svg" alt="">
                        </div>
                    </div>
 <!--  -->
            </div>
        `;
	}
	contentContainer.innerHTML = content;
};

document.addEventListener("click", (e) => {
    const courseItem = e.target.closest(".course-item-container");
    const courseEdit = e.target.closest(".edit-course-btn");
    const courseDelete = e.target.closest(".delete-course-btn");

    if(courseEdit){
        showEditCoursePopup();
        const id = courseItem.getAttribute("data-course-id")
        sessionStorage.setItem("course_id", id)
        return;
    }
    if(courseDelete){
        showDeleteCoursePopup();
        const id = courseItem.getAttribute("data-course-id")
        sessionStorage.setItem("course_id", id)
        return;
    }

    if (courseItem) {
        const id = courseItem.getAttribute("data-course-id")
        const title = courseItem.getElementsByClassName("course-item-title")[0].childNodes[0].data;
        const desc = courseItem.getElementsByClassName("course-item-desc")[0].childNodes[0].data;
        sessionStorage.setItem("course_id", id)
        sessionStorage.setItem("course_title", title)
        sessionStorage.setItem("course_desc", desc)
		window.location.href = window.location.origin + "/admin-lessons.html";
    }
});

(async () => {
	await getAllCourses();
})();
