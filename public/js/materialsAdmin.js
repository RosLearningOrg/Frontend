import { API_URL, logout } from "/js/main.js";
import { getRequest, postRequest } from "/js/api.js";

const materialAddPopupTint = document.querySelector(".add-material-popup-tint");
const contentContainer = document.getElementsByClassName("main-content")[0];

const addButton = document.querySelector(".add-button");

const addMaterialTint = document.querySelector(".add-material-popup-tint");

const closeAddPopupButton = document.querySelector(".close-add-material-popup-btn");
const createAddPopupButton = document.querySelector(".add-material-popup-create-btn");

var allMaterials;
var currentMaterial;
var materialIDToDelete;

createAddPopupButton.addEventListener("click", (e) => {
    const inputTitle = document.querySelector(".create-input-title");
    const inputText = document.querySelector(".add-material-popup-textarea");

    if (inputTitle.value != null && inputText.value != null) {

        const createMaterial = async () => {
            const data = await postRequest("/api/admin/createThemeMaterial", {
                        title: inputTitle.value,
                        materialType: "Учебник",
                        materialURL: "https://example.com/",
                        materialText: inputText.value,
                        materialTextMD: inputText.value
            });

            if (data) {
                closeAddMaterials();
                alert(`Материал ${data.title} успешно создан`);
                getMaterials();
            } else {
                alert("Ошибка!");
            }
  
            };

            (async () => {
                await createMaterial();
            })();
    }
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
    const data = await getRequest(`/api/admin/getAllMaterials`);
    setContent(data);
    allMaterials = data;
};

const setContent = (data) => {
	let content = "";

	for (let item of data) {
        content += `
                <div href="" class="material-item-container" draggable="false" data-material-id=${item.id}>
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

    document.addEventListener("click", (e) => {
        const editButton = e.target.closest(".edit-material");

        if (editButton) {
            const materialID = editButton.parentNode.getAttribute("data-material-id");

            for (let material of allMaterials) {
                if (material.id == materialID) {
                    currentMaterial = material;
                    break;
                }
            }
            showEditMaterialPopup();
            const titleDIv = document.querySelector(".edit-input-title");
            const textDiv = document.querySelector(".edit-material-popup-textarea");
            titleDIv.value = currentMaterial.title;
            textDiv.value = currentMaterial.materialTextMD;
        }
    });

    editPopupButton.addEventListener("click", async (e) => {
        const title = document.querySelector(".edit-input-title").value;
        const text = document.querySelector(".edit-material-popup-textarea").value;

        const body = {
            title: title,
            materialType: "Учебник",
            materialURL: "https://example.com/",
            materialText: text,
            materialTextMD: text
        }
        
        const data = await postRequest(`/api/admin/updateThemeMaterial?material_id=${currentMaterial.id}`, body);
        if (data) {
            closeEditMaterials();
            alert(`Материал ${title} успешно обновлен`)
            getMaterials();
        } else {
            alert("Ошибка!");
        }
    });

    document.addEventListener("click", (e) => {
        const deleteButton = e.target.closest(".delete-material");
        
        if (deleteButton) {
            const materialID = deleteButton.parentNode.getAttribute("data-material-id");
            materialIDToDelete = materialID;
            showDeleteMaterialPopup();
        }
    });

    deletePopupButton.addEventListener("click", async (e) => {
        const resp = await getRequest(`/api/admin/deleteThemeMaterial?material_id=${materialIDToDelete}`);
        console.log(resp);
        if (resp) {
            closeDeleteMaterials();
            alert(`Материал с id: ${materialIDToDelete} успешно удален`);
            getMaterials();
        } else {
            alert("Ошибка!");
        }
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

document.addEventListener("click", (e) => {
    const personalButton = e.target.closest(".view-personal-btn")

    if (personalButton) {
        window.location.href = window.location.origin + "/admin-personal.html";
    }
});
