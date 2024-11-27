export const API_URL = "http://localhost:8080";

export const addCourse = async (title, description) => {
    const body = {
        title: title,
        description: description
    }

    try {
        return await postRequest("/api/admin/createCourse", body);
    } catch {
        return null;
    }
};

export const editCourse = async (id, title, description) => {
    const body = {
        title: title,
        description: description
    }

    try {
        return await postRequest(`/api/admin/updateCourse?course_id=${id}`, body);
    } catch {
        return null;
    }
};

export const deleteCourse = async (id) => {
	try {
		return await getRequest(`/api/admin/deleteCourse?course_id=${id}`);
	} catch {
		return null;
	}
};

export const getAllCourses = async () => {
	try {
		return await getRequest("/api/admin/getAllCourses");
	} catch {
		logout();
	}
};

export const addLesson = async (title, description) => {
    const body = {
        title: title,
        description: description
    }

    try {
        return await postRequest("/api/admin/createTheme", body);
    } catch {
        return null;
    }
};

export const editLesson = async (id, title, description) => {
    const body = {
        title: title,
        description: description
    }

    try {
        return await postRequest(`/api/admin/updateTheme?theme_id=${id}`, body);
    } catch {
        return null;
    }
};

export const deleteCourseLesson = async (id, courseId) => {
	try {
		return await getRequest(`/api/admin/removeCourseThemes?course_id=${courseId}&theme_id=${id}`);
	} catch {
		return null;
	}
};

export const deleteLesson = async (id) => {
	try {
		return await getRequest(`/api/admin/deleteTheme?theme_id=${id}`);
	} catch {
		return null;
	}
};

export const addCourseLesson = async (id, courseId) => {
	try {
		return await getRequest(`/api/admin/addCourseThemes?course_id=${courseId}&theme_id=${id}`);
	} catch {
		return null;
	}
};

export const getAllLessons = async (courseId) => {
	try {
		return await getRequest(`/api/admin/getCourseThemes?course_id=${courseId}`);
	} catch {
		logout();
	}
};

export const addTask = async (title, description) => {
    const body = {
        title: title,
        description: description
    }

    try {
        return await postRequest("/api/admin/createTask", body);
    } catch {
        return null;
    }
};

export const editTask = async (id, title, description) => {
    const body = {
        title: title,
        description: description
    }

    try {
        return await postRequest(`/api/admin/updateTask?task_id=${id}`, body);
    } catch {
        return null;
    }
};

export const deleteLessonTask = async (id, theme_id) => {
	try {
		return await getRequest(`/api/admin/removeThemeTask?theme_id=${theme_id}&task_id=${id}`);
	} catch {
		return null;
	}
};

export const deleteTask = async (id) => {
	try {
		return await getRequest(`/api/admin/deleteTask?task_id=${id}`);
	} catch {
		return null;
	}
};

export const addLessonTask = async (id, lessonId) => {
	try {
		return await getRequest(`/api/admin/addThemeTask?theme_id=${lessonId}&task_id=${id}`);
	} catch {
		return null;
	}
};

export const getAllTasks = async (lessonId) => {
	try {
		return await getRequest(`/api/admin/getThemeTasks?theme_id=${lessonId}`);
	} catch {
        return null;
	}
};

export const genCourse = async (name) => {
	try {
		return await getRequest(`/generateData?course_name=${name}`);
	} catch {
        return null;
	}
};

export const getCSRF = async () => {
	try {
		const data = await getRequest("/api/csrf");
        return data.token;
	} catch {
		return null;
	}
};

export const getCurrentUser = async () => {
	try {
		return await getRequest("/api/current-user");
	} catch {
		return null;
	}
};

export const logout = async () => {
	try {
		return await getRequest("/api/logout");
	} catch {
		return null;
	}
};

export const getRequest = async (endpoint) => {
	const init = {
		method: "GET",
		credentials: "include",
	};

	const resp = await fetch(API_URL + endpoint, init);
	const data = await resp.json();
	return data;
};

export const postRequest = async (endpoint, body) => {
    const csrf = await getCSRF();
	const init = {
		method: "POST",
        credentials: "include",
        headers: {
			"Content-Type": "application/json",
			"X-CSRF-TOKEN": csrf,
		},
        body: JSON.stringify(body),
	};

    const resp = await fetch(API_URL + endpoint, init);
    const data = await resp.json();
    return data;
};
