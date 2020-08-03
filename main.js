const searchPokemon = async () => {
  debugger;
  let pokemonId = document.getElementById("search").value;
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .catch(function (error) {
      alert('This Name or ID do Not Exist');
    });
  showPokeStats(data);

  /*else console.log("no Such ID");*/
};
//searchPokemon();
debugger;

let sButton = document.getElementById("searchButton");
sButton.addEventListener("click", searchPokemon);

function showPokeStats(data) {
  let name = data["name"];
  let height = data["height"];
  let weight = data["weight"];
  //let type = data["type"];
  let frontImg = data.sprites.front_default;
  let backImg = data.sprites.back_default;
  let res = document.getElementById("results");

  makeDiv(name, height, weight, frontImg, res);
}
const makeDiv = (name, height, weight, frontImg, container) => {
  const htmlText = `
          <div class="pokemonContainer">
            <div>Name: ${name}</div>
            <div>height: ${height}</div>
            <div>weight: ${weight}</div>
            <div>picture: <img src="${frontImg}" /></div>
          </div>
        `;
  container.innerHTML = htmlText;
}