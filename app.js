async function loadData(name) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data;
}

const displayFoodDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;

    fetch(url)
        .then(res => res.json())
        .then(data => renderFoodInfo(data.meals[0]));
    // console.log(data.meals[0]))
};


const takeData = () => {
    document.getElementById("button").addEventListener("click", () => {
        const foodName = document.getElementById("search").value;

        loadData(foodName).then(data => {
            displayFoods(data);
        });
    });

};
takeData();

// After Search
const displayFoods = (data) => {
    const meals = data.meals;
    const cardGroup = document.getElementById("cardGroup");
    meals.forEach(element => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "col";
        const foodInfo = `
            <div onclick="displayFoodDetails(${element.idMeal})" class="foodCard  card  text-center">
                <img src="${element.strMealThumb}" class="image card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${element.strMeal}</h5>
                </div>
            </div>
        `;
        cardDiv.innerHTML = foodInfo;
        cardGroup.appendChild(cardDiv);
    });
    document.getElementById("search").value = "";
}

// When click on Card
const renderFoodInfo = food => {

    const foodDiv = document.getElementById("foodDetails");
    foodDiv.innerHTML = `
        <div class="foodDetail card mb-3">
      <img src="${food.strMealThumb}" class="image card-img-top" alt="...">
      <div class="card-body">
        <h3 class="card-title">${food.strMeal}</h3>
        <h5>Ingredients</h5>
        <p id="list" class="card-text"></p>
        
        
      </div>
    </div>
    <br>
    <hr>
        `;
    const listItem = listOfInstruction(food.strInstructions);
    document.getElementById("list").appendChild(listItem);
}

// convert Introduction String to li
const listOfInstruction = data => {
    const string = data.split('.').slice(0, -1);
    const ul = document.createElement("ul");
    const li = document.createElement('li');
    ul.className = 'fa-ul'
    string.forEach(element => {
        ul.innerHTML += `
        <li class="listItem"><span class="fa-li"><i class="fa fa-check-square"></i></span>${element}</li>
        `;
    });

    return ul;
}