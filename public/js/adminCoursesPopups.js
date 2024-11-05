const addCourseTint = document.querySelector(".add-course-popup-tint");
// const editCourseTint = document.querySelector(".edit-course-popup-tint");
// const deleteCourseTint = document.querySelector(".delete-course-popup-tint");

const closeAddCourseBtnDiv = document.querySelector(".close-add-course-popup-btn");
// const closeEditCourseBtnDiv = document.querySelector(".close-edit-course-popup-btn");
// const closeDeleteCourseBtnDiv = document.querySelector(".close-delete-course-popup-btn");

// const dropdown = document.getElementById('menu-id');


document.addEventListener("click", (e) => {
    const item = e.target.closest(".add-course-btn");
	if (item) {
		showAddCoursePopup();
	}
});

// document.addEventListener("click", (e) => {
//     const item = e.target.closest(".edit-course");
// 	if (item) {
// 		showEditCoursePopup();
// 	}
// });

// document.addEventListener("click", (e) => {
//     const item = e.target.closest(".delete-course");
// 	if (item) {
// 		showDeleteCoursePopup();
// 	}
// });

document.addEventListener("click", (e) => {
    const item = e.target.closest(".main-content-info-imgs");
	if (item) {
    event.preventDefault();
    if (dropdown.style.display === 'flex') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'flex';
    }
	}
});

closeAddCourseBtnDiv.addEventListener("click", closeAddPopup);
// closeEditCourseBtnDiv.addEventListener("click", closeEditPopup);
// closeDeleteCourseBtnDiv.addEventListener("click", closeDeletePopup);

addCourseTint.addEventListener("click", (e) =>{
	if (e.target.classList.contains("add-course-popup-tint")) closeAddPopup();
});

// editCourseTint.addEventListener("click", (e) =>{
// 	if (e.target.classList.contains("edit-course-popup-tint")) closeEditPopup();
// });

// deleteCourseTint.addEventListener("click", (e) =>{
// 	if (e.target.classList.contains("delete-course-popup-tint")) closeDeletePopup();
// });



function showAddCoursePopup() {
	addCourseTint.classList.remove("popup-tint-hidden");
}

function closeAddPopup() {
	addCourseTint.classList.add("popup-tint-hidden");
}

// function showEditCoursePopup() {
// 	editCourseTint.classList.remove("edit-course-tint-hidden");
// }

// function closeEditPopup() {
// 	editCourseTint.classList.add("edit-course-tint-hidden");
// }

// function showDeleteCoursePopup() {
// 	deleteCourseTint.classList.remove("delete-course-tint-hidden");
// }

// function closeDeletePopup() {
// 	deleteCourseTint.classList.add("delete-course-tint-hidden");
// }

