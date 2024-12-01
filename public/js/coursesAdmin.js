import { getAllCourses, addCourse, editCourse, deleteCourse, genCourse, logout } from "./api.js";
import { genCourseAdmin } from "./templates.js";

let selected = {};
const contentContainer = document.querySelector(".main-content");
const logoutButton = document.querySelector(".logout-button");
const genCourseButton = document.querySelector(".gen-course-button");
const genCourseInput = document.querySelector(".gen-course-input");

const addButton = document.querySelector(".add-course-button");
const addCancelButton = document.querySelector(".add-course-cancel-button");
const addConfirmButton = document.querySelector(".add-course-confirm-button");
const addTitleInput = document.querySelector(".add-course-title-input");
const addDescriptionInput = document.querySelector(".add-course-description-input");

const editCancelButton = document.querySelector(".edit-course-cancel-button");
const editConfirmButton = document.querySelector(".edit-course-confirm-button");
const editTitleInput = document.querySelector(".edit-course-title-input");
const editDescriptionInput = document.querySelector(".edit-course-description-input");

const deleteCancelButton = document.querySelector(".delete-course-cancel-button");
const deleteConfirmButton = document.querySelector(".delete-course-confirm-button");
const deleteTitleText = document.querySelector(".delete-course-title-text");

const addPopupTint = document.querySelector(".add-course-popup-tint");
const editPopupTint = document.querySelector(".edit-course-popup-tint");
const deletePopupTint = document.querySelector(".delete-course-popup-tint");
const hiddenTintClass = "popup-tint-hidden";

const processGenCourse = async () => {
    const prompt = genCourseInput.value;
    genCourseButton.disabled = true;
    genCourseButton.innerText = "Генерация...";
    await genCourse(prompt);
    await updateContent();
    genCourseButton.disabled = false;
    genCourseButton.innerText = "Сгенерировать курс";
}

const processAdd = async () => {
    const title = addTitleInput.value;    
    const description = addDescriptionInput.value;
    addConfirmButton.disable = true;
    await addCourse(title, description);
    await updateContent();
    hideAddPopup();
    addConfirmButton.disable = false;
};

const processEdit = async () => {
    const title = editTitleInput.value;
    const description = editDescriptionInput.value;
    editConfirmButton.disabled = true;
    await editCourse(selected.id, title, description);
    await updateContent();
    hideEditPopup();
    editConfirmButton.disabled = false;
}

const processDelete = async () => {
    deleteConfirmButton.disabled = true;
    await deleteCourse(selected.id);
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
		content += genCourseAdmin(item.id, item.title, item.description);
	}
	contentContainer.innerHTML = content;
};

const updateContent = async () => {
	const items = await getAllCourses();
    items.sort((o1, o2) => {
        const d1 = new Date(o1.dateOfCreation);
        const d2 = new Date(o2.dateOfCreation);
        return d2.getTime() - d1.getTime();
    })
	setContent(items);
};

document.addEventListener("click", (e) => {
    const block = e.target.closest(".course-item-container");
    if (!block) return;
    const id = block.getAttribute("data-course-id");
    const title = block.querySelector(".course-item-title").innerText;
    const description = block.querySelector(".course-item-description").innerText;

    if (e.target.closest(".edit-course-button")) {
        setSelected(id, title, description);
        showEditPopup();
        return;
    }

    if (e.target.closest(".delete-course-button")) {
        setSelected(id, title, description);
        showDeletePopup();
        return;
    }
    
    sessionStorage.setItem("course_id", id);
    sessionStorage.setItem("course_title", title);
    sessionStorage.setItem("course_description", description);
    location.href = location.origin + "/admin-lessons.html";
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

genCourseButton.addEventListener("click", processGenCourse);

(async () => {
	await updateContent();
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