const addCourse = document.getElementsByClassName('add-course-popup-tint')[0];
const editCourse = document.getElementsByClassName('edit-course-popup-tint')[0];
const deleteCourse = document.getElementsByClassName('delete-course-popup-tint')[0];

const addCourseTint = document.querySelector(".add-course-popup-tint");
const editCourseTint = document.querySelector(".edit-course-popup-tint");
const deleteCourseTint = document.querySelector(".delete-course-popup-tint");

const closeAddCourseBtnDiv = document.querySelector(".close-add-course-btn");
const closeEditCourseBtnDiv = document.querySelector(".close-edit-course-btn");
const closeDeleteCourseBtnDiv = document.querySelector(".close-delete-course-btn");

closeAddCourseBtnDiv.addEventListener("click", closeAddPopup);
closeEditCourseBtnDiv.addEventListener("click", closeEditPopup);
closeDeleteCourseBtnDiv.addEventListener("click", closeDeletePopup);

document.addEventListener("click", (e) => {
    const item = e.target.closest(".add-course-btn");
	if (item) {
		showAddPopup();
	}
});

document.addEventListener("click", (e) => {
	event.preventDefault();
    const item = e.target.closest(".dropdown-menu-edit");
	if (item) {
		showEditPopup();
	}
});

document.addEventListener("click", (e) => {
	event.preventDefault();
    const item = e.target.closest(".dropdown-menu-delete");
	if (item) {
		showDeletePopup();
	}
});

addCourseTint.addEventListener("click", (e) =>{
	if (e.target.classList.contains("add-course-popup-tint")) closeAddPopup();
});

editCourseTint.addEventListener("click", (e) =>{
	if (e.target.classList.contains("edit-course-popup-tint")) closeEditPopup();
});

deleteCourseTint.addEventListener("click", (e) =>{
	if (e.target.classList.contains("delete-course-popup-tint")) closeDeletePopup();
});

// 
function showAddPopup() {
	addCourse.style.opacity="1";
	addCourse.style.pointerEvents = "fill";
}

function closeAddPopup() {
	addCourse.style.opacity="0";
	addCourse.style.pointerEvents = "none";
}
function showEditPopup() {
	editCourse.style.opacity="1";
	editCourse.style.pointerEvents = "fill";
}

function closeEditPopup() {
	editCourse.style.opacity="0";
	editCourse.style.pointerEvents = "none";
}
function showDeletePopup() {
	deleteCourse.style.opacity="1";
	deleteCourse.style.pointerEvents = "fill";
}

function closeDeletePopup() {
	deleteCourse.style.opacity="0";
	deleteCourse.style.pointerEvents = "none";
}
