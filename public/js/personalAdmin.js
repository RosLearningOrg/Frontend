import { logout, getAllUsers, addUser, editUser, deleteUser } from "/js/api.js";
import { genUserPersonalAdmin } from "/js/templates.js";

let selected = {};
const contentContainer = document.querySelector(".main-content");
const logoutButton = document.querySelector(".sidebar-links-logout");

const addButton = document.querySelector(".add-button");
const addCancelButton = document.querySelector(".close-add-personal-popup-btn");
const addConfirmButton = document.querySelector(".add-personal-popup-create-btn");

const addFullnameInput = document.querySelector(".create-input-fullname");
const addUsernameInput = document.querySelector(".create-input-username");
const addEmailInput = document.querySelector(".create-input-email");
const addPasswordInput = document.querySelector(".create-input-password");

const addFullnameError = document.querySelector(".add-personal-fullname-error");
const addUsernameError = document.querySelector(".add-personal-username-error");
const addEmailError = document.querySelector(".add-personal-email-error");
const addPasswordError = document.querySelector(".add-personal-password-error");

const editCancelButton = document.querySelector(".close-edit-personal-popup-btn");
const editConfirmButton = document.querySelector(".edit-personal-popup-create-btn");

const editFullnameInput = document.querySelector(".edit-input-fullname");
const editUsernameInput = document.querySelector(".edit-input-username");
const editEmailInput = document.querySelector(".edit-input-email");
const editPasswordInput = document.querySelector(".edit-input-password");

const editFullnameError = document.querySelector(".edit-personal-fullname-error");
const editUsernameError = document.querySelector(".edit-personal-username-error");
const editEmailError = document.querySelector(".edit-personal-email-error");
const editPasswordError = document.querySelector(".edit-personal-password-error");

const deleteCancelButton = document.querySelector(".close-delete-personal-popup-btn");
const deleteConfirmButton = document.querySelector(".personal-popup-delete-btn");
// const deleteTitleText = document.querySelector(".delete-lesson-title-text");

const addPopupTint = document.querySelector(".add-personal-popup-tint");
const editPopupTint = document.querySelector(".edit-personal-popup-tint");
const deletePopupTint = document.querySelector(".delete-personal-popup-tint");
const hiddenTintClass = "popup-tint-hidden";

const setAddPopupErrors = (errors) => {
    addFullnameError.style.display = errors.fullname ? "inline" : "none";
    addFullnameError.innerText = errors.fullname ?? "";
    errors.fullname
        ? addFullnameInput.classList.add("error-input")
        : addFullnameInput.classList.remove("error-input");

    addUsernameError.style.display = errors.username ? "inline" : "none";
    addUsernameError.innerText = errors.username ?? "";
    errors.username
        ? addUsernameInput.classList.add("error-input")
        : addUsernameInput.classList.remove("error-input");

    addEmailError.style.display = errors.email ? "inline" : "none";
    addEmailError.innerText = errors.email ?? "";
    errors.email
        ? addEmailInput.classList.add("error-input")
        : addEmailInput.classList.remove("error-input");

    addPasswordError.style.display = errors.password ? "inline" : "none";
    addPasswordError.innerText = errors.password ?? "";
    errors.password
        ? addPasswordInput.classList.add("error-input")
        : addPasswordInput.classList.remove("error-input");
    
}

const setEditPopupErrors = (errors) => {
    editFullnameError.style.display = errors.fullname ? "inline" : "none";
    editFullnameError.innerText = errors.fullname ?? "";
    errors.fullname
        ? editFullnameInput.classList.add("error-input")
        : editFullnameInput.classList.remove("error-input");

    editUsernameError.style.display = errors.username ? "inline" : "none";
    editUsernameError.innerText = errors.username ?? "";
    errors.username
        ? editUsernameInput.classList.add("error-input")
        : editUsernameInput.classList.remove("error-input");

    editEmailError.style.display = errors.email ? "inline" : "none";
    editEmailError.innerText = errors.email ?? "";
    errors.email
        ? editEmailInput.classList.add("error-input")
        : editEmailInput.classList.remove("error-input");

    editPasswordError.style.display = errors.password ? "inline" : "none";
    editPasswordError.innerText = errors.password ?? "";
    errors.password
        ? editPasswordInput.classList.add("error-input")
        : editPasswordInput.classList.remove("error-input");
}

const processAdd = async () => {
    const fullname = addFullnameInput.value.trim();    
    const username = addUsernameInput.value.trim();    
    const email = addEmailInput.value.trim();
    const password = addPasswordInput.value.trim();

    if (!fullname || !email || !password || !username) {
        return setAddPopupErrors({
            fullname: !fullname ? "Введите ФИО" : "",
            username: !username ? "Введите юзернейм" : "",
            email: !email ? "Введите почту" : "",
            password: !password ? "Введите пароль" : ""
        })
    }
    addConfirmButton.disable = true;
    await addUser(fullname, username, email, password);
    await updateContent();
    hideAddPopup();
    addConfirmButton.disable = false;
};

setAddPopupErrors({
    fullname: "",
    email: "",
    password: ""
});

addFullnameInput.oninput = () => {
    setAddPopupErrors({
        fullname: "",
        email: "",
        password: ""
    });
}
addEmailInput.oninput = () => {
    setAddPopupErrors({
        fullname: "",
        email: "",
        password: ""
    });
}

addPasswordInput.oninput = () => {
    setAddPopupErrors({
        fullname: "",
        email: "",
        password: ""
    });
}

const processEdit = async () => {
    const fullname = editFullnameInput.value.trim();
    const username = editUsernameInput.value.trim();
    const email = editEmailInput.value.trim();
    const password = editPasswordInput.value.trim();

    if (!fullname || !email || !username || !password) {
        return setEditPopupErrors({
            fullname: !fullname ? "Введите ФИО" : "",
            username: !username ? "Введите юзернейм" : "",
            email: !email ? "Введите почту" : "",
            password: !password ? "Введите пароль" : ""
        })
    }

    editConfirmButton.disabled = true;
    await editUser(fullname, username, email, password);
    await updateContent();
    hideEditPopup();
    editConfirmButton.disabled = false;
}

setEditPopupErrors({
    fullname: "",
    email: ""
});

editFullnameInput.oninput = () => {
    setEditPopupErrors({
        fullname: "",
        email: ""
    });
}
editEmailInput.oninput = () => {
    setEditPopupErrors({
        fullname: "",
        email: ""
    });
}

const processDelete = async () => {
    deleteConfirmButton.disabled = true;
    await deleteUser(selected.username);
    await updateContent();
    hideDeletePopup();
    deleteConfirmButton.disabled = false;
}

const showAddPopup = () => {
    setAddPopupErrors({
        fullname: "",
        email: "",
        password: ""
    })
    addFullnameInput.value = "";
    addEmailInput.value = "";
    addPasswordInput.value = "";
	addPopupTint.classList.remove(hiddenTintClass);
};

const hideAddPopup = () => {
	addPopupTint.classList.add(hiddenTintClass);
};

const showEditPopup = () => {
    setEditPopupErrors({
        fullname: "",
        email: "",
        password: ""
    })
    editFullnameInput.value = selected.fullname;
    editUsernameInput.value = selected.username;
    editEmailInput.value = selected.email;
    editPasswordInput.value = "";
	editPopupTint.classList.remove(hiddenTintClass);
};

const hideEditPopup = () => {
    setSelected(null, null, null);
	editPopupTint.classList.add(hiddenTintClass);
};

const showDeletePopup = () => {
    // deleteTitleText.innerText = `"${selected.title}"`;
	deletePopupTint.classList.remove(hiddenTintClass);
};

const hideDeletePopup = () => {
    setSelected(null, null, null);
	deletePopupTint.classList.add(hiddenTintClass);
};

const setSelected = (id, fullname, username, email) => {
    selected = {
        id: id,
        fullname: fullname,
        username: username,
        email: email,
    }
}

const setContent = (users) => {
	let content = "";
	for (let item of users) {
		content += genUserPersonalAdmin(item.id, item.name, item.username, item.email);
	}
	contentContainer.innerHTML = content;
};

const updateContent = async () => {
	const items = await getAllUsers();
	setContent(items);
};

document.addEventListener("click", (e) => {
    const block = e.target.closest(".personal-item-container");
    if (!block) return;
    const id = block.getAttribute("data-personal-id");
    const fullname = block.querySelector(".personal-item-name").innerText;
    const email = block.querySelector(".personal-item-email").innerText;
    const username = block.getAttribute("data-username");

    if (e.target.closest(".edit-personal-button")) {
        setSelected(id, fullname, username, email);
        showEditPopup();
        return;
    }

    if (e.target.closest(".delete-personal-button")) {
        setSelected(id, fullname, username, email);
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
	await updateContent();
})();

document.addEventListener("click", (e) => {
    const manageButton = e.target.closest(".view-material-btn")

    if (manageButton) {
        window.location.href = window.location.origin + "/admin-materials.html";
    }
});
