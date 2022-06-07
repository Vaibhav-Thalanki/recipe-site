// FAVOURITES SECTION

//auto load pizza and chicken in favourites
$(document).ready(() => {
  (async (global) => {
    sendAPIreq("pizza", false, 0);
    sendAPIreq("chicken", false, 0);
    if (
      localStorage.getItem("InitialSearchFood") &&
      window.location.href.includes("searchPage.html")
    ) {
      await sendAPIreq(localStorage.getItem("InitialSearchFood"), false, 2);
      let data = JSON.parse(localStorage.getItem("InitialSearchFoodJSON"));
      renderforsearch(data, false, 1);
      localStorage.removeItem("InitialSearchFood");
      localStorage.removeItem("InitialSearchFoodJSON");
    }
  })(window);
});
let APP_ID = "f9edf711";
let API_KEY = "9eb288e3e07b2f96d536b0c5c8d4580a";
let searchedFoodItems = ["pizza", "chicken"];
let start = true;
//search button for favourites
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
    sendAPIreq(food, start, 0);
    searchedFoodItems.push(food);
  }
  start = false;
});
// API request to fetch for favorites as well as search section
const sendAPIreq = async (food, start, val) => {
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
  if (val == 0) render(data); //for favourites
  else if (val == 1) {
    renderforsearch(data);
  } else {
    localStorage.setItem("InitialSearchFoodJSON", JSON.stringify(data));
  }
};
// rendering favourites section
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

//SEARCH ALL DISHES SECTION

//search button
let getsearch = (val) => {
  var food = $("#searchvalue").val();
  if (val != 0) {
    localStorage.setItem("InitialSearchFood", food);
    location.href = "searchPage.html";
  } else if (val == 0) {
    sendAPIreq(food, false, 1);
  }
};
$("#searchBtn").click(() => {
  getsearch(0);
});

//rendering search section
const renderforsearch = (data) => {
  console.log("inside the render search: " + data);
  let html = document.getElementById("apisearchcards").innerHTML;
  html = `<section class="col-12  apitile">
  <h2>Search Results</h2>
</section>`;
  let n = data.hits.length;
  for (let i = 0; i < n; i++) {
    html += `
    <div class="row d-flex justify-content-evenly pt-3" >
    <div class='col-12 col-sm-6 col-lg-4 mb-3 renderedtiles'>
    <div class='card container-fluid p-4'>
  <img src='${data.hits[i].recipe.image}' class='card-img-top' alt='...'>
  <div class='card-body'>
    <h5 class='card-title'>${data.hits[i].recipe.label}</h5>
    
  </div>
  </div>
  </div>
  <div class='col-12 col-sm-6 col-lg-7 mb-3 renderedIngredients'>
  <div class='card container-fluid p-5'>
  <h5>Ingredients</h5>
  ${data.hits[i].recipe.ingredientLines}
  <a href='${data.hits[i].recipe.url}' target='_blank' class='btn btn-primary recipeLink'>Get Recipe!</a>
  <div class = 'btn btn-primary addFavo recipeLink mt-4' id='fav${i}'>Add to Favourites</div>
  </div>
  </div>
  </div>
    `;
  }
  document.getElementById("apisearchcards").innerHTML = html;
};
//add to favourites
$(".addFavo").click((event) => {
  console.log("brhu");
});
