const dropdown = document.getElementsByClassName('dropdown-menu')[0];

document.addEventListener("click", (e) => {
    const item = e.target.closest(".open-dropdown-icon");
	if (item) {
    event.preventDefault();
    if (dropdown.style.display === 'flex') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'flex';
    }
	}
});