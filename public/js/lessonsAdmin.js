import { logout, addLesson, editLesson, deleteLesson, getAllLessons, addCourseLesson, deleteCourseLesson } from "./api.js";
import { genLessonAdmin } from "./templates.js";

let selected = {};
const contentContainer = document.querySelector(".main-content");
const logoutButton = document.querySelector(".logout-button");
const sidebarCourseTitle = document.querySelector(".sidebar-course-title");
const sidebarCourseDescription = document.querySelector(".sidebar-course-description");

const addButton = document.querySelector(".add-lesson-button");
const addCancelButton = document.querySelector(".add-lesson-cancel-button");
const addConfirmButton = document.querySelector(".add-lesson-confirm-button");
const addTitleInput = document.querySelector(".add-lesson-title-input");
const addDescriptionInput = document.querySelector(".add-lesson-description-input");

const editCancelButton = document.querySelector(".edit-lesson-cancel-button");
const editConfirmButton = document.querySelector(".edit-lesson-confirm-button");
const editTitleInput = document.querySelector(".edit-lesson-title-input");
const editDescriptionInput = document.querySelector(".edit-lesson-description-input");

const deleteCancelButton = document.querySelector(".delete-lesson-cancel-button");
const deleteConfirmButton = document.querySelector(".delete-lesson-confirm-button");
const deleteTitleText = document.querySelector(".delete-lesson-title-text");

const addPopupTint = document.querySelector(".add-lesson-popup-tint");
const editPopupTint = document.querySelector(".edit-lesson-popup-tint");
const deletePopupTint = document.querySelector(".delete-lesson-popup-tint");
const hiddenTintClass = "popup-tint-hidden";

const processAdd = async () => {
    const title = addTitleInput.value;    
    const description = addDescriptionInput.value;
    addConfirmButton.disable = true;
    const data = await addLesson(title, description);
    await addCourseLesson(data.id, sessionStorage.getItem("course_id"));
    await updateContent();
    hideAddPopup();
    addConfirmButton.disable = false;
};

const processEdit = async () => {
    const title = editTitleInput.value;
    const description = editDescriptionInput.value;
    editConfirmButton.disabled = true;
    await editLesson(selected.id, title, description);
    await updateContent();
    hideEditPopup();
    editConfirmButton.disabled = false;
}

const processDelete = async () => {
    deleteConfirmButton.disabled = true;
    await deleteCourseLesson(selected.id, sessionStorage.getItem("course_id"));
    await deleteLesson(selected.id);
    await updateContent();
    hideDeletePopup();
    deleteConfirmButton.disabled = false;
}

const showAddPopup = () => {
    addTitleInput.value = "";
    addDescriptionInput.value = "";
	addPopupTint.classList.remove(hiddenTintClass);
};

const hideAddPopup = () => {
	addPopupTint.classList.add(hiddenTintClass);
};

const showEditPopup = () => {
    editTitleInput.value = selected.title;
    editDescriptionInput.value = selected.description;
	editPopupTint.classList.remove(hiddenTintClass);
};

const hideEditPopup = () => {
    setSelected(null, null, null);
	editPopupTint.classList.add(hiddenTintClass);
};

const showDeletePopup = () => {
    deleteTitleText.innerText = `"${selected.title}"`;
	deletePopupTint.classList.remove(hiddenTintClass);
};

const hideDeletePopup = () => {
    setSelected(null, null, null);
	deletePopupTint.classList.add(hiddenTintClass);
};

const setSelected = (id, title, description) => {
    selected = {
        id: id,
        title: title,
        description: description
    }
}

const setContent = (courses) => {
	let content = "";
	for (let item of courses) {
		content += genLessonAdmin(item.id, item.title, item.description);
	}
	contentContainer.innerHTML = content;
};

const updateContent = async () => {
	const items = await getAllLessons(sessionStorage.getItem("course_id"));
    items.sort((o1, o2) => {
        const d1 = new Date(o1.dateOfCreation);
        const d2 = new Date(o2.dateOfCreation);
        return d2.getTime() - d1.getTime();
    })
	setContent(items);
};

document.addEventListener("click", (e) => {
    const block = e.target.closest(".lesson-item-container");
    if (!block) return;
    const id = block.getAttribute("data-lesson-id");
    const title = block.querySelector(".lesson-item-title").innerText;
    const description = block.querySelector(".lesson-item-description").innerText;

    if (e.target.closest(".edit-lesson-button")) {
        setSelected(id, title, description);
        showEditPopup();
        return;
    }

    if (e.target.closest(".delete-lesson-button")) {
        setSelected(id, title, description);
        showDeletePopup();
        return;
    }
    
    sessionStorage.setItem("lesson_id", id);
    sessionStorage.setItem("lesson_title", title);
    sessionStorage.setItem("lesson_description", description);
    location.href = location.origin + "/admin-tasks.html";
})

addButton.addEventListener("click", showAddPopup);
addCancelButton.addEventListener("click", hideAddPopup);
addConfirmButton.addEventListener("click", processAdd);
addPopupTint.addEventListener("click", (e) => {
	if (!e.target.closest(".popup-container")) {
		hideAddPopup();
	}
});

editCancelButton.addEventListener("click", hideEditPopup);
editConfirmButton.addEventListener("click", processEdit);
editPopupTint.addEventListener("click", (e) => {
	if (!e.target.closest(".popup-container")) {
		hideEditPopup();
	}
});

deleteCancelButton.addEventListener("click", hideDeletePopup);
deleteConfirmButton.addEventListener("click", processDelete);
deletePopupTint.addEventListener("click", (e) => {
	if (!e.target.closest(".popup-container")) {
		hideDeletePopup();
	}
});

logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await logout();
    location.href = location.origin + "/login.html"
});

(async () => {
    sessionStorage.removeItem("lesson_id");
    if (!sessionStorage.getItem("course_id")) {
        location.href = location.origin + "/admin-courses.html";
        return;
    }
	await updateContent();
    sidebarCourseTitle.innerText = sessionStorage.getItem("course_title") ?? "";
    sidebarCourseDescription.innerText = sessionStorage.getItem("course_description") ?? "";
})();

document.addEventListener("click", (e) => {
    const manageButton = e.target.closest(".manage-materials-button")

    if (manageButton) {
        window.location.href = window.location.origin + "/admin-materials.html";
    }
});

document.addEventListener("click", (e) => {
    const manageButton = e.target.closest(".view-personal-button")

    if (manageButton) {
        window.location.href = window.location.origin + "/admin-personal.html";
    }
});