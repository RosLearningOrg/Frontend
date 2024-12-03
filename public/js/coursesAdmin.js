import { getAllCourses, addCourse, editCourse, deleteCourse, genCourse, logout } from "./api.js";
import { genCourseAdmin } from "./templates.js";

let selected = {};
let genPopup = {};
const genPopupStates = {
    default: "default",
    generation: "generation",
    completed: "completed"
};

const contentContainer = document.querySelector(".main-content");
const logoutButton = document.querySelector(".logout-button");

const addButton = document.querySelector(".add-course-button");
const addCancelButton = document.querySelector(".add-course-cancel-button");
const addConfirmButton = document.querySelector(".add-course-confirm-button");
const addTitleInput = document.querySelector(".add-course-title-input");
const addDescriptionInput = document.querySelector(".add-course-description-input");
const addTitleError = document.querySelector(".add-course-title-error");
const addDescriptionError = document.querySelector(".add-course-description-error");

const editCancelButton = document.querySelector(".edit-course-cancel-button");
const editConfirmButton = document.querySelector(".edit-course-confirm-button");
const editTitleInput = document.querySelector(".edit-course-title-input");
const editDescriptionInput = document.querySelector(".edit-course-description-input");
const editTitleError = document.querySelector(".edit-course-title-error");
const editDescriptionError = document.querySelector(".edit-course-description-error");

const deleteCancelButton = document.querySelector(".delete-course-cancel-button");
const deleteConfirmButton = document.querySelector(".delete-course-confirm-button");
const deleteTitleText = document.querySelector(".delete-course-title-text");

const genButton = document.querySelector(".gen-course-button");
const genCancelButton = document.querySelector(".gen-course-cancel-button");
const genConfirmButton = document.querySelector(".gen-course-confirm-button");
const genOkButton = document.querySelector(".gen-course-ok-button");
const genTitleInput = document.querySelector(".gen-course-title-input");
const genTitleError = document.querySelector(".gen-course-title-error");

const addPopupTint = document.querySelector(".add-course-popup-tint");
const editPopupTint = document.querySelector(".edit-course-popup-tint");
const deletePopupTint = document.querySelector(".delete-course-popup-tint");
const genPopupTint = document.querySelector(".gen-course-popup-tint");
const hiddenTintClass = "popup-tint-hidden";

const setGenPopup = (genPopupState) => {
    genPopup = genPopupState;
    genTitleInput.value = genPopupState.titleInputValue;
    const isCompleted = genPopupState.state == genPopupStates.completed;
    const isGeneration = genPopupState.state == genPopupStates.generation;

    genPopupTint.querySelector(".popup-container").style.display = 
        isCompleted ? "none" : "flex";
    genPopupTint.querySelector(".popup-completed-container").style.display = 
        isCompleted ? "flex" : "none";

    if (isCompleted) {
        genPopupTint.querySelector(".gen-course-title-text").innerText = 
            genPopupState.titleInputValue;
        return;
    }

    genTitleError.innerText = genPopupState.titleInputError;
    genPopupState.titleInputError 
        ? genTitleInput.classList.add("error-input")
        : genTitleInput.classList.remove("error-input");
    genPopupState.titleInputError
        ? genTitleError.style.display = "inline"
        : genTitleError.style.display = "none";

    genTitleInput.disabled = isGeneration;
    genConfirmButton.disabled = isGeneration;
    genCancelButton.disabled = isGeneration;
    genConfirmButton.innerText = 
        isGeneration ? "Генерация..." : "Сгенерировать курс";
}

const processGenCourse = async () => {
    const prompt = genTitleInput.value.trim();

    if (!prompt) {
        return setGenPopup({
            state: genPopupStates.default,
            titleInputValue: prompt,
            titleInputError: "Введите название"
        });
    }

    setGenPopup({
        state: genPopupStates.generation,
        titleInputValue: prompt,
        titleInputError: null
    });

    const reqData = await genCourse(prompt);

    if (!reqData) {
        return setGenPopup({
            state: genPopupStates.default,
            titleInputValue: prompt,
            titleInputError: "Ошибка сервера"
        });
    }

    await updateContent();

    setGenPopup({
        state: genPopupStates.completed,
        titleInputValue: prompt,
        titleInputError: null
    });
}

const setAddPopupErrors = (errors) => {
    addTitleError.style.display = errors.title ? "inline" : "none";
    addTitleError.innerText = errors.title ?? "";
    errors.title
        ? addTitleInput.classList.add("error-input")
        : addTitleInput.classList.remove("error-input");

    addDescriptionError.style.display = errors.description ? "inline" : "none";
    addDescriptionError.innerText = errors.description ?? "";
    errors.description
        ? addDescriptionInput.classList.add("error-input")
        : addDescriptionInput.classList.remove("error-input");
}

const processAdd = async () => {
    const title = addTitleInput.value.trim();    
    const description = addDescriptionInput.value.trim();

    if (!title || !description) {
        return setAddPopupErrors({
            title: !title ? "Введите название" : "",
            description: !description ? "Введите описание" : ""
        })
    }

    addConfirmButton.disable = true;
    await addCourse(title, description);
    await updateContent();
    hideAddPopup();
    addConfirmButton.disable = false;
};

const setEditPopupErrors = (errors) => {
    editTitleError.style.display = errors.title ? "inline" : "none";
    editTitleError.innerText = errors.title ?? "";
    errors.title
        ? editTitleInput.classList.add("error-input")
        : editTitleInput.classList.remove("error-input");

    editDescriptionError.style.display = errors.description ? "inline" : "none";
    editDescriptionError.innerText = errors.description ?? "";
    errors.description
        ? editDescriptionInput.classList.add("error-input")
        : editDescriptionInput.classList.remove("error-input");
}

const processEdit = async () => {
    const title = editTitleInput.value.trim();
    const description = editDescriptionInput.value.trim();

    if (!title || !description) {
        return setEditPopupErrors({
            title: !title ? "Введите название" : "",
            description: !description ? "Введите описание" : ""
        })
    }

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
    setAddPopupErrors({
        title: "",
        description: ""
    });
    addTitleInput.value = "";
    addDescriptionInput.value = "";
	addPopupTint.classList.remove(hiddenTintClass);
};

const hideAddPopup = () => {
	addPopupTint.classList.add(hiddenTintClass);
};

const showEditPopup = () => {
    setEditPopupErrors({
        title: "",
        description: ""
    });
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

const showGenPopup = () => {
    setGenPopup({
        state: genPopupStates.default,
        titleInputValue: "",
        titleInputError: null
    });
	genPopupTint.classList.remove(hiddenTintClass);
};

const hideGenPopup = () => {
	genPopupTint.classList.add(hiddenTintClass);
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
addTitleInput.oninput = () => {
    setAddPopupErrors({
        title: "",
        description: ""
    });
}
addDescriptionInput.oninput = () => {
    setAddPopupErrors({
        title: "",
        description: ""
    });
}

editCancelButton.addEventListener("click", hideEditPopup);
editConfirmButton.addEventListener("click", processEdit);
editPopupTint.addEventListener("click", (e) => {
	if (!e.target.closest(".popup-container")) {
		hideEditPopup();
	}
});
editTitleInput.oninput = () => {
    setEditPopupErrors({
        title: "",
        description: ""
    });
}
editDescriptionInput.oninput = () => {
    setEditPopupErrors({
        title: "",
        description: ""
    });
}

deleteCancelButton.addEventListener("click", hideDeletePopup);
deleteConfirmButton.addEventListener("click", processDelete);
deletePopupTint.addEventListener("click", (e) => {
	if (!e.target.closest(".popup-container")) {
		hideDeletePopup();
	}
});

genButton.addEventListener("click", showGenPopup);
genCancelButton.addEventListener("click", hideGenPopup);
genOkButton.addEventListener("click", hideGenPopup);
genConfirmButton.addEventListener("click", processGenCourse);
genPopupTint.addEventListener("click", (e) => {
	if (
        !e.target.closest(".popup-container") &&
        genPopup?.state != genPopupStates.generation
    ) {
		hideGenPopup();
	}
});
genTitleInput.addEventListener("input", (e) => {
    if (genPopup?.titleInputError) {
        setGenPopup({
            state: genPopupStates.default,
            titleInputValue: e.target.value,
            titleInputError: null
        });
    }
})

logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await logout();
    location.href = location.origin + "/login.html"
});

setGenPopup({
    state: genPopupStates.default,
    titleInputValue: "",
    titleInputError: null
});

setAddPopupErrors({
    title: "",
    description: ""
});
setEditPopupErrors({
    title: "",
    description: ""
});

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

