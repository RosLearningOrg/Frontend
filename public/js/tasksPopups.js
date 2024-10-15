const taskPopupTint = document.querySelector(".task-popup-tint");
const materialPopupTint = document.querySelector(".material-popup-tint");
const taskPopupCloseBtn = document.querySelector(".task-close-btn");
const materialPopupCloseBtn = document.querySelector(".material-close-btn");
const materialOpenBtn = document.querySelector(".material-open-btn");

materialOpenBtn.addEventListener("click", showMaterialPopup)
taskPopupCloseBtn.addEventListener("click", closeTaskPopup);
materialPopupCloseBtn.addEventListener("click", closeMaterialPopup);

materialPopupTint.addEventListener("click", (e) =>{
	if (e.target.classList.contains("material-popup-tint")) closeMaterialPopup();
});

taskPopupTint.addEventListener("click", (e) => {
	if (e.target.classList.contains("task-popup-tint")) closeTaskPopup();
});

document.addEventListener("click", (e) => {
    const item = e.target.closest(".task-item-container");
	if (item) showTaskPopup();
});

function showTaskPopup() {
	taskPopupTint.classList.remove("popup-tint-hidden");
}

function closeTaskPopup() {
	taskPopupTint.classList.add("popup-tint-hidden");
}

function showMaterialPopup() {
	materialPopupTint.classList.remove("popup-tint-hidden");
}

function closeMaterialPopup() {
	materialPopupTint.classList.add("popup-tint-hidden");
}
