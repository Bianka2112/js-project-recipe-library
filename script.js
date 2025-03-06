
const messageBox = document.getElementById("message")

const container = document.getElementById("js-recipe-container")

const pickAllFilter = document.getElementById("all")
const pickUsaFilter = document.getElementById("usa")
const pickItalyFilter = document.getElementById("italy")
const pickChinaFilter = document.getElementById("china")

const pickSort = document.getElementById("sort-btns")

const filterChoice = () => {

  pickAllFilter.addEventListener("click", () => {
    console.log("all picked")
    messageBox.innerHTML += `
    <p>You eat everything, maybe liver then?</p>`
  })

  pickUsaFilter.addEventListener("click", () => {
    console.log("usa picked")
    messageBox.innerHTML += `
    <p>Let's get you that fried chicken and waffles!</p>`
  })

  pickItalyFilter.addEventListener("click", () => {
    console.log("italy picked")
    messageBox.innerHTML += `
    <p>Quick: pizza or pasta? The answer is always YES</p>`
  })

  pickChinaFilter.addEventListener("click", () => {
    console.log("china picked")
    messageBox.innerHTML += `
    <p>你选择了中文</p>`
  })
}

filterChoice()

const sortChoice = () => {
  
  pickSort.addEventListener("click", () => {
    if (pickSort = document.getElementById("ascending"))
      messageBox.innerHTML += `
      <p>In a rush much?<p>`
    else (document.getElementById("descending"))
      messageBox.innerHTML += `
      <p>Slow and steady, made with love<p>`
})
} 

sortChoice()

// Technigo Recipe block
const recipes = [
  {
    id: 1,
    title: "Vegan Lentil Soup",
    image: "./chicken.webp",
    readyInMinutes: 30,
    servings: 4,
    sourceUrl: "https://example.com/vegan-lentil-soup",
    diets: ["vegan"],
    cuisine: "Mediterranean",
    ingredients: [
      "red lentils",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "cumin",
      "paprika",
      "vegetable broth",
      "olive oil",
      "salt"
    ],
    pricePerServing: 2.5,
    popularity: 85
  },
  {
    id: 2,
    title: "Vegetarian Pesto Pasta",
    image: "./chicken.webp",
    readyInMinutes: 25,
    servings: 2,
    sourceUrl: "https://example.com/vegetarian-pesto-pasta",
    diets: ["vegetarian"],
    cuisine: "Italian",
    ingredients: [
      "pasta",
      "basil",
      "parmesan cheese",
      "garlic",
      "pine nuts",
      "olive oil",
      "salt",
      "black pepper"
    ],
    pricePerServing: 3.0,
    popularity: 92
  },
  {
    id: 3,
    title: "Gluten-Free Chicken Stir-Fry",
    image: "./chicken.webp",
    readyInMinutes: 20,
    servings: 3,
    sourceUrl: "https://example.com/gluten-free-chicken-stir-fry",
    diets: ["gluten-free"],
    cuisine: "Asian",
    ingredients: [
      "chicken breast",
      "broccoli",
      "bell pepper",
      "carrot",
      "soy sauce (gluten-free)",
      "ginger",
      "garlic",
      "sesame oil",
      "cornstarch",
      "green onion",
      "sesame seeds",
      "rice"
    ],
    pricePerServing: 4.0,
    popularity: 78
  },
  {
    id: 4,
    title: "Dairy-Free Tacos",
    image: "./chicken.webp",
    readyInMinutes: 15,
    servings: 2,
    sourceUrl: "https://example.com/dairy-free-tacos",
    diets: ["dairy-free"],
    cuisine: "Mexican",
    ingredients: [
      "corn tortillas",
      "ground beef",
      "taco seasoning",
      "lettuce",
      "tomato",
      "avocado"
    ],
    pricePerServing: 2.8,
    popularity: 88
  },
  {
    id: 5,
    title: "Middle Eastern Hummus",
    image: "./chicken.webp",
    readyInMinutes: 10,
    servings: 4,
    sourceUrl: "https://example.com/middle-eastern-hummus",
    diets: ["vegan", "gluten-free"],
    cuisine: "Middle Eastern",
    ingredients: [
      "chickpeas",
      "tahini",
      "garlic",
      "lemon juice",
      "olive oil"
    ],
    pricePerServing: 1.5,
    popularity: 95
  },
  {
    id: 6,
    title: "Quick Avocado Toast",
    image: "./chicken.webp",
    readyInMinutes: 5,
    servings: 1,
    sourceUrl: "https://example.com/quick-avocado-toast",
    diets: ["vegan"],
    cuisine: "Mediterranean",
    ingredients: [
      "bread",
      "avocado",
      "lemon juice",
      "salt"
    ],
    pricePerServing: 2.0,
    popularity: 90
  },
  {
    id: 7,
    title: "Beef Stew",
    image: "./chicken.webp",
    readyInMinutes: 90,
    servings: 5,
    sourceUrl: "https://example.com/beef-stew",
    diets: [],
    cuisine: "European",
    ingredients: [
      "beef chunks",
      "potatoes",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "beef broth",
      "red wine",
      "bay leaves",
      "thyme",
      "salt",
      "black pepper",
      "butter",
      "flour",
      "celery",
      "mushrooms"
    ],
    pricePerServing: 5.5,
    popularity: 80
  }
]

// Function to generate an unordered list of ingredients
function generateIngredientsList(ingredients) {
const ul = document.createElement('ul') // Create the unordered list

// Iterate through the ingredients array and create <li> items
ingredients.forEach(ingredient => {
  const li = document.createElement('li') // Create a list item for each ingredient
  li.textContent = ingredient
  ul.appendChild(li)
})

return ul // Return the unordered list
}

// Function for dynamic recipe cards
const loadRecipes = (recipesArray) => {
  container.innerHTML = '' //resets the container before load the recipes

  recipesArray.forEach(item => {
    // Generate the ingredients list for this recipe
    const ingredientsList = generateIngredientsList(item.ingredients);
    
    // Create the recipe card content dynamically
    const recipeCard = document.createElement('article')
    recipeCard.classList.add('recipe-cards')

    recipeCard.innerHTML = `
      <img src="./assets/image.png" alt="${item.title}">
      <div class="recipe-title">
        <h3>${item.title}</h3>
      </div>
      <div class="recipe-details">
        <p class="cuisine"><b>Cuisine:</b> ${item.cuisine}</p>
        <p class="time"><b>Time:</b> ${item.readyInMinutes} minutes</p>
        <p class="servings"><b>Serves:</b> ${item.servings}</p>
      </div>
      <div class="ingredients">
        <h4>Ingredients</h4>
      </div>
    `

    // Append the ingredients list dynamically
    const ingredientsContainer = recipeCard.querySelector('.ingredients')
    ingredientsContainer.appendChild(ingredientsList)

    // Append the recipe card to the container
    container.appendChild(recipeCard);
  })
}

loadRecipes(recipes)