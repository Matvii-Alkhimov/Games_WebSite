
const elements = {
    interactiveEl: document.querySelector(".interactive-link"),
    burgerMenuEl: document.querySelector(".burger-menu"),
    sectionsArr: Array.from(document.querySelectorAll(".section")),
    burgerMenuLinksArr: Array.from(document.querySelectorAll(".burger-menu-link")),
    pickedCathegory: undefined,

}

window.addEventListener("click", (event)=> {
    if (event.target.nodeName === "A") {
        return
    }
    elements.burgerMenuEl.classList.remove("isOpen")
})

elements.interactiveEl.addEventListener("click", openBurgerMenuFunction);

function openBurgerMenuFunction(event) {
    event.preventDefault();
    const b = document.querySelector(".burger-menu");
    b.classList.toggle("isOpen");
}

elements.burgerMenuEl.addEventListener("click", chooseCathegoryFunction);

function chooseCathegoryFunction(event) {
    event.preventDefault();
    if (elements.pickedCathegory === event.target) {
        event.target.classList.remove("picked");
        elements.sectionsArr.forEach((section) => section.classList.remove("isNotActive"));
        elements.pickedCathegory = undefined;
        return
    }
    elements.pickedCathegory = event.target;
    console.log(elements.pickedCathegory)
    elements.burgerMenuLinksArr.forEach((link) => link.classList.remove("picked"))
    if (event.target.nodeName !== "A") {
        return
    }
    event.target.classList.toggle("picked");
    const type = event.target.textContent;
    if (type === "Числовий") {
        elements.sectionsArr.forEach((section) => section.dataset.type === "numerical" 
        ? section.classList.remove("isNotActive") : section.classList.add("isNotActive"));
    } else if (type === "Ігровий") {
        elements.sectionsArr.forEach((section) => section.dataset.type === "game" 
        ? section.classList.remove("isNotActive") : section.classList.add("isNotActive"));
    } else if (type === "Ознайомчий") {
        elements.sectionsArr.forEach((section) => section.dataset.type === "acquaintance" 
        ? section.classList.remove("isNotActive") : section.classList.add("isNotActive"));
    }

}
