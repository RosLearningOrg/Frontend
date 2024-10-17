const addLessonPopupTint = document.querySelector(".add-lesson-popup-tint");
const addLessonCloseBtn = document.querySelector(".add-lesson-popup-close-button");
const addLessonBtn = document.querySelector(".add-lesson-btn")

addLessonBtn.addEventListener("click", showAddLessonPopup);
addLessonCloseBtn.addEventListener("click", closeAddLessonPopup);

addLessonPopupTint.addEventListener("click", (e) => {
	if (e.target.classList.contains("popup-tint")) closeAddLessonPopup();
});

function showAddLessonPopup() {
	addLessonPopupTint.classList.remove("popup-tint-hidden");
}

function closeAddLessonPopup() {
	addLessonPopupTint.classList.add("popup-tint-hidden");
}
