const tintDiv = document.querySelector(".tint");
const closeBtnDiv = document.querySelector(".close-btn");

closeBtnDiv.addEventListener("click", closePopup);

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
	tintDiv.classList.remove("tint_hidden");
}

function closePopup() {
	tintDiv.classList.add("tint_hidden");
}
