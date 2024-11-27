import { API_URL, logout } from "/js/main.js";

const materialAddPopupTint = document.querySelector(".add-material-popup-tint");
const contentContainer = document.getElementsByClassName("main-content")[0];

const addButton = document.querySelector(".add-button");

const addMaterialTint = document.querySelector(".add-material-popup-tint");

const closeAddPopupButton = document.querySelector(".close-add-material-popup-btn");
const createAddPopupButton = document.querySelector(".add-material-popup-create-btn");

createAddPopupButton.addEventListener("click", (e) => {
    // TODO: create
    console.log("CREATE");
});

materialAddPopupTint.addEventListener("click", (e) => {
	if (e.target.classList.contains("add-material-popup-tint")) closeAddMaterials();
});

addButton.addEventListener("click", (e) => {
    showAddMaterialPopup();
});

function showAddMaterialPopup() {
    addMaterialTint.classList.remove("popup-tint-hidden");
}

function closeAddMaterials() {
    addMaterialTint.classList.add("popup-tint-hidden");
}

closeAddPopupButton.addEventListener("click", (e) => {
    closeAddMaterials();
});


const getMaterials = async () => {
	const init = {
		method: "GET",
		credentials: "include",
	};

	try {
        const resp = await fetch(API_URL + `/admin/getAllMaterials`,init);
		const data = await resp.json();
		setContent(data);
	} catch {
		logout();
	}
};

const setContent = (data) => {
	let content = "";

	for (let item of data) {
        content += `
                <div href="" class="material-item-container" draggable="false">
                    <div class="material-item-info">
                        <p class="material-item-title">${item.title}</p>
                    </div>
                    <div class="icon-container edit-material">
                        <img class="edit-material-image" src="images/edit.svg" alt="">
                    </div>
                    <div class="icon-container delete-material">
                        <img class="delete-material-image" src="images/delete.svg" alt="">
                    </div>
                </div>
        `;
	}
	contentContainer.innerHTML = content;
};

(async () => {
	await getMaterials();

    const editButton = document.querySelector(".edit-material");
    const deleteButton = document.querySelector(".delete-material");

    const editMaterialTint = document.querySelector(".edit-material-popup-tint");
    const deleteMaterialTint = document.querySelector(".delete-material-popup-tint");

    const materialEditPopupTint = document.querySelector(".edit-material-popup-tint");
    const materialDeletePopupTint = document.querySelector(".delete-material-popup-tint");

    const closeEditPopupButton = document.querySelector(".close-edit-material-popup-btn");
    const editPopupButton = document.querySelector(".edit-material-popup-create-btn");
    const closeDeletePopupButton = document.querySelector(".close-delete-material-popup-btn");
    const deletePopupButton = document.querySelector(".material-popup-delete-btn");

    materialEditPopupTint.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-material-popup-tint")) closeEditMaterials();
    });

    materialDeletePopupTint.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-material-popup-tint")) closeDeleteMaterials();
    });

    editButton.addEventListener("click", (e) => {
        showEditMaterialPopup();
    });

    deleteButton.addEventListener("click", (e) => {
        showDeleteMaterialPopup();
    });

    closeEditPopupButton.addEventListener("click", (e) => {
        closeEditMaterials();
    });

    closeDeletePopupButton.addEventListener("click", (e) => {
        closeDeleteMaterials();
    });

    editPopupButton.addEventListener("click", (e) => {
        // TODO: edit
        console.log("EDIT");
    });

    deletePopupButton.addEventListener("click", (e) => {
        // TODO: delete
        console.log("DELETE");
    });

    function showEditMaterialPopup() {
        editMaterialTint.classList.remove("popup-tint-hidden");
    }

    function showDeleteMaterialPopup() {
        deleteMaterialTint.classList.remove("popup-tint-hidden");
    }

    function closeEditMaterials() {
        editMaterialTint.classList.add("popup-tint-hidden");
    }

    function closeDeleteMaterials() {
        deleteMaterialTint.classList.add("popup-tint-hidden");
    }

})();

document.addEventListener("click", (e) => {
    const logoutDiv = e.target.closest(".sidebar-links-logout");

    if (logoutDiv) {
        logout();
        window.location.href = window.location.origin + "/login.html";
    }
});

