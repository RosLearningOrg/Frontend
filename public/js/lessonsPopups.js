import { API_URL } from "/js/main.js";

const materialPopupTint = document.querySelector(".material-popup-tint-select");
const materialCloseBtn = document.querySelector(".material-close-btn");
const materialPopup = document.querySelector(".material-popup-tint");
const materialCloseBtnEnd = document.querySelector(".material-close-btn-end");
const backButton = document.querySelector(".back_popup-image");
var themeDiv;
var themeName;
var materialJSON;

materialCloseBtn.addEventListener("click", closeMaterialSelectPopup);
materialCloseBtnEnd.addEventListener("click", closeMaterialPopup);

materialPopupTint.addEventListener("click", (e) => {
	if (e.target.classList.contains("material-popup-tint-select")) closeMaterialSelectPopup();
});

materialPopup.addEventListener("click", (e) =>{
	if (e.target.classList.contains("material-popup-tint")) closeMaterialPopup();
});

export function showMaterialSelectPopup(theme_id, theme_name) {
	materialPopupTint.classList.remove("popup-tint-hidden");
	if (theme_name) {
		themeName = theme_name;
	}
	addLessonName();
	
	if (!themeDiv) {
	const popupContainer = document.getElementsByClassName("popup-select-materials")[0];

	const getThemeMaterials = async () => {
		const init = {
			method: "GET",
			credentials: "include"
		};
	
		try { 
			const resp = await fetch(API_URL + `/user/getThemeMaterials?course_id=${sessionStorage.getItem("course_id")}&theme_id=${theme_id}`, init)
			const data = await resp.json();
			setContent(data);
			materialJSON = data;
		} catch {
			return null;
		}
	};
	
	const setContent = (data) => {
		let content = "";
	
		for (let item of data) {
			content += `
				<div class="text-box text-box-select" data-material-id=${item.id}>
					<p>${item.title}</p>
				</div>
			`;
		}
		popupContainer.innerHTML = content;

		document.addEventListener("click", (e) => {
			const selectButton = e.target.closest(".text-box-select");

			if (selectButton) {
				themeDiv = selectButton;
				closeMaterialSelectPopup();
				showMaterialPopup();
			}
		});
	};

	(async () => {
		await getThemeMaterials();
	})();
}
}

function showMaterialPopup() {
	materialPopup.classList.remove("popup-tint-hidden");
	const lessonTitle = document.querySelector(".popup-lesson-title-selected");
	lessonTitle.innerHTML = themeDiv.innerHTML;	
}

function closeMaterialPopup() {
	materialPopup.classList.add("popup-tint-hidden");
	addLessonName();
}

function closeMaterialSelectPopup() {
	materialPopupTint.classList.add("popup-tint-hidden");
	addLessonName();
}

backButton.addEventListener("click", (e) => {
    closeMaterialPopup();
	showMaterialSelectPopup();
	addLessonName();
});

function addLessonName() {
	const title = document.querySelector(".popup-lesson-title");
	title.innerHTML = themeName;
}
