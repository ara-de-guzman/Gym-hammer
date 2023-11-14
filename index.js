"use strict";

const heroContainer = document.querySelector(".hero-section-image");
const btnRight = document.querySelector("#btn-right");
const btnLeft = document.querySelector("#btn-left");
const userBtn = document.querySelector(".user-btn");
const signInForm = document.querySelector(".signin-form");
const freeShirtSection = document.querySelector("#result-shirt");
const shirtColorChoices = document.querySelectorAll(".choice");
const resultShirtContainer = document.querySelector("#result-shirt");
const classChoices = document.querySelectorAll(".class-choices-section li");
const choiceInfoContainer = document.querySelector(".class-choice-info");
const chosenMember = document.querySelectorAll(".member-features button");
const membershipContainer = document.querySelector(".membership");
const overlay = document.querySelector("#overlay");
const menuBar = document.querySelector("#menu");
const menu = document.querySelector("header nav ul");

menuBar.addEventListener("click", () => {
  menu.classList.toggle("change");
  overlay.classList.toggle("change");
});

// Index
function init() {
  let counter = 0;
  if (heroContainer) {
    heroContainer.innerHTML =
      "<img src = './images/guy1.png' alt=guy1' class='animate-right'>";
  } else {
    return null;
  }
  function incrementImg() {
    counter++;
    if (counter >= 6) {
      return (counter = 0);
    } else {
      heroContainer.innerHTML = `<img src = './images/guy${counter}.png' alt=guy${counter} class='animate-right'>`;
    }
  }
  function decrementImg() {
    counter--;
    if (counter <= 0) {
      return (counter = 6);
    } else {
      heroContainer.innerHTML = `<img src = './images/guy${counter}.png' alt=guy${counter} class='animate-left'>`;
    }
  }
  btnRight.addEventListener("click", incrementImg);
  btnLeft.addEventListener("click", decrementImg);
}

async function getData() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

function createInfoElem(result) {
  choiceInfoContainer.innerHTML = "";
  choiceInfoContainer.insertAdjacentHTML(
    "afterbegin",
    `
    <div class='result-container'>
     <div class='result-container-image'>
      <img src=${result.image} alt=${result.name}/>
     </div>
     <div class='result-container-text'>
       <h1>${result.name}</h1>
       <p>${result.description}</p>
       <button>Check for more info</button>
     </div>
    </div>
  `
  );
}
classChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const chosenClass = choice.textContent;
    getData().then((res) => {
      for (let item in res.classes) {
        if (chosenClass === res.classes[item].name) {
          const result = res.classes[item];
          createInfoElem(result);
        }
      }
    });
  });
});

chosenMember.forEach((chosen) => {
  chosen.addEventListener("click", () => {
    overlay.classList.add("change");
    const parentEl = chosen.parentElement.parentElement;
    const elemImg = parentEl.querySelector("img").getAttribute("src");
    const chosenMembership = parentEl.querySelector("h1").textContent;
    const createDiv = document.createElement("div");
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.addEventListener("click", () => {
      createDiv.style.display = "none";
      overlay.classList.remove("change");
    });
    createDiv.innerHTML = `<div class='form-container'>
    <form class='signup-form'>
    <h1>Sign Up</h1>
  <label for="fname">First name</label>
  <input type="text" id="fname" name="fname">
  <label for="lname">Last name</label>
  <input type="text" id="lname" name="lname">
  <label for="tel">Phone:</label><br>
  <input type="tel" id="tel" name="tel">
  <label for="email">Email</label>
  <input type="email" id="email" name="email">
  <label for="username">Username</label>
  <input type="username" id="username" name="username">
  <label for="password">Password</label>
  <input type="password" id="password" name="password">
  <label for="password">Retype Password</label>
  <input type="password" id="password" name="password">
  <button type="submit">Submit</button>
  <button type="reset">Cancel</button>
  </form>
  <div class='card-member-img'>
  <h1>Congratulations you chose ${chosenMembership}</h1>
  <img src="${elemImg}" alt='pic'/>
  </div>
  </div>`;
    createDiv.className = "form-member";
    closeBtn.classList = "form-member-btn";
    createDiv.append(closeBtn);
    membershipContainer.appendChild(createDiv);
  });
});

shirtColorChoices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    const chosenColor = choice.getAttribute("value");
    let img = freeShirtSection.querySelector("img");
    img.src = `images/${chosenColor}-shirt.png`;
  });
});

userBtn.addEventListener("click", () => {
  signInForm.classList.toggle("change");
});

document.addEventListener("DOMContentLoaded", init);
