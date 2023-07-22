
import isEmail from 'validator/es/lib/isEmail';

const elements = {
    interactiveEl: document.querySelector(".interactive-link"),
    burgerMenuEl: document.querySelector(".burger-menu"),
    sectionsArr: Array.from(document.querySelectorAll(".section")),
    burgerMenuLinksArr: Array.from(document.querySelectorAll(".burger-menu-link")),
    pickedCathegory: undefined,
    teamListContainer: document.querySelector(".team-list-container"),
    teamList: document.querySelector(".team-list"),
    teamArr: [],
    teamContsArr: [],
    rightButton: document.querySelector(".right-team-button"),
    leftButton: document.querySelector(".left-team-button"),
    mainContEl: document.createElement("div"),
    mainEl: document.querySelector("main"),
    bodyEl: document.querySelector("body"),
    userNameSpanEl: document.querySelector(".name-span"),
    footerFormEl: document.querySelector(".footer-form"),
    lightModeButtonEl: document.querySelector(".light-mode-button"),
}

// Team Section

elements.mainContEl.classList.add("main-team-cont");

const team = [
    {id: 0, name: "Учасник 1", occupation: "Верстка сайту"},
    {id: 1, name: "Учасник 2", occupation: "Верстка сайту"},
    {id: 2, name: "Учасник 3", occupation: "Верстка сайту"},
    {id: 3, name: "Учасник 4", occupation: "Верстка сайту"},
    {id: 4, name: "Учасник 5", occupation: "Верстка сайту"},
    {id: 5, name: "Учасник 6", occupation: "Верстка сайту"},
    {id: 6, name: "Учасник 7", occupation: "Верстка сайту"},
    {id: 7, name: "Учасник 8", occupation: "Верстка сайту"},
    {id: 8, name: "Учасник 9", occupation: "Верстка сайту"},
    {id: 9, name: "Учасник 10", occupation: "Верстка сайту"},
    {id: 10, name: "Учасник 11", occupation: "Верстка сайту"},
];

team.forEach((member) => {
    const itemEl = document.createElement("li");
    const imageEl = document.createElement("img");
    const titleEl = document.createElement("h3");
    const textEl = document.createElement("p");

    itemEl.classList.add("team-item");
    itemEl.classList.add("team-item-left");
    imageEl.classList.add("team-image");
    titleEl.classList.add("team-title");
    textEl.classList.add("team-text");
    

    const contEl = document.createElement("div");
    contEl.classList.add("team-cont");
    elements.mainContEl.append(contEl);
    elements.teamContsArr.push(contEl);

    titleEl.textContent = member.name;
    textEl.textContent = member.occupation;

    itemEl.append(imageEl, titleEl, textEl);
    elements.teamList.append(itemEl)
    elements.teamArr.push(itemEl);
})

elements.teamArr[0].classList.replace("team-item-left", "team-item-picked");
elements.teamContsArr[elements.teamContsArr.length - 1].classList.add("team-cont-picked");

elements.teamListContainer.append(elements.mainContEl)

const moveOnrightFunction = () => {

    const index = elements.teamArr.findIndex((teammate) => teammate.classList.contains("team-item-picked"));

    if (index === 10) {
        return
    }

    const contIndex = elements.teamContsArr.length - index - 1;
    const teammateToLeave = elements.teamArr[index];
    const teammateToCome = elements.teamArr[index + 1];
    
    teammateToLeave.classList.replace("team-item-picked", "team-item-right");
    teammateToCome.classList.replace("team-item-left", "team-item-picked");

    elements.teamContsArr[contIndex].classList.remove("team-cont-picked");
    elements.teamContsArr[contIndex - 1].classList.add("team-cont-picked");
}

const moveOnLeftFunction = () => {
    
    const index = elements.teamArr.findIndex((teammate) => teammate.classList.contains("team-item-picked"));

    if (index === 0) {
        return
    }

    const contIndex = elements.teamContsArr.length - index - 1;
    const teammateToLeave = elements.teamArr[index];
    const teammateToCome = elements.teamArr[index - 1];

    teammateToLeave.classList.replace("team-item-picked", "team-item-left");
    teammateToCome.classList.replace("team-item-right", "team-item-picked");

    elements.teamContsArr[contIndex + 1].classList.add("team-cont-picked");
    elements.teamContsArr[contIndex].classList.remove("team-cont-picked");
}

elements.rightButton.addEventListener("click", moveOnrightFunction);

elements.leftButton.addEventListener("click", moveOnLeftFunction);

// Burger Menu Interactive

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

// Modal Windows

const modalWindow = document.createElement("div");
modalWindow.classList.add("modal-window");

const backdrop = document.createElement("div");
backdrop.classList.add("backdrop");

elements.bodyEl.classList.add("backdrop-active");

modalWindow.innerHTML = `
    <p class="modal-window__text">Привіт!<br>
        Ви потрапили на сайт інтерактивних ігор та завдань
        Надіємось, що вам сподобається і ви отримаєте позитивні емоції!
        Бажаємо Вам гарно провести час!</p>
    <form class="modal-window__form">
        <label for="modal-input" class="modal-window__label">Введіть своє ім’я:</label>
        <input name="nameInput" required placeholder="Ваше ім’я..." id="modal-input" type="text" class="modal-window__input">
        <button type="submit" class="modal-window__button">Зберегти</button>
    </form>
`

const closeModalButton = document.createElement("button");
closeModalButton.classList.add("close-modal-button");
closeModalButton.innerHTML = `
    <svg class="close-modal-button__svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M1 1L8.5 8.5M16 16L8.5 8.5M8.5 8.5L16 1L1 16" stroke="black"/>
    </svg>
`;
modalWindow.prepend(closeModalButton);

closeModalButton.addEventListener("click", closeModalWindowFunction);

backdrop.append(modalWindow);
elements.mainEl.prepend(backdrop);

const windowFormEl = document.querySelector(".modal-window__form");

windowFormEl.addEventListener("submit", sendFormFunction);

function sendFormFunction(event) {
    event.preventDefault();

    const userName = event.currentTarget.elements.nameInput.value;
    elements.userNameSpanEl.textContent = userName;

    backdrop.classList.add("isNotActive");
    elements.bodyEl.classList.remove("backdrop-active");
}

// Subscribe

elements.footerFormEl.addEventListener("submit", submitSubscriteFunction);

function submitSubscriteFunction(event) {
    event.preventDefault();
    const input = event.currentTarget.elements.footerMail;

    if(!isEmail(input.value)) {
        alert("Введено неправильну пошту. Спробуйте ще раз");
        input.value = "";
        return
    } 

    backdrop.classList.remove("isNotActive");
    elements.bodyEl.classList.add("backdrop-active");
    modalWindow.classList.add("modal-window-subscribe");

    input.value = "";

    modalWindow.innerHTML = `
        <p class="modal-window__text">Дякую за підписку!</p>
    `;
    modalWindow.prepend(closeModalButton);
}

function closeModalWindowFunction() {
    backdrop.classList.add("isNotActive");
    elements.bodyEl.classList.remove("backdrop-active");
    modalWindow.classList.remove("modal-window-subscribe");
}

// Dark theme

elements.lightModeButtonEl.addEventListener("click", changeModeFunction);

function changeModeFunction(event) {
    elements.lightModeButtonEl.classList.toggle("darkMode");
    elements.bodyEl.classList.toggle("darkMode");
}