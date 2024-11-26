const addLessonTint = document.querySelector(".add-lesson-popup-tint");
const editLessonTint = document.querySelector(".edit-lesson-popup-tint");
const deleteLessonTint = document.querySelector(".delete-lesson-popup-tint");

const closeAddLessonBtnDiv = document.querySelector(".close-add-lesson-popup-btn");
const closeEditLessonBtnDiv = document.querySelector(".close-edit-lesson-popup-btn");
const closeDeleteLessonBtnDiv = document.querySelector(".close-delete-lesson-popup-btn");

document.addEventListener("click", (e) => {
    const item = e.target.closest(".add-lesson-btn");
    if (item) {
        showAddLessonPopup();
    }
});

closeAddLessonBtnDiv.addEventListener("click", closeAddPopup);
closeEditLessonBtnDiv.addEventListener("click", closeEditPopup);
closeDeleteLessonBtnDiv.addEventListener("click", closeDeletePopup);

addLessonTint.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-lesson-popup-tint")) closeAddPopup();
});

editLessonTint.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-lesson-popup-tint")) closeEditPopup();
});

deleteLessonTint.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-lesson-popup-tint")) closeDeletePopup();
});



export function showAddLessonPopup() {
    addLessonTint.classList.remove("popup-tint-hidden");
}

export function closeAddPopup() {
    addLessonTint.classList.add("popup-tint-hidden");
}

export function showEditLessonPopup() {
    editLessonTint.classList.remove("popup-tint-hidden");
}

export function closeEditPopup() {
    editLessonTint.classList.add("popup-tint-hidden");
}

export function showDeleteLessonPopup() {
    deleteLessonTint.classList.remove("popup-tint-hidden");
}

export function closeDeletePopup() {
    deleteLessonTint.classList.add("popup-tint-hidden");
}
