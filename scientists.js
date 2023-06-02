
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



const buttons = [
    {
      name: "Які вчені народилися в 19 ст.",
      arr: [],
      createButton() {
        const button = document.createElement("button");
        button.classList.add("scientists-btn");
        button.textContent = this.name;

        elements.buttonsContainerEl.append(button);
        elements.ScientistContainer.append(elements.buttonsContainerEl);

        const pickCardFunction = (event) => {
            if (!event.target.classList.contains("scientist-item-picked")) {
                this.arr.push(event.target);
                event.target.classList.add("scientist-item-picked");
                console.log(this.arr);
            } else {
                const index = this.arr.indexOf(event.target);
                this.arr.splice(index, 1)
                event.target.classList.remove("scientist-item-picked");
                console.log(this.arr);
            }
        }

        const checkCardFunction = () => {
            this.arr.forEach((item) => {
              const answer = document.createElement("p");
              answer.classList.add("scientist-answer");
              const dateEl = item.lastChild;
              const date = Number.parseInt(dateEl.textContent)
              if (date > 1800 && date < 1900) {
                alert("True")
              } else {
                alert("False")
              }
            })
        }

        const switchCardFunction = (event) => {
          event.target.textContent = "Перевірити"
            elements.scientistsArr.forEach((item) => {
              taskText.textContent = `Завдання: ${this.name} `;
              const index = elements.scientistsArr.indexOf(item);
              const text = Array.from(document.querySelectorAll(`.scientist-text`));
              text.forEach((item) => item.style.display = "none")
              item.style.animationName = "showImages";
              item.style.backgroundImage = `url(./images_and_icons/images/scientists/${scientists[index].name}_${scientists[index].surname}.jpg)`;
              item.style.cursor = "pointer";
              item.addEventListener("click", pickCardFunction);
            })

            button.addEventListener("click", checkCardFunction);
            button.removeEventListener("click", switchCardFunction);
        }
        
        button.addEventListener("click", switchCardFunction);
      }
    },
    {
      name: "Відсортувати вчених за алфавітом",
      createButton() {
        const button = document.createElement("button");
        button.classList.add("scientists-btn")
        button.textContent = this.name;

        elements.buttonsContainerEl.append(button);
        elements.ScientistContainer.append(elements.buttonsContainerEl);
      }
    },
    {
      name: "Відсортувати вчених за кількістю прожитих років",
      createButton() {
        const button = document.createElement("button");
        button.classList.add("scientists-btn")
        button.textContent = this.name;

        elements.buttonsContainerEl.append(button);
        elements.ScientistContainer.append(elements.buttonsContainerEl);
      }
    },
    {
      name: "Знайти вченого, який народився найпізніше",
      createButton() {
        const button = document.createElement("button");
        button.classList.add("scientists-btn")
        button.textContent = this.name;

        elements.buttonsContainerEl.append(button);
        elements.ScientistContainer.append(elements.buttonsContainerEl);
      }
    },
    {
      name: "Знайти рік народження Albert Einstein",
      createButton() {
        const button = document.createElement("button");
        button.classList.add("scientists-btn")
        button.textContent = this.name;

        elements.buttonsContainerEl.append(button);
        elements.ScientistContainer.append(elements.buttonsContainerEl);
      }
    },
    {
      name: "Знайти вчених, прізвища яких починаються на літеру 'С'",
      createButton() {
        const button = document.createElement("button");
        button.classList.add("scientists-btn");
        button.textContent = this.name;

        elements.buttonsContainerEl.append(button);
        elements.ScientistContainer.append(elements.buttonsContainerEl);
      }
    },
    {
      name: "Видалити всіх вчених, ім’я яких починається на 'А'",
      createButton() {
        const button = document.createElement("button");
        button.textContent = this.name;
        button.classList.add("scientists-btn")

        elements.buttonsContainerEl.append(button);
        elements.ScientistContainer.append(elements.buttonsContainerEl);
      }
    },
    {
      name: "Знайти вченого, який прожив найдовше і вченого, який прожив найменше",
      createButton() {
        const button = document.createElement("button");
        button.textContent = this.name;
        button.classList.add("scientists-btn")

        elements.buttonsContainerEl.append(button);
        elements.ScientistContainer.append(elements.buttonsContainerEl);
      }
    },
    {
      name: "Знайти вчених, в яких співпадають перші літери імені і прізвища",
      createButton() {
        const button = document.createElement("button");
        button.textContent = this.name;
        button.classList.add("scientists-btn")

        elements.buttonsContainerEl.append(button);
        elements.ScientistContainer.append(elements.buttonsContainerEl);
      }
    }
];
  
buttons.forEach((item) => {
    item.createButton();
})

