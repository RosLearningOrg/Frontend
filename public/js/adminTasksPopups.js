const addTaskTint = document.querySelector(".add-task-popup-tint");
const editTaskTint = document.querySelector(".edit-task-popup-tint");
const deleteTaskTint = document.querySelector(".delete-task-popup-tint");

const closeAddTaskBtnDiv = document.querySelector(".close-add-task-popup-btn");
const closeEditTaskBtnDiv = document.querySelector(".close-edit-task-popup-btn");
const closeDeleteTaskBtnDiv = document.querySelector(".close-delete-task-popup-btn");

document.addEventListener("click", (e) => {
    const item = e.target.closest(".add-task-btn");
    if (item) {
        showAddTaskPopup();
    }
});

closeAddTaskBtnDiv.addEventListener("click", closeAddPopup);
closeEditTaskBtnDiv.addEventListener("click", closeEditPopup);
closeDeleteTaskBtnDiv.addEventListener("click", closeDeletePopup);

addTaskTint.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-task-popup-tint")) closeAddPopup();
});

editTaskTint.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-task-popup-tint")) closeEditPopup();
});

deleteTaskTint.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-task-popup-tint")) closeDeletePopup();
});

function showAddTaskPopup() {
    addTaskTint.classList.remove("popup-tint-hidden");
}

export function closeAddPopup() {
    addTaskTint.classList.add("popup-tint-hidden");
}

export function showEditTaskPopup() {
    editTaskTint.classList.remove("popup-tint-hidden");
}

export function closeEditPopup() {
    editTaskTint.classList.add("popup-tint-hidden");
}

export function showDeleteTaskPopup() {
    deleteTaskTint.classList.remove("popup-tint-hidden");
}

export function closeDeletePopup() {
    deleteTaskTint.classList.add("popup-tint-hidden");
}
