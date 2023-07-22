
const elements = {


    main: document.querySelector(".main"),
    sections: [],
    containers: [],
    RPS: [],
    operations: [],
    timeCalcArr: ["сек", "хв", "год", "дн", "міс"],
    biggestNumberInputs: [],
    nums: [0, 0, 0],
    tttButtons: [],
    tttArr: [],
    tttField: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ],
    playerFields: [],
    aiFields: [],
}



const games = [
    {
      id: 1,
      name: 'Leap-year-calculator',
      category: 'numerical',
      createGame() {
        const neededIndex = this.id - 1;
        const secondTitle = document.createElement("h2");
        secondTitle.classList.add("second-title");
        secondTitle.textContent = "Перевір в який рік ти народився";
        elements.containers[neededIndex].prepend(secondTitle);

        const form = document.createElement("form");
        const input = document.createElement("input");
        const button = document.createElement("button");
        const text = document.createElement("p");

        form.classList.add("leap-year-form");
        input.name = "year";
        input.placeholder = "Введіть рік народження";
        input.classList.add("leap-year-input");
        input.toggleAttribute("required");
        button.classList.add("leap-year-button");
        text.classList.add("leap-year-text");
        text.textContent = "Тут буде написано, високосний твій рік народження чи ні";

        form.append(input, button);
        elements.containers[neededIndex].append(form, text);

        const checkLeapYearFunction = (event) => {
          event.preventDefault();
          const year = Number(event.currentTarget.elements.year.value);

          if (year / 4 === Math.round(year / 4)) {
            text.style.color = "#039900";
            text.textContent = "Ви народилися у високосний рік!";
          } else {
            text.style.color = "#990000";
            text.textContent = "Ви народилися не у високосний рік!";
          }

        }

        form.addEventListener("submit", checkLeapYearFunction);
      }
    },
    {
      id: 2,
      name: 'Guess-the-number',
      category: 'numerical',
      createGame() {
        const neededIndex = this.id - 1;
        const secondTitle = document.createElement("h2");
        secondTitle.classList.add("second-title");
        secondTitle.textContent = "Вгадай число, яке загадав комп’ютер";
        elements.containers[neededIndex].prepend(secondTitle);

        const form = document.createElement("form");
        const input = document.createElement("input");
        const button = document.createElement("button");
        const text = document.createElement("p");

        form.classList.add("guess-number-form");
        input.name = "guessNumberInput";
        input.placeholder = "Введіть число";
        input.classList.add("guess-number-input");
        input.toggleAttribute("required");
        button.classList.add("guess-number-button");
        text.classList.add("guess-number-text");
        text.textContent = "Тут буде написано, вгадав ти число чи ні";

        form.append(input, button);
        elements.containers[neededIndex].append(form, text);

        const guessNumberFunction = (event) => {
          event.preventDefault();
          const num = Number(event.currentTarget.elements.guessNumberInput.value);
          const numToFind = Math.round(Math.random() * (10 - 0) + 0);

          if (num === numToFind) {
            text.style.color = "#039900";
            text.textContent = `Вітаю, ви вгадали число ${numToFind}!`;
          } else {
            text.style.color = "#990000";
            text.textContent = `Ви програли, комп’ютер загадав ${numToFind}!`;
          }
        }

        form.addEventListener("submit", guessNumberFunction);
      }
    },
    {
      id: 3,
      name: 'Rock-paper-scissors',
      category: 'game',
      createGame() {
        const neededIndex = this.id - 1;
        const secondTitle = document.createElement("h2");
        secondTitle.classList.add("second-title");
        secondTitle.textContent = "Камінь - ножиці - папір";
        elements.containers[neededIndex].prepend(secondTitle);

        const rock = document.createElement("button");
        const paper = document.createElement("button");
        const scissors = document.createElement("button");

        rock.classList.add("rock");
        paper.classList.add("paper");
        scissors.classList.add("scissors");

        elements.RPS.push(rock, paper, scissors);

        elements.RPS.forEach((elem) => elem.classList.add("rps-button"));

        const rpsList = document.createElement("ul");
        rpsList.classList.add("rps-list");

        for (let i = 0; i < 3; i += 1) {
            const rpsItem = document.createElement("li");
            rpsItem.classList.add("rps-item");
            rpsItem.append(elements.RPS[i]);
            rpsList.append(rpsItem);
        }

        elements.containers[neededIndex].append(rpsList);

        const text = document.createElement("p");
        const startButton = document.createElement("button");
        const score = document.createElement("p");
        let aiScore = 0;
        let humanScore = 0;
        
        text.classList.add("rps-text");
        text.textContent = "Оберіть камінь, ножиці або папір та натисніть на кнопку 'Варіант комп'ютера'.";
        startButton.classList.add("rps-start");
        score.classList.add("rps-score");
        score.innerHTML = `Рахунок:
        Комп’ютер - ${aiScore}
        Ви - ${humanScore}`;
        startButton.classList.add("rps-start-button");
        startButton.textContent = "Варіант комп’ютера";
        startButton.toggleAttribute("disabled");

        elements.containers[neededIndex].append(text);
        elements.containers[neededIndex].append(startButton);
        elements.containers[neededIndex].append(score);

        const chooseRPSFunction = (event) => {
          elements.RPS.forEach((item) => item.classList.remove("rps-button-picked"));
          event.target.classList.add("rps-button-picked");
          startButton.removeAttribute("disabled");
        }

        elements.RPS.forEach((item) => item.addEventListener("click", chooseRPSFunction));

        const checkAIPickFunction = () => {
          elements.RPS.forEach((item) => item.classList.remove("rps-button-ai-picked"));
          const playerIndex = elements.RPS.findIndex((item) => item.classList.contains("rps-button-picked"));
          const aiIndex = Math.round(Math.random() * (elements.RPS.length-1 - 0) + 0);

          const playerElement = elements.RPS[playerIndex];
          const aiElement = elements.RPS[aiIndex];
          aiElement.classList.toggle("rps-button-ai-picked");

          if (playerIndex === aiIndex) {
            text.textContent = "Нічия!";
            text.style.color = "black";
          } else if((playerElement.classList.contains("rock") && aiElement.classList.contains("paper")) 
          || (playerElement.classList.contains("paper") && aiElement.classList.contains("scissors")) 
          || (playerElement.classList.contains("scissors") && aiElement.classList.contains("rock"))) {
            text.textContent = "Комп’ютер виграв раунд!";
            text.style.color = "#990000";
            aiScore += 1;
          } else {
            text.textContent = "Ви виграли раунд!";
            text.style.color = "#039900";
            humanScore += 1;
          }
          score.innerHTML = `Рахунок:
          Комп’ютер - ${aiScore}
          Ви - ${humanScore}`;
          
        }
        startButton.addEventListener("click", checkAIPickFunction);

      }
    },
    {
      id: 4,
      name: 'Calculator',
      category: 'numerical',
      createGame() {
        const neededIndex = this.id - 1;
        const secondTitle = document.createElement("h2");
        secondTitle.classList.add("second-title");
        secondTitle.textContent = "Калькулятор";
        elements.containers[neededIndex].prepend(secondTitle);

        const form = document.createElement("form");
        const num1 = document.createElement("input");
        const num2 = document.createElement("input");
        const operationsList = document.createElement("ul");
        const equalButton = document.createElement("button");
        const result = document.createElement("span");

        const plus = document.createElement("button");
        const minus = document.createElement("button");
        const multiply = document.createElement("button");
        const divide = document.createElement("button");
        plus.classList.add("plus");
        minus.classList.add("minus");
        multiply.classList.add("multiply");
        divide.classList.add("divide");
        plus.textContent = "+";
        minus.textContent = "-";
        multiply.textContent = "*";
        divide.textContent = "/";
        elements.operations.push(plus, minus, multiply, divide);
        elements.operationsSumbols = ["+", "-", "*", "/"];

        elements.operations.forEach((operation) => {
            const operationItem = document.createElement("li");
            operationItem.classList.add("op-item");
            operation.type = "button";
            operationItem.prepend(operation);
            operationsList.append(operationItem);
        })

        form.classList.add("op-form");
        num1.classList.add("op-num1");
        num1.placeholder = "Введіть число";
        num1.toggleAttribute("required");
        num1.name = "num1";
        operationsList.classList.add("op-list");
        num2.classList.add("op-num2");
        num2.placeholder = "Введіть число";
        num2.toggleAttribute("required");
        num2.name = "num2";
        equalButton.classList.add("op-equal");
        equalButton.type = "submit";
        equalButton.textContent = "=";
        equalButton.toggleAttribute("disabled");
        result.classList.add("op-result");
        result.textContent = "Результат";

        form.append(num1, operationsList, num2, equalButton, result);
        elements.containers[neededIndex].append(form);
        const pickOperationFunction = (event) => {
        elements.operations.forEach((item) => item.classList.remove("picked-operation"));

        event.target.classList.add("picked-operation");
        equalButton.removeAttribute("disabled");
        }

        elements.operations.forEach((item) => item.addEventListener("click", pickOperationFunction));
        const calculateFunction = (event) => {
          event.preventDefault();
          const index = elements.operations.findIndex((item) => item.classList.contains("picked-operation"));
          if (elements.operationsSumbols[index] === "+") {
            result.textContent = Number(event.currentTarget.elements.num1.value) + Number(event.currentTarget.elements.num2.value);
          } else if (elements.operationsSumbols[index] === "-") {
            result.textContent = Number(event.currentTarget.elements.num1.value) - Number(event.currentTarget.elements.num2.value);
          } else if (elements.operationsSumbols[index] === "*") {
            result.textContent = Number(event.currentTarget.elements.num1.value) * Number(event.currentTarget.elements.num2.value);
          } else if (elements.operationsSumbols[index] === "/") {
            result.textContent = Number(event.currentTarget.elements.num1.value) / Number(event.currentTarget.elements.num2.value);
          }
          
        }

        form.addEventListener("submit", calculateFunction);
      }
    },
    {
      id: 5,
      name: 'Time-calculator',
      category: 'numerical',
      createGame() {
        const neededIndex = this.id - 1;
        const secondTitle = document.createElement("h2");
        secondTitle.classList.add("second-title");
        secondTitle.textContent = "Калькулятор часу";
        elements.containers[neededIndex].prepend(secondTitle);

        const form = document.createElement("form");
        const input = document.createElement("input");
        const button = document.createElement("button");
        const select = document.createElement("select");
        const text = document.createElement("p");

        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        let days = 0;
        let mounths = 0;
        let years = 0;

        elements.timeCalcArr.forEach((value) => {
          const option = document.createElement("option");
          option.classList.add("time-option");
          option.classList.add(`${value}`);
          option.textContent = `${value}`;
          option.value = value;
          select.append(option);
        })

        form.classList.add("time-calc-form");
        input.classList.add("time-calc-input");
        input.placeholder = "Введіть число";
        input.toggleAttribute("required");
        input.name = "timeCalcInput";
        button.classList.add("time-calc-button");
        select.classList.add("time-calc-select");
        select.name = "timeCalcSelect";
        text.classList.add("time-calc-text");
        text.textContent = `${years}р, ${mounths}міс, ${days}дн, ${hours}год, ${minutes}хв, ${seconds}сек`;
        form.append(input, button, select);
        elements.containers[neededIndex].append(form, text);

        const calcTimeFunction = (event) => {
          event.preventDefault();
          
          const index = elements.timeCalcArr.findIndex((item) => item === event.currentTarget.elements.timeCalcSelect.value);
          const num = event.currentTarget.elements.timeCalcInput.value;
          const value = event.currentTarget.elements.timeCalcSelect.value;

          seconds = 0;
          minutes = 0;
          hours = 0;
          days = 0;
          mounths = 0;
          years = 0;
          text.textContent = `${years}р, ${mounths}міс, ${days}дн, ${hours}год, ${minutes}хв, ${seconds}сек`;
          
            for (let i = 0; i < num; i += 1) {
              if (index === 0) {
                seconds += 1;
              } else if (index === 1) {
                minutes += 1;
              } else if (index === 2) {
                hours += 1;
              } else if (index === 3) {
                days += 1;
              } else if (index === 4) {
                mounths += 1;
              }   
            }
            if (seconds >= 60) {
              do {
                seconds -= 60;
                minutes += 1;
              } while (seconds >= 60);
            } if (minutes >= 60) {
              do {
                minutes -= 60;
                hours += 1;
              } while (minutes >= 60);
            } if (hours >= 24) {
              do {
                hours -= 24;
                days += 1;
              } while (hours >= 24);
            } if (days >= 30) {
              do {
                days -= 30;
              mounths += 1;
              } while (days >= 30) ;
            } if (mounths >= 12) {
              do {
                mounths -= 12;
                years += 1;
              } while (mounths >= 12);
            }
            text.textContent = `${years}р, ${mounths}міс, ${days}дн, ${hours}год, ${minutes}хв, ${seconds}сек`;
        }
        

        form.addEventListener("submit", calcTimeFunction);
      }
    },
    {
      id: 6,
      name: 'Google-dinosaur',
      category: 'game',
      createGame() {
        const neededIndex = this.id - 1;
        const secondTitle = document.createElement("h2");
        secondTitle.classList.add("second-title");
        secondTitle.textContent = "Google динозавр";
        const thirdTitle = document.createElement("h3");
        thirdTitle.classList.add("third-title")
        thirdTitle.textContent = "В розробці...";
        elements.containers[neededIndex].prepend(secondTitle, thirdTitle);
      }
    },
    {
      id: 7,
      name: 'Football',
      category: 'game',
      animationName: "ball-moving",
      createGame() {
        const neededIndex = this.id - 1;
        const secondTitle = document.createElement("h2");
        secondTitle.classList.add("second-title");
        secondTitle.textContent = "Футбол";
        elements.containers[neededIndex].prepend(secondTitle);

        const footballPlayField = document.createElement("div");
        const ball = document.createElement("div");

        footballPlayField.classList.add("football-field");
        ball.classList.add("ball");

        footballPlayField.append(ball);
        elements.containers[neededIndex].append(footballPlayField);

        const moveBallFunction = (event) => {
          if (this.animationName !== "ball-moving") {
            this.animationName = "ball-moving";
          } else if (this.animationName === "ball-moving") {
            this.animationName = "ball-moving2";
          }
          ball.style.left = `${event.offsetX}px`;
          ball.style.top = `${event.offsetY}px`;
          ball.style.animationName = `${this.animationName}`;
          
        }
        
        footballPlayField.addEventListener("click", moveBallFunction);
      }
    },
    {
      id: 8,
      name: "Tic-Tac-Toe",
      category: "game",
      createGame() {
        const neededIndex = this.id - 1;
        const secondTitle = document.createElement("h2");
        secondTitle.classList.add("second-title");
        secondTitle.textContent = "Хрестики-нолики";
        elements.containers[neededIndex].prepend(secondTitle);

        const gameList = document.createElement("ul");
        const startButton = document.createElement("button");
        const aiPickButton = document.createElement("button");
        const text = document.createElement("p");

        for (let i = 0; i < 9; i += 1) {
          const gameItem = document.createElement("li");
          const gameButton = document.createElement("button");

          gameItem.classList.add("ttt-item");
          gameButton.classList.add("ttt-button");
          gameButton.toggleAttribute("disabled");

          gameItem.append(gameButton);
          gameList.append(gameItem);
          elements.tttButtons.push(gameButton);
          elements.tttArr.push(gameButton);
        }

        gameList.classList.add("ttt-list");
        startButton.classList.add("ttt-start-button");
        startButton.textContent = "Почати гру";
        aiPickButton.classList.add("ttt-ai-pick-button");
        aiPickButton.toggleAttribute("disabled");
        aiPickButton.textContent = "Хід комп'ютера";
        text.classList.add("ttt-text");
        text.textContent = "Натисніть кнопку, щоб розпочати гру";

        elements.containers[neededIndex].append(gameList, text, startButton, aiPickButton);

        // Start Game Function 

        const startTicTacToeGameFunction = () => {

          elements.tttButtons = [...elements.tttArr];
          elements.tttField = [["", "", ""], ["", "", ""], ["", "", ""]];
          elements.aiFields = [];
          elements.playerFields = [];
          
          startButton.textContent = "";
          startButton.toggleAttribute("disabled");
          text.textContent = "Натисни на якесь поле, щоб поставити хрестик!";

          elements.tttButtons.forEach((item)=> {
            item.classList.remove("ttt-button-picked", "ttt-button-ai-picked");
            item.removeAttribute("disabled");
            item.classList.add("ttt-game-active");
          });

          const pickTicTacToeGameFunction = (event) => {
            const index = elements.tttButtons.indexOf(event.target);
            const playerNum = elements.tttArr.indexOf(event.target);
            elements.playerFields.push(playerNum);
            
            if(playerNum < 3) {
              elements.tttField[0][playerNum] = "X";
            } else if (playerNum >= 3 && playerNum <= 5) {
              elements.tttField[1][playerNum - 3] = "X";
            } else if (playerNum >= 6 && playerNum <= 8) {
              elements.tttField[2][playerNum - 6] = "X";
            }
            
            text.textContent = "Тепер натисни на кнопку 'Хід комп'ютера', щоб комп'ютер поставив нолик";
            event.target.classList.add("ttt-button-picked");
            
            aiPickButton.toggleAttribute("disabled");
            elements.tttButtons.forEach((item) => {
              item.removeEventListener("click", pickTicTacToeGameFunction);
              item.classList.remove("ttt-game-active");
            });

            elements.tttButtons.splice(index, 1);
            const TicTacToeAiPickFunction = (event) => {
              elements.tttArr.forEach((item) => item.classList.remove("ai-button-picked"));

                aiPickButton.toggleAttribute("disabled");

              let num = Math.round(Math.random() * ((elements.tttButtons.length - 1) - 0) + 0);

              elements.tttButtons[num].classList.add("ttt-button-ai-picked", "ai-button-picked");

              const aiNum = elements.tttArr.findIndex((item) => item.classList.contains("ai-button-picked"));
              elements.aiFields.push(aiNum);

              
              if(aiNum < 3) {
                elements.tttField[0][aiNum] = "O";
              } else if (aiNum >= 3 && aiNum <= 5) {
                elements.tttField[1][aiNum - 3] = "O";
              } else if (aiNum >= 6 && aiNum <= 8) {
                elements.tttField[2][aiNum - 6] = "O";
              }
              elements.tttButtons.splice(num, 1);

              aiPickButton.removeEventListener("click", TicTacToeAiPickFunction);
              elements.tttButtons.forEach((item) => {
                item.classList.add("ttt-game-active");
                item.addEventListener("click", pickTicTacToeGameFunction)
              });

              text.textContent = "Знову натисни на якесь поле, щоб поставити хрестик!";

              for (let i = 0; i < 3; i += 1) {
                if (elements.tttField[i][0] === "O" && elements.tttField[i][0] === elements.tttField[i][1] && elements.tttField[i][1] === elements.tttField[i][2]
                    ||
                    elements.tttField[0][i] === "O" && elements.tttField[0][i] === elements.tttField[1][i] && elements.tttField[1][i] === elements.tttField[2][i]
                    ||
                    elements.tttField[0][i] === "O" && elements.tttField[0][i] === elements.tttField[1][i + 1] && elements.tttField[1][i + 1] === elements.tttField[2][i + 2]
                    ||
                    elements.tttField[0][i + 2] === "O" && elements.tttField[0][i + 2] === elements.tttField[1][i + 1] && elements.tttField[1][i + 1] === elements.tttField[2][i]
                    ) {
                      text.textContent = "Комп'ютер виграв раунд!";
                      startButton.textContent = "Заново";
                      startButton.removeAttribute("disabled");
                      elements.tttArr.forEach((item) => item.classList.remove("ai-button-picked"));
                      aiPickButton.removeEventListener("click", TicTacToeAiPickFunction);
                      return
                }
              }

            }

            aiPickButton.addEventListener("click", TicTacToeAiPickFunction)

            for (let i = 0; i < 3; i += 1) {
              if (elements.tttField[i][0] === "X" && elements.tttField[i][0] === elements.tttField[i][1] && elements.tttField[i][1] === elements.tttField[i][2]
                  ||
                  elements.tttField[0][i] === "X" && elements.tttField[0][i] === elements.tttField[1][i] && elements.tttField[1][i] === elements.tttField[2][i]
                  ||
                  elements.tttField[0][i] === "X" && elements.tttField[0][i] === elements.tttField[1][i + 1] && elements.tttField[1][i + 1] === elements.tttField[2][i + 2]
                  ||
                  elements.tttField[0][i + 2] === "X" && elements.tttField[0][i + 2] === elements.tttField[1][i + 1] && elements.tttField[1][i + 1] === elements.tttField[2][i]
                  ) {
                    text.textContent = "Ви виграли!";
                    startButton.textContent = "Заново";
                    startButton.removeAttribute("disabled");
                    aiPickButton.toggleAttribute("disabled");
                    aiPickButton.removeEventListener("click", TicTacToeAiPickFunction);
                    return
              }
            }

            if (elements.tttButtons.length === 0) {
              text.textContent = "Нічия!";
              startButton.textContent = "Заново";
              startButton.removeAttribute("disabled");
              aiPickButton.toggleAttribute("disabled");
              aiPickButton.removeEventListener("click", TicTacToeAiPickFunction);
              return
            }  
          }

          elements.tttButtons.forEach((item) => item.addEventListener("click", pickTicTacToeGameFunction));
        }

        startButton.addEventListener("click", startTicTacToeGameFunction);
        
      }
    },
    {
      id: 9,
      name: 'Highest-number',
      category: 'numerical',
      createGame() {
        const neededIndex = this.id - 1;
        const secondTitle = document.createElement("h2");
        secondTitle.classList.add("second-title");
        secondTitle.textContent = "Введіть 3 числа";
        elements.containers[neededIndex].prepend(secondTitle);

        const form = document.createElement("form");
        const num1 = document.createElement("input");
        const num2 = document.createElement("input");
        const num3 = document.createElement("input");
        const text = document.createElement("p");
        const span = document.createElement("span");

        elements.biggestNumberInputs.push(num1, num2, num3);
        for (let i = 0; i < elements.biggestNumberInputs.length; i += 1) {
          elements.biggestNumberInputs[i].classList.add(`num-${i + 1}`);
          elements.biggestNumberInputs[i].classList.add("biggest-num-input");
          elements.biggestNumberInputs[i].name = `num${i + 1}`;
          elements.biggestNumberInputs[i].placeholder = "Введіть число";
          form.append(elements.biggestNumberInputs[i]);
        }
        
        form.classList.add("biggest-number-form");
        text.classList.add("biggest-num-text");
        text.textContent = "Найбільше число, яке ви ввели - ";
        span.classList.add("biggest-num-span");
        span.textContent = "(число)";

        text.append(span)
        elements.containers[neededIndex].append(form, text);

        const focusBiggestNumberFunction = (event) => {
          
          const index = elements.biggestNumberInputs.findIndex((item) => item === event.target);

          elements.nums[index] = Number(event.target.value);
          let biggestNum = elements.nums[0];
          for (const num of elements.nums) {
            if (num >= biggestNum) {
              biggestNum = num;
            }
          }
          
          text.textContent = `Найбільше число, яке ви ввели - ${biggestNum}`;
        }

        elements.biggestNumberInputs.forEach((elem) => elem.addEventListener("input", focusBiggestNumberFunction));
        
      }
    },
    {
      id: 10,
      name: 'Team',
      category: 'acquaintance',
      createGame() {
        const neededIndex = this.id - 1;
        const secondTitle = document.createElement("h2");
        secondTitle.classList.add("second-title");
        secondTitle.textContent = "Наша команда";
        elements.containers[neededIndex].prepend(secondTitle);

        const leftButton = document.createElement("button");
        const rightButton = document.createElement("button");
        const teamList = document.createElement("ul");
        const teamListContainer = document.createElement("div");

        leftButton.classList.add("team-button", "left-team-button");
        rightButton.classList.add("team-button", "right-team-button");
        teamList.classList.add("team-list");
        teamListContainer.classList.add("team-list-container");

        teamListContainer.append(leftButton, teamList, rightButton);
        elements.containers[neededIndex].append(teamListContainer);
      }
    },
    {
      id: 11,
      name: 'Scientist',
      category: 'acquaintance',
      createGame() {
        const neededIndex = this.id - 1;
        const secondTitle = document.createElement("h2");
        secondTitle.classList.add("second-title");
        secondTitle.textContent = "Обери вченого/их";
        elements.containers[neededIndex].prepend(secondTitle);
      }
    },
  ];
  

games.forEach((game) => {
    const section = document.createElement("section");
    const container = document.createElement("div");

    section.classList.add("section");
    section.classList.add(`${game.name}-section`);
    section.id = `${game.name}-section`;
    container.classList.add(`${game.name}-container`);
    section.dataset.type = game.category;

    elements.sections.push(section);
    elements.containers.push(container);

    game.createGame();

    section.prepend(container);
    elements.main.append(section);
})