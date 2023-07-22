import AdaLovelace from '../images_and_icons/images/scientists/Ada_Lovelace.jpg';
import AlbertEinstein from '../images_and_icons/images/scientists/Albert_Einstein.jpg';
import GalileoGalilei from '../images_and_icons/images/scientists/Galileo_Galilei.jpg';
import HannaHammarström from '../images_and_icons/images/scientists/Hanna_Hammarström.jpg';
import IsaacNewton from '../images_and_icons/images/scientists/Isaac_Newton.jpg';
import JohannesKepler from '../images_and_icons/images/scientists/Johannes_Kepler.jpg';
import KatherineBlodgett from '../images_and_icons/images/scientists/Katherine_Blodgett.jpg';
import LiseMeitner from '../images_and_icons/images/scientists/Lise_Meitner.jpg';
import MarieCurie from '../images_and_icons/images/scientists/Marie_Curie.jpg';
import MaxPlanck from '../images_and_icons/images/scientists/Max_Planck.jpg';
import NikolausCopernikus from '../images_and_icons/images/scientists/Nikolaus_Copernikus.jpg';
import SarahGoode from '../images_and_icons/images/scientists/Sarah_Goode.jpg';

const imagesArr = [
  AlbertEinstein, IsaacNewton, GalileoGalilei,
  MarieCurie, JohannesKepler, NikolausCopernikus,
  MaxPlanck, KatherineBlodgett, AdaLovelace,
  SarahGoode, LiseMeitner, HannaHammarström
];


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
    scientistContainer: document.querySelector(".Scientist-container"),
    scientistsList: document.createElement("ul"),
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
    scientistsItem.dataset.name = item.name;
    scientistsItem.dataset.surname = item.surname;
    scientistsItem.dataset.born = item.born;
    scientistsItem.dataset.dead = item.dead;

    const scientistName = document.createElement("p");
    scientistName.classList.add("scientist-text", "scientist-name");
    scientistName.textContent = `${item.name} ${item.surname}`;

    const scientistYears = document.createElement("p");
    scientistYears.classList.add("scientist-text", "scientist-year");
    scientistYears.textContent = `${item.born} - ${item.dead}`;

    scientistsItem.append(scientistName, scientistYears);
    elements.scientistsList.append(scientistsItem);
    elements.scientistsArr.push(scientistsItem);
})

elements.scientistContainer.append(elements.scientistsList);
elements.scientistsList.classList.add("scientists-list");

const taskText = document.createElement("p");
taskText.textContent = "Обери завдання";
taskText.classList.add("task-text");
elements.scientistsList.before(taskText);



const functions = {
  createButton(i) {
    const button = document.createElement("button");
    elements.buttons.push(button);
    button.textContent = i.name;
    button.classList.add("scientists-btn");
    button.classList.add(i.num);

    elements.buttonsContainerEl.append(button);
    elements.scientistContainer.append(elements.buttonsContainerEl);
  },
  pickCardFunction(event) {
    const index = elements.buttons.indexOf(elements.pickedButton);
    const { arr, clueArr } = buttons[index];
    if (!event.target.classList.contains("scientist-item-picked")) {
      arr.push(event.target);
      event.target.classList.add("scientist-item-picked");
    } else {
      event.target.classList.remove("scientist-item-picked");
      arr.splice(arr.indexOf(event.target), 1)
    }
  },
  putCardOnListFunction(event) {
    if (event.target.nodeName !== "LI") {
      return
    }
    const index = elements.buttons.indexOf(elements.pickedButton);
    const { arr, clueArr } = buttons[index];
    if (!event.target.classList.contains("scientist-item-picked")) {
      const clue = document.createElement("p");
      clue.classList.add("clue-text-list");
      clueArr.push(clue);
      arr.push(event.target);
      clue.textContent = arr.length;
      event.target.classList.add("scientist-item-picked");
      event.target.append(clue);
    } else {
      const clueIndex = clueArr.indexOf(event.target.lastChild)
      const clueToDelete = event.target.lastChild
      event.target.classList.remove("scientist-item-picked");
      arr.splice(clueIndex, 1);
      clueArr.splice(clueIndex, 1);
      clueToDelete.remove();
      clueArr.forEach((item) => {
        item.textContent = clueArr.indexOf(item) + 1;
      } )
    }
    
  },
  leaveGameFunction() {
    const index = elements.buttons.indexOf(elements.pickedButton);
    const { arr, clueArr, name } = buttons[index];
    clueArr.forEach((item) => {
      item.remove()
    })
    elements.scientistsArr.forEach((item) => item.classList.remove("true", "false", "didnt-pick", "scientist-item-picked"));
    buttons[index].clueArr = [];
    buttons[index].arr = [];
    elements.scientistsArr.forEach((item) => {
      taskText.textContent = `Завдання: ${name} `;
      const text = Array.from(document.querySelectorAll(`.scientist-text`));
      text.forEach((item) => {
        item.style.display = "block";
        item.classList.remove("clue-text", "clue-text-list");
      })
      item.style.animationName = "";
      item.style.backgroundImage = `none`;
      elements.pickedButton.textContent = name;
    })
    elements.buttons.forEach((item) => item.toggleAttribute("disabled"));
    elements.pickedButton.toggleAttribute("disabled");
    elements.pickedButton.removeEventListener("click", functions.leaveGameFunction);
    elements.pickedButton.classList.toggle("asd")
    taskText.textContent = "Обери завдання";
    elements.buttonsContainerEl.addEventListener("click", switchCardFunction);
  },
  addInputFunction(event) {
    if (event.target.nodeName !== "BUTTON") {
      return
    }
    const input = document.querySelector(".scientists-btn > .scientist-input")
    event.target.innerHTML = "Вийти";
    const name = "Albert Einstein";
    const neededObj = scientists.find((item) => `${item.name} ${item.surname}` === name);
    const born = neededObj.born;
    Number(input.value) === born ? taskText.textContent = "Молодець! Правильно!" : taskText.textContent = "Неправильно!";
    const text = Array.from(document.querySelectorAll(`li > .scientist-year`));
      text.forEach((item) => {
        item.style.display = "block";
        item.classList.add("clue-text");
      })
      elements.pickedButton.removeEventListener("click", functions.addInputFunction);
      elements.pickedButton.addEventListener("click", functions.leaveGameFunction);
  }
  
}

const buttons = [
    {
      name: "Які вчені народилися в 19 ст.",
      num: 0,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        elements.pickedButton.textContent = "Вийти";
        arr.forEach((item) => {
          const answer = document.createElement("p");
          answer.classList.add("scientist-answer");
          const date = item.dataset.born;
          const clue = document.createElement("p");
          clue.classList.add("clue-text");
          clueArr.push(clue);
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
          const date = item.dataset.born;
          if (date > 1800 && date < 1900 && !item.classList.contains("true")) {
            item.classList.add("didnt-pick");
            const clue = document.createElement("p");
            clue.classList.add("clue-text");
            clueArr.push(clue);
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
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        if (arr.length !== elements.scientistsArr.length) {
          return alert("Обери усіх вчених перед тим як перевірити чи правильно ти їх розташував!");
        }
        elements.pickedButton.textContent = "Вийти";
        const trueList = [];
        arr.forEach((item) => trueList.push(`${item.dataset.name} ${item.dataset.surname}`));
        trueList.sort();
        arr.forEach((item) => {
          
          for (let i = 0; i < arr.length; i += 1) {
            const neededClue = arr[i].firstChild.textContent;
            const rightAnswer = trueList[i];
            neededClue === rightAnswer ? arr[i].classList.add("true") : arr[i].classList.add("false");
            const text = Array.from(document.querySelectorAll(`li > .scientist-name`));
            text.forEach((item) => {
              item.style.display = "block";
              item.classList.add("clue-text");
            })
            
          }
        })
        clueArr.forEach((item) => {
          const parent = item.parentNode;
          const answerPicked = item.textContent;
          const rightAnswer = trueList.findIndex((answer) => answer === parent.firstChild.textContent);
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
      checkCardFunction() {
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        if (arr.length !== elements.scientistsArr.length) {
          return alert("Обери усіх вчених перед тим як перевірити чи правильно ти їх розташував!");
        }
        elements.pickedButton.textContent = "Вийти";
        const trueList = [];
        arr.forEach((item) => {
          const i = arr.indexOf(item);
          const years = scientists[i].dead - scientists[i].born;
          trueList.push(years);
        });
        trueList.sort();
          
          for (let i = 0; i < arr.length; i += 1) {
            const name = arr[i].firstChild.textContent;
            const neededObj = scientists.find((item) => {
              const objName = `${item.name} ${item.surname}`;
              return name === objName;
            })
            const neededAge = neededObj.dead - neededObj.born;
            const rightAnswer = trueList[i];
            neededAge === rightAnswer ? arr[i].classList.add("true") : arr[i].classList.add("false");
            const text = Array.from(document.querySelectorAll(`li > .scientist-year`));
            text.forEach((item) => {
              item.style.display = "block";
              item.classList.add("clue-text");
            })
            
          }
        clueArr.forEach((item) => {
          const parent = item.parentNode;
          const text = parent.firstChild.textContent;
          const answerPicked = item.textContent;
          const textIndex = scientists.findIndex((elem) => `${elem.name} ${elem.surname}` === text)
          const years = scientists[textIndex].dead - scientists[textIndex].born;
          const rightAnswer = trueList.findIndex((item) => item === years);
          item.classList.remove("clue-text", "clue-text-list");
          item.classList.add("true-clue-text");
          if (parent.classList.contains("false")) {
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
      name: "Знайти вченого, який народився найпізніше",
      num: 3,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        elements.pickedButton.textContent = "Вийти";
        const dates = [];
        const allDates = [];
        for (const scientist of elements.scientistsArr) {
          const neededElem = scientist.lastChild;
          const date = parseInt(neededElem.textContent)
          allDates.push(date);
        }
        arr.forEach((item) => {
          const answer = document.createElement("p");
          answer.classList.add("scientist-answer");
          const date = Number.parseInt(item.lastChild.textContent);
          const clue = document.createElement("p");
          clue.classList.add("clue-text");
          clueArr.push(clue);
          dates.push(date);
          item.append(clue);
        })

        let biggestDate = 0;
          for (const date of allDates) {
            date > biggestDate ? biggestDate = date : biggestDate = biggestDate;
        }

        for (let i = 0; i < arr.length; i += 1) {
          dates[i] === biggestDate ? arr[i].classList.add("true") : arr[i].classList.add("false");
          dates[i] === biggestDate ? clueArr[i].textContent = "Правильно!" : clueArr[i].textContent = "Неправильно!";
        }

        const neededScientist = elements.scientistsArr.find((scientist) => Number(scientist.dataset.born) === biggestDate)

        if (!neededScientist.classList.contains("true")) {
          neededScientist.classList.add("didnt-pick");
          const clue = document.createElement("p");
          clue.classList.add("clue-text");
          clueArr.push(clue);
          clue.textContent = "Правильна відповідь";
          neededScientist.append(clue);
        }

        elements.scientistsArr.forEach((item) => {
          item.removeEventListener("click", functions.pickCardFunction);
          item.style.cursor = "auto";
        });

        elements.pickedButton.removeEventListener("click", buttons[index].checkCardFunction);
        elements.pickedButton.addEventListener("click", functions.leaveGameFunction);

      }
    },
    // 
    {
      name: "Знайти рік народження Albert Einstein",
      num: 4,
      arr: [],
      clueArr: [],
      checkCardFunction() {

      },
    },
    // 
    {
      name: "Знайти вчених, прізвища яких починаються на літеру 'С'",
      num: 5,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        elements.pickedButton.textContent = "Вийти";
        arr.forEach((item) => {
          const answer = document.createElement("p");
          answer.classList.add("scientist-answer");
          const scientistName = item.dataset.surname;
          // console.log(scientistName[0])
          const clue = document.createElement("p");
          clue.classList.add("clue-text");
          clueArr.push(clue);
          if (scientistName[0] === "C") {
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
          const scientistName = item.dataset.surname;
          if (scientistName[0] === "C" && !item.classList.contains("true")) {
            item.classList.add("didnt-pick");
            const clue = document.createElement("p");
            clue.classList.add("clue-text");
            clueArr.push(clue);
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
      name: "Видалити всіх вчених, ім’я яких починається на 'А'",
      num: 6,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        elements.pickedButton.textContent = "Вийти";
        arr.forEach((item) => {
          const answer = document.createElement("p");
          answer.classList.add("scientist-answer");
          const scientistName = item.dataset.name;
          const clue = document.createElement("p");
          clue.classList.add("clue-text");
          clueArr.push(clue);
          if (scientistName[0] === "A") {
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
          const scientistName = item.dataset.name;
          if (scientistName[0] === "A" && !item.classList.contains("true")) {
            item.classList.add("didnt-pick");
            const clue = document.createElement("p");
            clue.classList.add("clue-text");
            clueArr.push(clue);
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
      name: "Знайти вченого, який прожив найдовше і вченого, який прожив найменше",
      num: 7,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        elements.pickedButton.textContent = "Вийти";
        const trueList = [];
        elements.scientistsArr.forEach((scientist) => {
          const years = scientist.dataset.dead - scientist.dataset.born;
          trueList.push(years);
        });
        trueList.sort();
        console.log(trueList)
        
        const shortestLife = trueList[0];
        const longestLife = trueList[trueList.length - 1];

        console.log(`longestLife: ${longestLife}`);
        console.log(`shortestLife:${shortestLife}`);

        arr.forEach((scientist) => {
          const clue = document.createElement("p");
          clue.classList.add("true-clue-text");
          clueArr.push(clue);

          const neededAge = scientist.dataset.dead - scientist.dataset.born;
          if (neededAge === longestLife) {
            scientist.classList.add("true");
            clue.textContent = "Найдовше";
          } else if (neededAge === shortestLife) {
            scientist.classList.add("true");
            clue.textContent = "Найменше";
          } else {
            scientist.classList.add("false");
            clue.textContent = "Неправильно!";
          }

          const text = Array.from(document.querySelectorAll(`li > .scientist-year`));
            text.forEach((item) => {
              item.style.display = "block";
              item.classList.add("clue-text");
            })
            
            scientist.append(clue);
        })

        elements.scientistsArr.forEach((scientist) => {
          if (!scientist.classList.contains("true")) {
            const lifeYears = scientist.dataset.dead - scientist.dataset.born;
            const clue = document.createElement("p");
              clue.classList.add("true-clue-text");
              clueArr.push(clue);
              scientist.prepend(clue)
            if (lifeYears === shortestLife) {
              scientist.classList.add("didnt-pick");
              clue.textContent = "Найменше";
            } else if (lifeYears === longestLife) {
              scientist.classList.add("didnt-pick");
              clue.textContent = "Найдовше";
            }
          }
        })
          
        elements.scientistsArr.forEach((item) => {
          item.removeEventListener("click", functions.pickCardFunction);
          item.style.cursor = "auto";
        })
          
        elements.pickedButton.removeEventListener("click", buttons[index].checkCardFunction);
        elements.pickedButton.addEventListener("click", functions.leaveGameFunction);
      }
    },
    // 
    {
      name: "Знайти вчених, в яких співпадають перші літери імені і прізвища",
      num: 8,
      arr: [],
      clueArr: [],
      checkCardFunction() {
        elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
        const index = elements.buttons.indexOf(elements.pickedButton);
        const { arr, clueArr } = buttons[index];
        elements.pickedButton.textContent = "Вийти";
        arr.forEach((item) => {
          const answer = document.createElement("p");
          answer.classList.add("scientist-answer");
          const scientistName = item.dataset.name;
          const scientistSurname = item.dataset.surname;
          const clue = document.createElement("p");
          clue.classList.add("clue-text");
          clueArr.push(clue);
          if (scientistName[0] === scientistSurname[0]) {
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
          const scientistName = item.dataset.name;
          const scientistSurname = item.dataset.surname;
          if (scientistName[0] === scientistSurname[0] && !item.classList.contains("true")) {
            item.classList.add("didnt-pick");
            const clue = document.createElement("p");
            clue.classList.add("clue-text");
            clueArr.push(clue);
            clue.textContent = "Забув вибрати";
            item.append(clue);
          }
          item.removeEventListener("click", functions.pickCardFunction);
        })
        elements.pickedButton.removeEventListener("click", buttons[index].checkCardFunction);
        elements.pickedButton.addEventListener("click", functions.leaveGameFunction);
      },
    }
];
  
buttons.forEach((item) => {
    functions.createButton(item);
})

function switchCardFunction(event) {
  if (event.target.nodeName !== "BUTTON") {
    return
  }
  elements.scientistContainer.scrollIntoView({behavior: 'smooth'});
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
    item.style.backgroundImage = `url(${imagesArr[index]})`;
    item.style.cursor = "pointer";
    if (btnIndex === 1 || btnIndex === 2) {
      item.addEventListener("click", functions.putCardOnListFunction);
    } else if (btnIndex === 4) {
      item.style.cursor = "auto";
      elements.buttons.forEach((button) => button.toggleAttribute("disabled"));
      elements.buttons[btnIndex].toggleAttribute("disabled");
      event.target.innerHTML = `
      <input class="scientist-input" name="scientist-input" ></input>
      Перевірити
      `
      event.target.addEventListener("click", functions.addInputFunction);
      return
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