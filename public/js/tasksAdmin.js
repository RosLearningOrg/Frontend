import { logout, getAllTasks, addTask, addLessonTask, editTask, deleteLessonTask, deleteTask } from "./api.js";
import { genTaskAdmin } from "./templates.js";

let selected = {};
const contentContainer = document.querySelector(".main-content");
const logoutButton = document.querySelector(".logout-button");
const sidebarCourseTitle = document.querySelector(".sidebar-course-title");
const sidebarCourseDescription = document.querySelector(".sidebar-course-description");
const sidebarLessonTitle = document.querySelector(".sidebar-lesson-title");
const sidebarLessonDescription = document.querySelector(".sidebar-lesson-description");

const addButton = document.querySelector(".add-task-button");
const addCancelButton = document.querySelector(".add-task-cancel-button");
const addConfirmButton = document.querySelector(".add-task-confirm-button");
const addTitleInput = document.querySelector(".add-task-title-input");
const addDescriptionInput = document.querySelector(".add-task-description-input");

const editCancelButton = document.querySelector(".edit-task-cancel-button");
const editConfirmButton = document.querySelector(".edit-task-confirm-button");
const editTitleInput = document.querySelector(".edit-task-title-input");
const editDescriptionInput = document.querySelector(".edit-task-description-input");

const deleteCancelButton = document.querySelector(".delete-task-cancel-button");
const deleteConfirmButton = document.querySelector(".delete-task-confirm-button");
const deleteTitleText = document.querySelector(".delete-task-title-text");

const addPopupTint = document.querySelector(".add-task-popup-tint");
const editPopupTint = document.querySelector(".edit-task-popup-tint");
const deletePopupTint = document.querySelector(".delete-task-popup-tint");
const hiddenTintClass = "popup-tint-hidden";

const processAdd = async () => {
    const title = addTitleInput.value;    
    const description = addDescriptionInput.value;
    addConfirmButton.disable = true;
    const data = await addTask(title, description);
    await addLessonTask(data.id, sessionStorage.getItem("lesson_id"));
    await updateContent();
    hideAddPopup();
    addConfirmButton.disable = false;
};

const processEdit = async () => {
    const title = editTitleInput.value;
    const description = editDescriptionInput.value;
    editConfirmButton.disabled = true;
    await editTask(selected.id, title, description);
    await updateContent();
    hideEditPopup();
    editConfirmButton.disabled = false;
}

const processDelete = async () => {
    deleteConfirmButton.disabled = true;
    await deleteLessonTask(selected.id, sessionStorage.getItem("lesson_id"));
    await deleteTask(selected.id);
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
		content += genTaskAdmin(item.id, item.title, item.description);
	}
	contentContainer.innerHTML = content;
};

const updateContent = async () => {
	const items = await getAllTasks(sessionStorage.getItem("lesson_id"));
    items.sort((o1, o2) => {
        const d1 = new Date(o1.dateOfCreation);
        const d2 = new Date(o2.dateOfCreation);
        return d2.getTime() - d1.getTime();
    })
	setContent(items);
};

document.addEventListener("click", (e) => {
    const block = e.target.closest(".task-item-container");
    if (!block) return;
    const id = block.getAttribute("data-task-id");
    const title = block.querySelector(".task-item-title").innerText;
    const description = block.querySelector(".task-item-description").innerText;

    if (e.target.closest(".edit-task-button")) {
        setSelected(id, title, description);
        showEditPopup();
        return;
    }

    if (e.target.closest(".delete-task-button")) {
        setSelected(id, title, description);
        showDeletePopup();
        return;
    }
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
    sessionStorage.removeItem("task_id");
    if (!sessionStorage.getItem("course_id")) {
        location.href = location.origin + "/admin-courses.html";
        return;
    }
    if (!sessionStorage.getItem("lesson_id")) {
        location.href = location.origin + "/admin-lessons.html";
        return;
    }
	await updateContent();
    sidebarCourseTitle.innerText = sessionStorage.getItem("course_title") ?? "";
    sidebarCourseDescription.innerText = sessionStorage.getItem("course_description") ?? "";
    sidebarLessonTitle.innerText = sessionStorage.getItem("lesson_title") ?? "";
    sidebarLessonDescription.innerText = sessionStorage.getItem("lesson_description") ?? "";
})();
