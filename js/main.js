const marqueeContent = document.getElementById('marqueeContent');
let position = 0;
const speed = 5; 

function moveMarquee() {
    position -= speed;
    marqueeContent.style.transform = `translateX(${position}px)`;

    if (position < -marqueeContent.offsetWidth) {
        position = window.innerWidth;
    }

    requestAnimationFrame(moveMarquee);
}

moveMarquee();

var row = document.getElementById('food');
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((response) => response.json())
    .then((json) => {
        // console.log(json);

        var view = "";
        for (const item of json.categories) {
            view += `
              <div class="col-md-4">
                <div class="card mb-3">
                  <img src="${item.strCategoryThumb}" class="card-img-top" alt="img">
                  <div class="card-body">
                    <h5 class="card-title">${item.strCategory}</h5>
                    <p>${item.strCategoryDescription.slice(0,43)}...</p>
                    <a href="meal.html?category=${item.strCategory}" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>`;
        }

        row.innerHTML = view;
    });

function fetchMealsByCategory(category) {
    var url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMeals(data.meals);
        })
        .catch(error => console.error('Error fetching meals:', error));
}

// Function to display meals
function displayMeals(meals) {
    var mealsContainer = document.getElementById('mealsContainer');
    mealsContainer.innerHTML = '';

    if (meals) {
      console.log("siiiiiiiii"+meals)
        meals.forEach(meal => {
            var mealHtml = `
                <div class="col-md-4 mb-4">
                  <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <a href="meal-details.html?id=${meal.idMeal}" class="btn btn-primary">View Details</a>
                    </div>
                  </div>
                </div>
              `;
            mealsContainer.innerHTML += mealHtml;
        });
    } else {
        mealsContainer.innerHTML = '<p>No meals found</p>';
    }
}

// Get category from URL
var urlParams = new URLSearchParams(window.location.search);
var category = urlParams.get('category');

// Fetch meals based on category
if (category) {
    fetchMealsByCategory(category);
} else {
    console.error('Category not specified in URL');
}