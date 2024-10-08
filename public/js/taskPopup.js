const tintDiv = document.querySelector(".tint");
const matTintDiv = document.querySelector(".material-tint");
const matTaskDiv = document.querySelector(".sidebar-links-task-material");
const closeBtnDiv = document.querySelector(".close-btn");
const closeMaterialBtnDiv = document.querySelector(".close-material-btn");

matTaskDiv.addEventListener("click", showMaterialPopup)

closeBtnDiv.addEventListener("click", closePopup);
closeMaterialBtnDiv.addEventListener("click", closeMaterialPopup);

matTintDiv.addEventListener("click", (e) =>{
	if (e.target.classList.contains("material-tint")) closeMaterialPopup();
});

tintDiv.addEventListener("click", (e) => {
	if (e.target.classList.contains("tint")) closePopup();
});

document.addEventListener("click", (e) => {
    const item = e.target.closest(".container");
	if (item) {
		showPopup();
	}
});

function showPopup() {
	tintDiv.classList.remove("tint-hidden");
}

function closePopup() {
	tintDiv.classList.add("tint-hidden");
}

function showMaterialPopup() {
	matTintDiv.classList.remove("material-tint-hidden");
}

function closeMaterialPopup() {
	matTintDiv.classList.add("material-tint-hidden");
}