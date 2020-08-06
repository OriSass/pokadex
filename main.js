const searchPokemon = async () => {
  let pokemonId = document.getElementById("search").value;
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .catch(function (error) {
      alert('This Name or ID do Not Exist');
    });
  showPokeStats(data);

  /*else console.log("no Such ID");*/
};
//searchPokemon();

let sButton = document.getElementById("searchButton");
sButton.addEventListener("click", searchPokemon);

function showPokeStats(data) {
  //console.log(data);
  let name = data["name"];
  let height = data["height"];
  let weight = data["weight"];
  let type = data["type"];
  let frontImg = data.sprites.front_default;
  let backImg = data.sprites.back_default;
  
  // res is the results div
  let res = document.getElementById("results");
  let typesHtml = makeTypes(data);
  //addButtonEvents();
  makeDiv(name, height, weight, frontImg, typesHtml, res);
  
  // setting front & back image!
  let img = document.getElementById("pokeImg");
  img.addEventListener("mouseover", () => {
    img.setAttribute("src", backImg);
  });
  img.addEventListener("mouseout", () => {
    img.setAttribute("src", frontImg);
  })
  addButtonEvents();
}
const makeDiv = (name, height, weight, frontImg, typesHtml,  container) => {
  const htmlText = `
          <div class="pokemonContainer">
            <div>Name: ${name}</div>
            <div>height: ${height}</div>
            <div>weight: ${weight}</div>
            <div>picture: <img id="pokeImg" src="${frontImg}" /></div>
            ${typesHtml}
          </div>
        `;
  container.innerHTML = htmlText;
}


const makeTypes = data => {
  let arr = data.types;
  let html = "";
  for (let index = 0; index < arr.length; index++) {
    let pokeType = arr[index].type.name;
    html += `<div>Type ${index + 1}: ${pokeType}</div><button id='${pokeType}' onclick=showPokemonByType(${pokeType})>More ${pokeType} Pokemon</button>`;
  } 
  return html;
}

function addButtonEvents(){
    let buttonArr = document.getElementsByTagName("button");
    if(buttonArr.length > 1)
    {
      for(let i = 1; i < buttonArr.length; i++)
      {
        buttonArr[i].addEventListener('click', showPokemonByType);
      }
    }
}
const showPokemonByType = async () =>{
   let id = event.target.id;
   const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${id}`);
   console.log(data);
   let pokemons = data["pokemon"];
   let results = document.getElementById("results");
   //let html = results.innerHTML;
   let newContent = `<div id="pokemonFromType">`;
   for (let i = 0; i < pokemons.length; i++) {
    newContent += `<div id="${i}">${pokemons[i].pokemon.name}</div>`;
   }
   newContent += `</div>`;
   let oldContent = document.getElementById("pokemonFromType");
   if(oldContent === null){
     results.innerHTML += newContent;
   }
   else{
     oldContent.remove();
     let results = document.getElementById("results");
     results.innerHTML += newContent;
   }
   let container = document.getElementById("pokemonFromType").childNodes;
   container.forEach((pokemon) => {
    pokemon.addEventListener("click", onClickPokemon);
   })

}

function onClickPokemon(){
  let pokemonName = event.target.innerHTML;
  document.getElementById("search").value = pokemonName;
  let res = document.getElementById("results");
  res.innerHTML = "";
  searchPokemon(pokemonName);
}