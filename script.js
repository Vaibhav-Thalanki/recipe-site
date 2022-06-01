$(document).ready(() => {
  ((global) => {
    sendAPIreq("pizza");
    sendAPIreq("chicken");
  })(window);
});
let searchedFoodItems = ["pizza", "chicken"];
let start = true;
$("#tile-1").click(() => {
  let food = $("#foodsearch").val();
  let flag = 0;
  for (let i = 0; i < searchedFoodItems.length; i++) {
    if (searchedFoodItems[i] == food) {
      flag = 1;
      break;
    }
  }
  if (flag != 1) {
    if (start == true) searchedFoodItems = [];
    sendAPIreq(food, start);
    searchedFoodItems.push(food);
  }
  start = false;
});

const sendAPIreq = async (food, start) => {
  let APP_ID = "f9edf711";
  let API_KEY = "9eb288e3e07b2f96d536b0c5c8d4580a";
  if (start == true) {
    document.getElementById("apicards").innerHTML = "";
  }
  let response = await fetch(
    "https://api.edamam.com/search?app_id=" +
      APP_ID +
      "&app_key=" +
      API_KEY +
      "&q=" +
      food
  );
  console.log(
    "https://api.edamam.com/search?app_id=" +
      APP_ID +
      "&app_key=" +
      API_KEY +
      "&q=" +
      food
  );
  let data = await response.json();
  console.log(data);
  render(data);
};

const render = (data) => {
  let desc = data.hits[0].recipe.healthLabels;
  let desclen = Object.keys(desc).length;
  let list = "";
  let n = desclen > 5 ? 5 : desclen;
  for (let i = 0; i < n; i++) {
    let str = "<li>" + desc[i] + "</li>";
    list += str;
  }
  let existing = document.getElementById("apicards").innerHTML;
  document.getElementById("apicards").innerHTML =
    `
  <div class="row d-flex justify-content-evenly pt-3" >
  <div class='col-12 col-sm-6 col-lg-4 mb-3 renderedtiles'>
  <div class='card container-fluid p-4'>
<img src='${data.hits[0].recipe.image}' class='card-img-top' alt='...'>
<div class='card-body'>
  <h5 class='card-title'>${data.hits[0].recipe.label}</h5>
  <ul class='card-text'>${list}</ul>
</div>
</div>
</div>
<div class='col-12 col-sm-6 col-lg-7 mb-3 renderedIngredients'>
<div class='card container-fluid p-5'>
<h5>Ingredients</h5>
${data.hits[0].recipe.ingredientLines}
<a href='${data.hits[0].recipe.url}' target='_blank' class='btn btn-primary recipeLink'>Get Recipe!</a>
</div>
</div>
</div>
  ` + existing;
};
