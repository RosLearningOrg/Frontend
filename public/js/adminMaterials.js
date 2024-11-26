import { API_URL, logout } from "/js/main.js";

const contentContainer = document.getElementsByClassName("main-content")[0];

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
                <a href="" class="material-item-container" draggable="false">
                    <div class="material-item-info">
                        <p class="material-item-title">${item.title}</p>
                    </div>
                    <div class="icon-container edit-material">
                        <img class="" src="images/edit.svg" alt="">
                    </div>
                    <div class="icon-container delete-material">
                        <img class="" src="images/delete.svg" alt="">
                    </div>
                </a>
        `;
	}
	contentContainer.innerHTML = content;
};

(async () => {
	await getMaterials();  
})();

document.addEventListener("click", (e) => {
    const logoutDiv = e.target.closest(".sidebar-links-logout");

    if (logoutDiv) {
        logout();
        window.location.href = window.location.origin + "/login.html";
    }
});
