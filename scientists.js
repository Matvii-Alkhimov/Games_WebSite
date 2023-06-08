
const scientists = [ 
    { 
        name: "Albert", 
        surname: "Einstein", 
        born: 1879, 
        dead: 1955, 
        id: 1,
    }, 
    { 
        name: "Isaac", 
        surname: "Newton", 
        born: 1643, 
        dead: 1727, 
        id: 2,
    }, 
    { 
        name: "Galileo", 
        surname: "Galilei", 
        born: 1564, 
        dead: 1642, 
        id: 3,
    }, 
    { 
        name: "Marie", 
        surname: "Curie", 
        born: 1867, 
        dead: 1934, 
        id: 4,
    }, 
    { 
        name: "Johannes", 
        surname: "Kepler", 
        born: 1571, 
        dead: 1630, 
        id: 5,
    }, 
    { 
        name: "Nikolaus", 
        surname: "Copernikus", 
        born: 1473, 
        dead: 1543, 
        id: 6,
    }, 
    { 
        name: "Max", 
        surname: "Planck", 
        born: 1858, 
        dead: 1947, 
        id: 7,
    }, 
    { 
        name: "Katherine", 
        surname: "Blodgett", 
        born: 1898, 
        dead: 1979, 
        id: 8,
    }, 
    { 
        name: "Ada", 
        surname: "Lovelace", 
        born: 1815, 
        dead: 1852, 
        id: 9,
    }, 
    { 
        name: "Sarah", 
        surname: "Goode", 
        born: 1855, 
        dead: 1905, 
        id: 10,
    }, 
    { 
        name: "Lise", 
        surname: "Meitner", 
        born: 1878, 
        dead: 1968, 
        id: 11,
    }, 
    { 
        name: "Hanna", 
        surname: "Hammarström", 
        born: 1829, 
        dead: 1909, 
        id: 12,
    } 
];

const elements = {
    ScientistContainer: document.querySelector(".Scientist-container"),
    ScientistsList: document.createElement("ul"),
    scientistsArr: [],
    buttonsContainerEl: document.createElement("div"),
    scientistImagesArr: [],
    buttons: [],
    pickedButton: undefined,
}

elements.buttonsContainerEl.classList.add("buttons-container");

scientists.forEach((item) => {
    const scientistsItem = document.createElement("li");
    scientistsItem.classList.add("scientist-item", `${item.name}_${item.surname}`);

    const scientistName = document.createElement("p");
    scientistName.classList.add("scientist-text", "scientist-name");
    scientistName.textContent = `${item.name} ${item.surname}`;

    const scientistYears = document.createElement("p");
    scientistYears.classList.add("scientist-text", "scientist-year");
    scientistYears.textContent = `${item.born} - ${item.dead}`;

    scientistsItem.append(scientistName, scientistYears);
    elements.ScientistsList.append(scientistsItem);
    elements.scientistsArr.push(scientistsItem);
})

elements.ScientistContainer.append(elements.ScientistsList);
elements.ScientistsList.classList.add("scientists-list");

const taskText = document.createElement("p");
taskText.textContent = "Обери завдання";
taskText.classList.add("task-text");
elements.ScientistsList.before(taskText);



const functions = {
  createButton(i) {
    const button = document.createElement("button");
    elements.buttons.push(button);
    button.textContent = i.name;
    button.classList.add("scientists-btn");
    button.classList.add(i.num);

    elements.buttonsContainerEl.append(button);
    elements.ScientistContainer.append(elements.buttonsContainerEl);
  },
  pickCardFunction(event) {
    const index = elements.buttons.indexOf(elements.pickedButton)
    if (!event.target.classList.contains("scientist-item-picked")) {
      buttons[index].arr.push(event.target);
      event.target.classList.add("scientist-item-picked");
    } else {
      event.target.classList.remove("scientist-item-picked");
      buttons[index].arr.splice(buttons[index].arr.indexOf(event.target), 1)
    }
  },
  putCardOnListFunction(event) {
    if (event.target.nodeName !== "LI") {
      return
    }
    const index = elements.buttons.indexOf(elements.pickedButton)
    if (!event.target.classList.contains("scientist-item-picked")) {
      const clue = document.createElement("p");
      clue.classList.add("clue-text-list");
      buttons[index].clueArr.push(clue);
      buttons[index].arr.push(event.target);
      clue.textContent = buttons[index].arr.length;
      event.target.classList.add("scientist-item-picked");
      event.target.append(clue);
    } else {
      const clueIndex = buttons[index].clueArr.indexOf(event.target.lastChild)
      const clueToDelete = event.target.lastChild
      event.target.classList.remove("scientist-item-picked");
      buttons[index].arr.splice(clueIndex, 1);
      buttons[index].clueArr.splice(clueIndex, 1);
      clueToDelete.remove();
      buttons[index].clueArr.forEach((item) => {
        item.textContent = buttons[index].clueArr.indexOf(item) + 1;
      } )
    }
    
  },
  leaveGameFunction() {
    const index = elements.buttons.indexOf(elements.pickedButton);
    buttons[index].clueArr.forEach((item) => {
      item.remove()
    })
    elements.scientistsArr.forEach((item) => item.classList.remove("true", "false", "didnt-pick", "scientist-item-picked"));
    buttons[index].clueArr = [];
    buttons[index].arr = [];
    elements.scientistsArr.forEach((item) => {
      taskText.textContent = `Завдання: ${buttons[index].name} `;
      const text = Array.from(document.querySelectorAll(`.scientist-text`));
      text.forEach((item) => {
        item.style.display = "block";
        item.classList.remove("clue-text", "clue-text-list");
      })
      item.style.animationName = "";
      item.style.backgroundImage = `none`;
      elements.pickedButton.textContent = buttons[index].name;
    })
    elements.buttons.forEach((item) => item.toggleAttribute("disabled"));
    elements.pickedButton.toggleAttribute("disabled");
    elements.pickedButton.removeEventListener("click", functions.leaveGameFunction);
    elements.pickedButton.classList.toggle("asd")
    taskText.textContent = "Обери завдання";
    elements.buttonsContainerEl.addEventListener("click", switchCardFunction);
  }
}

const buttons = [
    {
      name: "Які вчені народилися в 19 ст.",
      num: 0,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        const index = elements.buttons.indexOf(elements.pickedButton);
        elements.pickedButton.textContent = "Вийти";
        buttons[index].arr.forEach((item) => {
          const answer = document.createElement("p");
          answer.classList.add("scientist-answer");
          const dateEl = item.lastChild;
          const date = Number.parseInt(dateEl.textContent);
          const clue = document.createElement("p");
          clue.classList.add("clue-text");
          buttons[index].clueArr.push(clue);
          if (date > 1800 && date < 1900) {
            item.classList.add("true");
            clue.textContent = "Правильно!";
          } else {
            item.classList.add("false");
            clue.textContent = "Неправильно!";
          }
          item.append(clue);
        })
        elements.scientistsArr.forEach((item) => {
          item.style.cursor = "auto";
          const dateEl = item.lastChild;
          const date = Number.parseInt(dateEl.textContent);
          if (date > 1800 && date < 1900 && !item.classList.contains("true")) {
            item.classList.add("didnt-pick");
            const clue = document.createElement("p");
            clue.classList.add("clue-text");
            buttons[index].clueArr.push(clue);
            clue.textContent = "Забув вибрати";
            item.append(clue);
          }
          item.removeEventListener("click", functions.pickCardFunction);
        })
        elements.pickedButton.removeEventListener("click", buttons[index].checkCardFunction);
        elements.pickedButton.addEventListener("click", functions.leaveGameFunction);
      },
    },
    // 
    {
      name: "Відсортувати вчених за алфавітом",
      num: 1,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        const index = elements.buttons.indexOf(elements.pickedButton);
        if (buttons[index].arr.length !== elements.scientistsArr.length) {
          return alert("Обери усіх вчених перед тим як перевірити чи правильно ти їх розташував!");
        }
        elements.pickedButton.textContent = "Вийти";
        const trueList = [];
        buttons[index].arr.forEach((item) => trueList.push(item.firstChild.textContent));
        trueList.sort();
        buttons[index].arr.forEach((item) => {
          
          for (let i = 0; i < buttons[index].arr.length; i += 1) {
            const neededClue = buttons[index].arr[i].firstChild.textContent;
            const rightAnswer = trueList[i];
            neededClue === rightAnswer ? buttons[index].arr[i].classList.add("true") : buttons[index].arr[i].classList.add("false");
            const text = Array.from(document.querySelectorAll(`li > .scientist-name`));
            text.forEach((item) => {
              item.style.display = "block";
              item.classList.add("clue-text");
            })
            
          }
        })
        buttons[index].clueArr.forEach((item) => {
          const parent = item.parentNode;
          const answerPicked = item.textContent;
          const rightAnswer = trueList.findIndex((answer) => answer === parent.firstChild.textContent);
          console.log(answerPicked)
          console.log(rightAnswer + 1)
          item.classList.remove("clue-text", "clue-text-list");
          item.classList.add("true-clue-text");
          if (answerPicked != rightAnswer + 1) {
            item.innerHTML = `
            <span class="wrong-answer"> ${answerPicked} </span>    ${rightAnswer + 1}
            `
          }
          elements.scientistsArr.forEach((item) => {
            item.removeEventListener("click", functions.putCardOnListFunction);
            item.style.cursor = "auto";
          }) 
        });
        elements.pickedButton.removeEventListener("click", buttons[index].checkCardFunction);
        elements.pickedButton.addEventListener("click", functions.leaveGameFunction);
      },
    },
    // 
    {
      name: "Відсортувати вчених за кількістю прожитих років",
      num: 2,
      arr: [],
      clueArr: [],
    },
    // 
    {
      name: "Знайти вченого, який народився найпізніше",
      num: 3,
      arr: [],
      clueArr: [],
    },
    // 
    {
      name: "Знайти рік народження Albert Einstein",
      num: 4,
      arr: [],
      clueArr: [],
    },
    // 
    {
      name: "Знайти вчених, прізвища яких починаються на літеру 'С'",
      num: 5,
      arr: [],
      clueArr: [],
    },
    // 
    {
      name: "Видалити всіх вчених, ім’я яких починається на 'А'",
      num: 6,
      arr: [],
      clueArr: [],
    },
    // 
    {
      name: "Знайти вченого, який прожив найдовше і вченого, який прожив найменше",
      num: 7,
      arr: [],
      clueArr: [],
    },
    // 
    {
      name: "Знайти вчених, в яких співпадають перші літери імені і прізвища",
      num: 8,
      arr: [],
      clueArr: [],
    }
];
  
buttons.forEach((item) => {
    functions.createButton(item);
})

function switchCardFunction(event) {
  if (event.target.nodeName !== "BUTTON") {
    return
  }

  elements.pickedButton = event.target;
  if (elements.pickedButton.classList.contains("asd")) {
    elements.pickedButton.classList.toggle("asd");
    return
  }
  const btnIndex = elements.buttons.indexOf(event.target);
  event.target.textContent === "Вийти" ? event.target.textContent = "Закрити" : event.target.textContent = "Перевірити";
  taskText.textContent = `Завдання: ${buttons[btnIndex].name} `;
  elements.scientistsArr.forEach((item) => {
    const index = elements.scientistsArr.indexOf(item);
    const text = Array.from(document.querySelectorAll(`.scientist-text`));
    text.forEach((item) => item.style.display = "none")
    item.style.animationName = "showImages";
    item.style.backgroundImage = `url(./images_and_icons/images/scientists/${scientists[index].name}_${scientists[index].surname}.jpg)`;
    item.style.cursor = "pointer";
    if (btnIndex === 1 || btnIndex === 2) {
      item.addEventListener("click", functions.putCardOnListFunction);
    } else {
      item.addEventListener("click", functions.pickCardFunction);
    }
  })
  elements.buttons.forEach((button) => button.toggleAttribute("disabled"));
  elements.buttons[btnIndex].toggleAttribute("disabled");

  event.target.addEventListener("click", buttons[btnIndex].checkCardFunction);
  elements.buttonsContainerEl.removeEventListener("click", switchCardFunction);
}

elements.buttonsContainerEl.addEventListener("click", switchCardFunction);


