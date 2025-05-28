const toggleButtons = document.querySelectorAll(".toggle_menu");
const bodyElement = document.body;
toggleButtons.forEach(button => {
    button.addEventListener("click", function() {
        if (bodyElement.classList.contains("show__menu")) {
            bodyElement.classList.remove("show__menu");
        } else {
            bodyElement.classList.add("show__menu");
        }
    });
});