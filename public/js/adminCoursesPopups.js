const addCourseTint = document.querySelector(".add-course-popup-tint");
const editCourseTint = document.querySelector(".edit-course-popup-tint");
const deleteCourseTint = document.querySelector(".delete-course-popup-tint");

const closeAddCourseBtnDiv = document.querySelector(".close-add-course-popup-btn");
const closeEditCourseBtnDiv = document.querySelector(".close-edit-course-popup-btn");
const closeDeleteCourseBtnDiv = document.querySelector(".close-delete-course-popup-btn");

document.addEventListener("click", (e) => {
    const item = e.target.closest(".add-course-btn");
    if (item) {
        showAddCoursePopup();
    }
});

closeAddCourseBtnDiv.addEventListener("click", closeAddPopup);
closeEditCourseBtnDiv.addEventListener("click", closeEditPopup);
closeDeleteCourseBtnDiv.addEventListener("click", closeDeletePopup);

addCourseTint.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-course-popup-tint")) closeAddPopup();
});

editCourseTint.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-course-popup-tint")) closeEditPopup();
});

deleteCourseTint.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-course-popup-tint")) closeDeletePopup();
});



function showAddCoursePopup() {
    addCourseTint.classList.remove("popup-tint-hidden");
}

export function closeAddPopup() {
    addCourseTint.classList.add("popup-tint-hidden");
}

export function showEditCoursePopup() {
    editCourseTint.classList.remove("popup-tint-hidden");
}

function closeEditPopup() {
    editCourseTint.classList.add("popup-tint-hidden");
}

export function showDeleteCoursePopup() {
    deleteCourseTint.classList.remove("popup-tint-hidden");
}

function closeDeletePopup() {
    deleteCourseTint.classList.add("popup-tint-hidden");
}

