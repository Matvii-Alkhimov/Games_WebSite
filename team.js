const elements = {
    teamListContainer: document.querySelector(".team-list-container"),
    teamList: document.querySelector(".team-list"),
    teamArr: [],
    teamContsArr: [],
    rightButton: document.querySelector(".right-team-button"),
    leftButton: document.querySelector(".left-team-button"),
    mainContEl: document.createElement("div"),

}

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
];

team.forEach((member) => {
    const itemEl = document.createElement("li");
    const imageEl = document.createElement("img");
    const titleEl = document.createElement("h3");
    const textEl = document.createElement("p");

    itemEl.classList.add("team-item");
    itemEl.classList.add("team-item-on-left");
    imageEl.classList.add("team-image");
    titleEl.classList.add("team-title");
    textEl.classList.add("team-text");
    

    const contEl = document.createElement("div");
    contEl.classList.add("team-cont");
    elements.mainContEl.append(contEl);
    elements.teamContsArr.push(contEl);

    elements.teamContsArr[0].classList.add("team-cont-picked");

    if (member.id === 0) {
        itemEl.classList.remove("team-item-on-left");
        itemEl.classList.add( "team-item-seen-now");
    }

    titleEl.textContent = member.name;
    textEl.textContent = member.occupation;

    itemEl.append(imageEl, titleEl, textEl);
    elements.teamList.append(itemEl)
    elements.teamArr.push(itemEl);
})

elements.teamListContainer.append(elements.mainContEl)

const moveOnrightFunction = () => {
    const itemToMove = elements.teamArr.find((item) => item.classList.contains("team-item-seen-now"));
    let index = elements.teamArr.indexOf(itemToMove) + 1;
    const newItem = elements.teamArr[index]
    
    newItem.classList.add("team-item-next");
    newItem.style.animationName = "moveOnRightNew";
    itemToMove.classList.remove("team-item-seen-now", "team-item-next", "team-item-on-left");
    newItem.classList.add("team-item-seen-now");
    itemToMove.classList.add("ert");

    elements.teamContsArr[index - 1].classList.remove("team-cont-picked");
    elements.teamContsArr[index].classList.add("team-cont-picked");

}

const moveOnLeftFunction = () => {
    const itemToMove = elements.teamArr.find((item) => item.classList.contains("team-item-seen-now"));
    const index = elements.teamArr.indexOf(itemToMove) - 1;
    const newItem = elements.teamArr[index]

    newItem.classList.remove("ert")
    itemToMove.classList.remove("team-item-next");
    itemToMove.classList.add("team-item-on-left")
    newItem.classList.add("team-item-seen-now");
    
    itemToMove.style.animationName = "moveOnLeftNew";

    elements.teamContsArr[index].classList.add("team-cont-picked");
    elements.teamContsArr[index + 1].classList.remove("team-cont-picked");
    
}

elements.rightButton.addEventListener("click", moveOnrightFunction);

elements.leftButton.addEventListener("click", moveOnLeftFunction);

