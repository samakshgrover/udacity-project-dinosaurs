//Global constants
const grid = document.getElementById("grid");
const btn = document.getElementById("btn");
const form = document.getElementById("dino-compare");

//Dino class(constructor)
class Dino {
  constructor(el) {
    this.species = el.species;
    this.weight = el.weight;
    this.height = el.height;
    this.diet = el.diet;
    this.where = el.where;
    this.when = el.when;
    this.fact = el.fact;
  }

  //method for getting random fact
  getFact(human) {
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
      //comparision 1
      case "height": {
        return human.height < this.height
          ? `${this.species} was ${this.height}inches taller then you`
          : `${this.species} was ${this.height}inches smaller then you`;
      }
      //comparision 2
      case "weight": {
        return human.weight < this.weight
          ? `${this.species} was ${this.weight}lbs heavier then you`
          : `${this.species} was ${this.weight}lbs lighter then you`;
      }
      //comparision 3
      case "where": {
        return `${this.species} lived what is now ${this.where}`;
      }
      //comparision 4
      case "when": {
        return `${this.species} was found in ${this.when}`;
      }
      //comparision 5
      case "fact": {
        return this.fact;
      }
      //comparision 6
      case "diet": {
        return `${this.species} was ${this.diet}`;
      }
      default:
        return "";
    }
  }
}

//Human class(constructor)
class Human {
  constructor(name, height, weight, diet) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
    this.species = "human";
    this.fact = "";
  }

  //getting fact for Human(which would be a empty string)
  getFact() {
    return this.fact;
  }
}

//creating dino objects from dino.json file
//first we read the file
//then we will create the objects
async function dinoObjects() {
  const res = await fetch("dino.json");
  const data = await res.json();
  const arr = data.Dinos.map((el) => {
    return new Dino(el);
  });
  return arr;
}

//IIFE for reading data and creating human object from Human Constructor
const human = (function () {
  const name = document.getElementById("name").value;
  const feet = document.getElementById("feet").value || 0;
  const inches = document.getElementById("inches").value || 0;
  const weight = document.getElementById("weight").value || 0;
  const diet = document.getElementById("diet").value;
  const height = feet * 12 + inches;

  return new Human(name, height, weight, diet);
})();

//this method will create and append tile on grid
function gridItem(name, species, fact) {
  
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

btn.addEventListener("click", async () => {

  //removing form
  form.parentNode.removeChild(form);

  //getting dino objects and adding human object in middle
  const dinos = await dinoObjects();
  dinos.splice(4, 0, human);

  //adding GridItems(tiles) to Grid(DOM)
  dinos.forEach((el) => {
    gridItem(el.name, el.species, el.getFact(human));
  });
});
