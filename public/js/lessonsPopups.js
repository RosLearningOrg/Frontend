const materialPopupTint = document.querySelector(".material-popup-tint");
const materialCloseBtn = document.querySelector(".close-material-popup-btn");

document.addEventListener("click", (e) => {
    if (e.target.closest(".open-materials-btn")) {
        e.preventDefault()
        showMaterialPopup()
    }
})

materialCloseBtn.addEventListener("click", closeMaterialPopup);

materialPopupTint.addEventListener("click", (e) => {
	if (e.target.classList.contains("material-popup-tint")) closeMaterialPopup();
});

function showMaterialPopup() {
	materialPopupTint.classList.remove("popup-tint-hidden");
}

function closeMaterialPopup() {
	materialPopupTint.classList.add("popup-tint-hidden");
}

