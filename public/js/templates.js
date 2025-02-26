
export const genCoursePersonalItem = (id, name, isAdded) => {
    return `
        <div class="course-personal-item" data-user-id=${id}>
            <div class="course-personal-name">${name}</div>
            ${isAdded 
                    ? "<div class='course-personal-remove-button'>Убрать</div>" 
                    : "<div class='course-personal-add-button'>Добавить</div>"
            }
        </div>
    `;
}

export const genCourseAdmin = (id, title, description) => {
	return `
        <div class="course-item-container hoverable" draggable="false" data-course-id=${id}>
            <div class="course-item-info">
                <p class="course-item-title">${title}</p>
                <p class="course-item-description hint">${description}</p>
            </div>

            <div class="icon-container edit-course-personal-button">
                <img class="course-item-personal-icon" src="./images/fluent_people-28-regular.svg" alt="">
            </div>
            <div class="icon-container edit-course-button">
                <img src="images/edit.svg" alt="">
            </div>
            <div class="icon-container delete-course-button">
                <img src="images/delete.svg" alt="">
            </div>
        </div>
    `;
};

export const genLessonAdmin = (id, title, description) => {
	return `
        <div class="lesson-item-container hoverable" draggable="false" data-lesson-id=${id}>
            <div class="lesson-item-info">
                <p class="lesson-item-title">${title}</p>
                <p class="lesson-item-description hint">${description}</p>
            </div>
            <div class="icon-container open-materials-icon">
                <img class="lesson-item-note-icon" src="images/info.svg" alt="">
            </div>
            <div class="icon-container edit-lesson-button">
                <img src="images/edit.svg" alt="">
            </div>
            <div class="icon-container delete-lesson-button">
                <img src="images/delete.svg" alt="">
            </div>
        </div>
    `;
};

export const genTaskAdmin = (id, title, description) => {
	return `
        <div class="task-item-container hoverable" data-task-id=${id}>
            <p class="task-item-title">${title}</p>
            <p class="task-item-description hint" style="display: none;">${description}</p>
            <div class="icon-buttons ">
                <div class="icon-container edit-task-button">
                    <img src="images/edit.svg" alt="">
                </div>
                <div class="icon-container delete-task-button">
                    <img src="images/delete.svg" alt="">
                </div>
            </div>
        </div>
    `;
};

export const genUserPersonalAdmin = (id, name, username, email) => {
	return `
        <div class="personal-item-container hoverable" draggable="false" 
                data-personal-id=${id} data-username=${username}>
            <div class="personal-item-info">
                <p class="personal-item-name">${name}</p>
                <p class="personal-item-email hint">${email}</p>
            </div>
            <div class="icon-container edit-personal-button">
                <img src="images/edit.svg" alt="">
            </div>
            <div class="icon-container delete-personal-button">
                <img src="images/delete.svg" alt="">
            </div>
        </div>
    `;
};


