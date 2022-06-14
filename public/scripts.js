const popupCloseBtn = document.getElementById('close-popup');

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
      let meals = JSON.parse(localStorage.getItem("InitialSearchFoodJSON"));
      renderforsearch(meals, false, 1);
      localStorage.removeItem("InitialSearchFood");
      localStorage.removeItem("InitialSearchFoodJSON");
      // -----------------------
      addFavourite(meals);
    }
  })
  (window);
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
    searchedFoodItems = [];
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
  let meals = data.hits;
  console.log(meals);
  if (val == 0) render(meals); //for favourites
  else if (val == 1) {
    renderforsearch(meals);
    // ----------------------------
    addFavourite(meals);

  } else if (val == 2) {
    localStorage.setItem("InitialSearchFoodJSON", JSON.stringify(meals));
  }
};
// rendering favourites section
const render = (meals) => {
  let desc = meals[0].recipe.healthLabels;
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
<img src='${meals[0].recipe.image}' class='card-img-top' alt='...'>
<div class='card-body'>
  <h5 class='card-title'>${meals[0].recipe.label}</h5>
  <ul class='card-text'>${list}</ul>
</div>
</div>
</div>
<div class='col-12 col-sm-6 col-lg-7 mb-3 renderedIngredients'>
<div class='card container-fluid p-5'>
<h5>Ingredients</h5>
${meals[0].recipe.ingredientLines}
<a href='${meals[0].recipe.url}' target='_blank' class='btn btn-primary recipeLink'>Get Recipe!</a>
</div>
</div>
</div>
  ` + existing;
};

//SEARCH ALL DISHES SECTION
const mealPopup = document.getElementById('meal-popup');
const apiall = document.getElementById("apiall");
const mealInfoEl = document.getElementById('meal-info');

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
const renderforsearch = (meals) => {
  console.log("inside the render search: " + meals);
  // to clean up
  apiall.innerHTML = "";

  // create container to show results
  const results = document.createElement("div")

  results.innerHTML = `<section class="col-12  apitile">
  <h2>Search Results</h2>
</section>`;

  let n = meals.length;
  for (let i = 0; i < n; i++) {
    results.innerHTML += `
    <div class="row d-flex justify-content-evenly pt-3" >
    <div class='col-12 col-sm-6 col-lg-4 mb-3 renderedtiles'>
    <div class='card container-fluid p-4'>
  <img src='${meals[i].recipe.image}' class='card-img-top' alt='...'>
  <div class='card-body'>
    <h5 class='card-title'>${meals[i].recipe.label}</h5>

  </div>
  </div>
  </div>
  <div class='col-12 col-sm-6 col-lg-7 mb-3 renderedIngredients'>
  <div class='card container-fluid p-5'>
  <h5>Ingredients</h5>
  ${meals[i].recipe.ingredientLines}
  <button class='btn btn-primary recipeLink' id='getRecipe'>Get Recipe!</button>
  <div class = 'btn btn-primary addFavo recipeLink mt-4' id='fav${i}'>Add to Favourites</div>
  </div>
  </div>
  </div>
    `;
    // <a href='${data.hits[i].recipe.url}' target='_blank' >
    const recipeBtn = results.querySelector('#getRecipe')
    recipeBtn.addEventListener('click', () => {
      mealInfoEl.innerHTML = "";

      //  update the Meal Info
      const mealEl =document.createElement('div')

      const ingredients = [];

      mealEl.innerHTML = `
      <h1>${meals[i].recipe.label}</h1>
      <div class="d-flex justify-content-between">
        <img
        src="${meals[i].recipe.image}"
        alt="...">
        <div class="ingredients-list">
          <h3>Ingredients:</h3>
          <ul>
          ${meals[i].recipe.ingredientLines}
            </ul>
        </div>
      `;

      mealInfoEl.appendChild(mealEl);
        mealPopup.classList.remove('hidden');// show the popup
    })

  }

  apiall.appendChild(results);
};

// ' add to favourites ' functionality
const addFavourite = (meals) => {
  //using event delegation to add event listeners to dynamically rendered contact
  $(document).on("click", "div.addFavo", function (e) {
    let element = e.currentTarget;
    let id = element.id;
    console.log(element);
    console.log(id);
    let number = id.charAt(id.length - 1);
    let name = meals[number].recipe.label;
    console.log(name);
    console.log(number);
    let flag = 0;
    for (let i = 0; i < searchedFoodItems.length; i++) {
      if (searchedFoodItems[i] == name) {
        flag = 1;
        break;
      }
    }
    if (flag != 1) {
      sendAPIreq(name, start, 0);
      if (start == true) start = false;
      searchedFoodItems.push(name);
    }
  });
}
