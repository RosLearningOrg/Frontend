const taskPopupTint = document.querySelector(".task-popup-tint");
const materialPopupSelectTint = document.querySelector(".material-popup-tint-select");
const taskPopupCloseBtn = document.querySelector(".task-close-btn");
const materialPopupCloseBtn = document.querySelector(".material-close-btn");
const materialOpenBtn = document.querySelector(".material-open-btn");
const selectButton = document.querySelector(".text-box-select");
const materialPopupTint = document.querySelector(".material-popup-tint");
const backButton = document.querySelector(".back_popup-image");
const materialCloseButton = document.querySelector(".material-close-btn-end");

materialOpenBtn.addEventListener("click", showMaterialSelectPopup);
taskPopupCloseBtn.addEventListener("click", closeTaskPopup);
materialPopupCloseBtn.addEventListener("click", closeMaterialSelectPopup);
materialCloseButton.addEventListener("click", (e) => {
	closeMaterialPopup();
});

materialPopupSelectTint.addEventListener("click", (e) =>{
	if (e.target.classList.contains("material-popup-tint-select")) closeMaterialSelectPopup();
});

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

function showMaterialSelectPopup() {
	materialPopupSelectTint.classList.remove("popup-tint-hidden");
}

function closeMaterialSelectPopup() {
	materialPopupSelectTint.classList.add("popup-tint-hidden");
}

function showMaterialPopup() {
	materialPopupTint.classList.remove("popup-tint-hidden");
}

function closeMaterialPopup() {
	materialPopupTint.classList.add("popup-tint-hidden");
}

selectButton.addEventListener("click", (e) => {
    closeMaterialSelectPopup();
	showMaterialPopup();
});

backButton.addEventListener("click", (e) => {
    closeMaterialPopup();
	showMaterialSelectPopup();
});