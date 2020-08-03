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
  console.log(data);
  let name = data["name"];
  let height = data["height"];
  let weight = data["weight"];
  let type = data["type"];
  let frontImg = data.sprites.front_default;
  let backImg = data.sprites.back_default;
  //res is the results div
  let res = document.getElementById("results");
  let typesHtml = makeTypes(data);
  makeDiv(name, height, weight, frontImg, typesHtml, res);
  let img = document.getElementById("pokeImg");
  img.addEventListener("mouseover", () => {
    //let currentUrl = img.getAttribute("src");
    img.setAttribute("src", backImg);
  });
  img.addEventListener("mouseout", () => {
    img.setAttribute("src", frontImg);
  })
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
    html += `<div>Type ${index + 1}: ${arr[index].type.name}</div>`;
  } 
  return html;
}