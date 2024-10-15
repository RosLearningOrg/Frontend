const tintDiv = document.querySelector(".tint");
const closeBtnDiv = document.querySelector(".cancel-button");
const createLessonDiv = document.querySelector(".create-lesson")
const pageDiv = document.querySelector(".page");

createLessonDiv.addEventListener("click", showPopup);
closeBtnDiv.addEventListener("click", closePopup);

tintDiv.addEventListener("click", (e) => {
	if (e.target.classList.contains("tint")) closePopup();
});

function showPopup() {
	tintDiv.classList.remove("tint-hidden");
    pageDiv.classList.add("blur");
}

function closePopup() {
	tintDiv.classList.add("tint-hidden");
    pageDiv.classList.remove("blur");
}