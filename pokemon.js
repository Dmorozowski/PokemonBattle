const baseURL = "https://pokeapi.co/api/v2/pokemon/";
let url;

//SEARCH FORM
const searchPokedex = document.querySelector(".search");
const searchForm = document.querySelector("form");
const subitBtn = document.querySelector("submit");

//RESULTS SECTION
const section = document.querySelector("section");

searchForm.addEventListener("submit", fetchResults);

// Submit Event Function
function fetchResults(e) {
  e.preventDefault();
  //Assemble the full URL
  url = baseURL + searchPokedex.value;

  console.log("URL:", url);

  fetch(url)
    .then(function(result) {
      return result.json();
    })
    .then(function(json) {
      // console.log(json);
      displayResults(json);
    });

  function displayResults(json) {
    console.log("Display Results", json);
    while (section.firstChild) {
      // console.log("works");
      section.removeChild(section.firstChild);
    }
    let pokemon = json;
    // console.log(pokemon);
    // console.log(json);

    if (searchPokedex.length === 0) {
      console.log("No results");
    } else {
      let form = document.createElement("form");
      let heading = document.createElement("h2");
      heading.setAttribute("id", "h2");
      let img = document.createElement("img");
      img.setAttribute("id", "img-one");
      let clearfix = document.createElement("div");
      let para = document.createElement("para");
      para.setAttribute("class", "moves");

      // console.log("Current:", json.species.name);

      heading.textContent = pokemon.species.name;
      console.log("Pokemon:", pokemon);

      if (pokemon.sprites.front_default.length > 0) {
        img.src = pokemon.sprites.front_default;
        img.alt = "Picture of the Pokemon";
      }

      para.textContent = "Moves: ";

      for (let j = 0; j < 1; j++) {
        let span = document.createElement("span");
        span.setAttribute("class", "individualMoves");
        span.textContent += pokemon.moves[0].move.name + ", ";
        span.textContent += pokemon.moves[3].move.name + ", ";
        span.textContent += pokemon.moves[8].move.name + ", ";
        span.textContent += pokemon.moves[11].move.name + " ";
        para.appendChild(span);
      }

      // console.log(
      //   `A few moves that ${pokemon.species.name} can learn are ${pokemon.moves[0].move.name}, ${pokemon.moves[3].move.name}, ${pokemon.moves[8].move.name}, and ${pokemon.moves[11].move.name}.`
      // );

      // if (json.sprites.front_default === true) {
      //   img.src = json.sprites.front_default;
      //   img.alt = current.pokemon.photo;
      // }
      clearfix.setAttribute("class", "clearfix");

      form.appendChild(heading);
      form.appendChild(clearfix);
      form.appendChild(img);
      form.appendChild(para);
      section.appendChild(form);
    }
  }
}
