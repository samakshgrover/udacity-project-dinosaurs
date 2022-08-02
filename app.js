const grid = document.getElementById("grid");
const btn = document.getElementById("btn");
const form = document.getElementById("dino-compare");

//Dino Constructor
function Dino(el) {
  this.species = el.species;
  this.weight = el.weight;
  this.height = el.height;
  this.diet = el.diet;
  this.where = el.where;
  this.when = el.when;
  this.fact = el.fact;
}

//getting random facts for comaprision this method is added on prototype
Dino.prototype.getFact = function (human) {
  const facts = ["height", "weight", "fact", "when", "where", "diet"];
  const random = Math.floor(Math.random() * facts.length);
  let randomFact = facts[random];

  if (this.species === "Pigeon") {
    return this.fact;
  }
  if (this.species === "human") {
    return "";
  }
  switch (randomFact) {
    case "height": {
      return human.height < this.height
        ? `${this.species} was ${this.height}inches taller then you`
        : `${this.species} was ${this.height}inches smaller then you`;
    }
    case "weight": {
      return human.weight < this.weight
        ? `${this.species} was ${this.weight}lbs heavier then you`
        : `${this.species} was ${this.weight}lbs lighter then you`;
    }
    case "where": {
      return `${this.species} lived what is now ${this.where}`;
    }
    case "when": {
      return `${this.species} was found in ${this.when}`;
    }
    case "fact": {
      return this.fact;
    }
    case "diet": {
      return `${this.species} was ${this.diet}`;
    }
    default:
      return;
  }
};

// Human Constructor
function Human(name, height, weight, diet) {
  this.species = "Human";
  this.fact = "";
  this.height = height;
  this.weight = weight;
  this.diet = diet;
  this.name = name;
  this.getFact = (obj) => "";
}

//Reading Json
async function dinoDataFromJson() {
  const res = await fetch("dino.json");
  const { Dinos } = await res.json();
  return Dinos;
}

//function for object Dino creaction
async function createDinoObjects() {
  let arr;
  const data = await dinoDataFromJson();
  arr = data.map((el) => new Dino(el));

  return arr;
}

// Reading form data and creating Human object
function humanObjectFromFormData() {
  const name = document.getElementById("name").value;
  const feet = document.getElementById("feet").value || 0;
  const inches = document.getElementById("inches").value || 0;
  const weight = document.getElementById("weight").value || 0;
  const diet = document.getElementById("diet").value;
  const height = feet * 12 + inches;

  return new Human(name, height, weight, diet);
}

//Combining Human and Dino objects together(human at center)
async function GridTilesArr() {
  const human = humanObjectFromFormData();
  const dinoArr = await createDinoObjects();
  dinoArr.splice(4, 0, human);
  return { dinoArr, human };
}

// GridItem
function gridItem(name = "", species, fact) {
  //creating elements
  const gridTile = document.createElement("div");
  const heading = document.createElement("h3");
  const img = document.createElement("img");
  const para = document.createElement("p");

  //adding class
  gridTile.classList.add("grid-item");

  //adding content to elements
  heading.textContent = name ? name : species;
  para.textContent = fact;
  img.src = `images/${species.toLowerCase()}.png`;

  //appending childern to dom
  gridTile.appendChild(heading);
  gridTile.appendChild(img);
  gridTile.appendChild(para);

  //appending gridTile to grid
  grid.appendChild(gridTile);
}

//adding click event to form
btn.addEventListener("click", async () => {
  //creating array of gridItems(human and dinos)
  const { dinoArr: arr, human } = await GridTilesArr();

  //removing form
  form.parentNode.removeChild(form);

  //adding GridItems to Grid(DOM)
  arr.map((el) => {
    if (el === human) {
      console.log("human", el.getFact);
    } else {
      console.log(el.getFact(human));
    }
    // debugger;
    gridItem(el.name, el.species, el.getFact(human));
  });
});
