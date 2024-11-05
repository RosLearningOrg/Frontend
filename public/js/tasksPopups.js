const API_URL = "http://localhost:8080/api";

const taskPopupTint = document.querySelector(".task-popup-tint");
const materialPopupSelectTint = document.querySelector(".material-popup-tint-select");
const taskPopupCloseBtn = document.querySelector(".task-close-btn");
const materialPopupCloseBtn = document.querySelector(".material-close-btn");
const materialOpenBtn = document.querySelector(".material-open-btn");
var selectButton;
var themeDiv;
const materialPopupTint = document.querySelector(".material-popup-tint");
const backButton = document.querySelector(".back_popup-image");
const materialCloseButton = document.querySelector(".material-close-btn-end");

var taskTitle = "";
var taskDescription = "";

materialOpenBtn.addEventListener("click", (e) => {
	showMaterialSelectPopup();
});

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
	if (item) {
		taskTitle = item.querySelector(".task-item-name").innerHTML;
		taskDescription = item.querySelector(".task-item-desc").innerHTML;
		showTaskPopup();
	}
});

function showTaskPopup() {
	taskPopupTint.classList.remove("popup-tint-hidden");

	const taskTitleDiv = document.getElementsByClassName("popup-header-title")[0];
	taskTitleDiv.innerHTML = taskTitle;

	const taskDescDiv = document.getElementsByClassName("popup-container-description")[0];
	taskDescDiv.innerHTML = taskDescription;
}

function closeTaskPopup() {
	taskPopupTint.classList.add("popup-tint-hidden");
}

function showMaterialSelectPopup() {
	materialPopupSelectTint.classList.remove("popup-tint-hidden");
	const popupContainer = document.getElementsByClassName("popup-select-materials")[0];
	const sidebarLessonTitle = document.querySelector(".popup-lesson-title");
	sidebarLessonTitle.innerHTML = sessionStorage.getItem("lesson_title");
	
	const getThemeMaterials = async () => {
		const init = {
			method: "GET",
			credentials: "include"
		};
	
		try { 
			const resp = await fetch(API_URL + `/user/getThemeMaterials?course_id=${sessionStorage.getItem("course_id")}&theme_id=${sessionStorage.getItem("lesson_id")}`, init)
			const data = await resp.json();
			setContent(data);
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

function closeMaterialSelectPopup() {
	materialPopupSelectTint.classList.add("popup-tint-hidden");
}

function showMaterialPopup() {
	materialPopupTint.classList.remove("popup-tint-hidden");
	const lessonTitle = document.querySelector(".popup-lesson-title-selected");
	lessonTitle.innerHTML = themeDiv.innerHTML;	
}

function closeMaterialPopup() {
	materialPopupTint.classList.add("popup-tint-hidden");
}

backButton.addEventListener("click", (e) => {
    closeMaterialPopup();
	showMaterialSelectPopup();
});