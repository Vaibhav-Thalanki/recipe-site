// variable declared
  const resultsVeggy = document.querySelector("#content");
sendAPIreq();
showResults();

//async function to fetch data from the APP
async function sendAPIreq() {
  let APP_ID = "a4ede9e0"
  let API_KEY = "cf6e2d134dc103cce2e6813e685bb081";
  let resp =  await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=vegetarian`);
  let respData = await resp.json();
  const meals = respData.hits;

  console.log(meals);
  return meals;
}

//fxn that does something with the data from the API request
function addMeal(mealData, random= false){
  const meal = document.createElement('div');
  meal.classList.add('meal');

  meal.innerHTML =`
  <div class="card" style="width: 18rem;">
  <img src="${mealData.recipe.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${mealData.recipe.label}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button class="btn recipeLink mt-4><a href="${mealData.recipe.url}">Get recipe!</a></button>
  </div>
</div>`;

  resultsVeggy.appendChild(meal);
};

async function showResults() {
  resultsVeggy.innerHTML ='';

  const meals = await sendAPIreq();

  if (meals) {
  meals.forEach((meal) => {
    addMeal(meal);
  });
  }
}
