const addLessonPopupTint = document.querySelector(".add-lesson-popup-tint");
const addLessonCloseBtn = document.querySelector(".add-lesson-popup-close-button");
const addLessonBtn = document.querySelector(".add-lesson-btn");

addLessonBtn.addEventListener("click", showAddLessonPopup);
addLessonCloseBtn.addEventListener("click", closeAddLessonPopup);

function showAddLessonPopup() {
	addLessonPopupTint.classList.remove("popup-tint-hidden");
}

function closeAddLessonPopup() {
	addLessonPopupTint.classList.add("popup-tint-hidden");
}

addLessonPopupTint.addEventListener("click", (e) => {
	if (e.target.classList.contains("popup-tint")) closeAddLessonPopup();
});

const deleteTaskPopupTint = document.querySelector(".delete-task-popup-tint");
const deleteTaskCloseBtn = document.querySelector(".delete-task-popup-close-button");
const deleteTaskBtn = document.querySelector(".icon-conatiner-delete");

deleteTaskBtn.addEventListener("click", showDeleteTaskPopup);
deleteTaskCloseBtn.addEventListener("click", closeDeleteTaskPopup);

function showDeleteTaskPopup() {
	deleteTaskPopupTint.classList.remove("popup-tint-hidden");
}

function closeDeleteTaskPopup() {
	deleteTaskPopupTint.classList.add("popup-tint-hidden");
}

deleteTaskPopupTint.addEventListener("click", (e) => {
	if (e.target.classList.contains("popup-tint")) closeDeleteTaskPopup();
});

const editTaskPopupTint = document.querySelector(".edit-task-popup-tint");
const editTaskCloseBtn = document.querySelector(".edit-task-popup-close-button");
const editTaskBtn = document.querySelector(".icon-conatiner-edit");

editTaskBtn.addEventListener("click", showEditTaskPopup);
editTaskCloseBtn.addEventListener("click", closeEditTaskPopup);

function showEditTaskPopup() {
	editTaskPopupTint.classList.remove("popup-tint-hidden");
}

function closeEditTaskPopup() {
	editTaskPopupTint.classList.add("popup-tint-hidden");
}

editTaskPopupTint.addEventListener("click", (e) => {
	if (e.target.classList.contains("popup-tint")) closeEditTaskPopup();
});