const takeData = async() => {
    const foodDetails = document.getElementById("foodDetails");
    foodDetails.innerHTML = '';
    const foodName = document.getElementById("search").value;
    console.log(foodName.length != 1);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    const response = await fetch(url);
    const data = await response.json();
    displayFoods(data);
};
// After Search
const displayFoods = (data) => {
    const meals = data.meals;
    const cardGroup = document.getElementById("cardGroup");
    cardGroup.innerHTML = "";

    meals.forEach(element => {

        // const cardDiv = document.createElement("div");
        // cardDiv.className = "col";
        // cardDiv.innerHTML = `
        //         <div onclick="displayFoodDetails(${element.idMeal})" class="foodCard  card  text-center">
        //             <img src="${element.strMealThumb}" class="image card-img-top" alt="...">
        //             <div class="card-body">
        //             <h5 class="card-title">${element.strMeal}</h5>
        //             </div>
        //         </div>
        //     `;
        // cardGroup.appendChild(cardDiv);


        const cardDiv = document.createElement("div");
        cardDiv.className = "col";
        cardDiv.innerHTML = `
            <div onclick="displayFoodDetails(${element.idMeal})" class="foodCard  card  text-center">
                <img src="${element.strMealThumb}" class="image card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${element.strMeal}</h5>
                </div>
            </div>
        `;
        cardGroup.appendChild(cardDiv);
    });
    document.getElementById("search").value = "";
};

const displayFoodDetails = async name => {

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    const response = await fetch(url);
    const data = await response.json()
    renderFoodInfo(data.meals[0])
};
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