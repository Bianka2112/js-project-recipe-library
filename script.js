
const messageBox = document.getElementById("message")

const pickAllFilter = document.getElementById("all")
const pickMexicanFilter = document.getElementById("mexican")
const pickMediterraneanFilter = document.getElementById("mediterranean")
const pickAsianFilter = document.getElementById("asian")

const buttons = document.querySelectorAll(".filtered, .sorted")

//Helper functions
const updateMessage = (message) => {
  messageBox.innerHTML = '';  // Clear the message box
  messageBox.innerHTML += `<p>${message}</p>`
}

const clearActiveButtons = () => {
  buttons.forEach(button => {
    button.classList.remove("active");
  });
}

// Function to filter by Cuisine
const filterChoice = () => {

  pickAllFilter.addEventListener("click", () => {
    clearActiveButtons()
    pickAllFilter.classList.add("active")
    updateMessage("You eat everything, maybe liver then?")
    loadRecipes(recipes)
  })

  pickMexicanFilter.addEventListener("click", () => {
    clearActiveButtons()
    pickMexicanFilter.classList.add("active")
    updateMessage("Yes. The answer is always tacos")
    loadRecipes(recipes.filter(items => items.cuisine.toLowerCase() === "mexican"))
  })

  pickMediterraneanFilter.addEventListener("click", () => {
    clearActiveButtons()
    pickMediterraneanFilter.classList.add("active")
    updateMessage("They say Mediterranean is the healthiest diet")
    loadRecipes(recipes.filter(items => items.cuisine.toLowerCase() === "mediterranean"))
  })

  pickAsianFilter.addEventListener("click", () => {
    clearActiveButtons()
    pickAsianFilter.classList.add("active")
    updateMessage("你选择了中文")
    loadRecipes(recipes.filter(items => items.cuisine.toLowerCase() === "asian"))
  })
}

// Function to sort by time
const sortChoice = () => {
  const ascendingButton = document.getElementById("ascending")
  const descendingButton = document.getElementById("descending")

  ascendingButton.addEventListener("click", () => {
    clearActiveButtons()
    ascendingButton.classList.add("active")
    updateMessage("What's the rush?")
    loadRecipes([...recipes].sort((a, b) => a.readyInMinutes - b.readyInMinutes))
  })

  descendingButton.addEventListener("click", () => {
    clearActiveButtons()
    descendingButton.classList.add("active")
    updateMessage("Slow and steady, made with love")
    loadRecipes([...recipes].sort((a, b) => b.readyInMinutes - a.readyInMinutes))
  })
}

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

// Section for dynamic recipe cards
const container = document.getElementById("js-recipe-container")

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
  // Function to generate an unordered list of ingredients
  function generateIngredientsList(ingredients) {
    const ul = document.createElement('ul')
    
    // Iterate through the ingredients array and create <li> items
    ingredients.forEach(ingredient => {
      const li = document.createElement('li') 
      li.textContent = ingredient
      ul.appendChild(li)
    })
    return ul
  }

    // Append the ingredients list dynamically
    const ingredientsContainer = recipeCard.querySelector('.ingredients')
    ingredientsContainer.appendChild(ingredientsList)

    // Append the recipe card to the container
    container.appendChild(recipeCard);
  })
}

loadRecipes(recipes)

filterChoice()

sortChoice()