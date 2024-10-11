const matTintDiv = document.querySelector(".material-tint");
const matTaskDiv = document.querySelector(".note");
const closeMaterialBtnDiv = document.querySelector(".close-material-btn");

matTaskDiv.addEventListener("click", (e) => {
    e.preventDefault()
    showMaterialPopup()
})

closeMaterialBtnDiv.addEventListener("click", closeMaterialPopup);

matTintDiv.addEventListener("click", (e) =>{
	if (e.target.classList.contains("material-tint")) closeMaterialPopup();
});

function showMaterialPopup() {
	matTintDiv.classList.remove("material-tint-hidden");
}

function closeMaterialPopup() {
	matTintDiv.classList.add("material-tint-hidden");
}
