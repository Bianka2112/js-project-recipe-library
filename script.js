//DOM selectors
const messageBox = document.getElementById("message")

const pickAllFilter = document.getElementById("all")
const pickMexicanFilter = document.getElementById("mexican")
const pickMediterraneanFilter = document.getElementById("mediterranean")
const pickAsianFilter = document.getElementById("asian")
const buttons = document.querySelectorAll(".filtered, .sorted")
const randomRecipeBtn = document.getElementById('random-recipe-btn')

const container = document.getElementById("js-recipe-container")

// API RESOURCES
const randomURL = "https://api.spoonacular.com/recipes/random?apiKey=2c9fdce04f884694b4cef3682f7a3bba"


//Helper functions
const updateMessage = (message) => {
  messageBox.innerHTML = '';  // Clear the message box
  messageBox.innerHTML += `<p>${message}</p>`
}

const clearActiveButtons = () => {
  buttons.forEach(button => {
    button.classList.remove("active")
  })
}

const displayNoResultsMessage = (message) => {
  messageBox.innerHTML = `<p>${message}</p>`
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
    const filteredRecipes = manualRecipes.filter(items => items.cuisine.toLowerCase() === "mexican")
    if (filteredRecipes.length === 0) {
      displayNoResultsMessage("No recipes found for Mexican cuisine")
    } else {
      loadRecipes(filteredRecipes)
    }
  })

  pickMediterraneanFilter.addEventListener("click", () => {
    clearActiveButtons()
    pickMediterraneanFilter.classList.add("active")
    updateMessage("They say Mediterranean is the healthiest diet")
    const filteredRecipes = manualRecipes.filter(items => items.cuisine.toLowerCase() === "mediterranean")
    if (filteredRecipes.length === 0) {
      displayNoResultsMessage("No recipes found for Mediterranean cuisine")
    } else {
      loadRecipes(filteredRecipes)
    }
  })

  pickAsianFilter.addEventListener("click", () => {
    clearActiveButtons()
    pickAsianFilter.classList.add("active")
    updateMessage("你选择了中文")
    const filteredRecipes = manualRecipes.filter(items => items.cuisine.toLowerCase() === "asian")
    if (filteredRecipes.length === 0) {
      displayNoResultsMessage("No recipes found for Asian cuisine")
    } else {
      loadRecipes(filteredRecipes)
    }
  })
}

// Function to sort by time
const sortChoice = () => {
  const ascendingButton = document.getElementById("ascending")
  const descendingButton = document.getElementById("descending")

  ascendingButton.addEventListener("click", () => {
    // clearActiveButtons()
    ascendingButton.classList.add("active")
    updateMessage("What's the rush?")
    loadRecipes([...manualRecipes].sort((a, b) => a.readyInMinutes - b.readyInMinutes))
  })

  descendingButton.addEventListener("click", () => {
    // clearActiveButtons()
    descendingButton.classList.add("active")
    updateMessage("Slow and steady, made with love")
    loadRecipes([...manualRecipes].sort((a, b) => b.readyInMinutes - a.readyInMinutes))
  })
}


          // // Function to get a random recipe
          // const getRandomRecipe = (recipesArray) => {
          //   const randomIndex = Math.floor(Math.random() * recipesArray.length)
          //   const randomRecipe = recipesArray[randomIndex];
            
          //   displayRandomRecipe(randomRecipe)
          // }

          // const displayRandomRecipe = (item) => {
          //   const randomRecipeCard = document.createElement('article')
          //   randomRecipeCard.classList.add('recipe-cards')

          //   container.innerHTML = '' 
            
          //   const recipeHTML = `
          //       <img src="./assets/image.png" alt="${item.title}">
          //       <div class="recipe-title">
          //         <h3>${item.title}</h3>
          //       </div>
          //       <div class="recipe-details">
          //         <p class="cuisine"><b>Cuisine:</b> ${item.cuisine}</p>
          //         <p class="time"><b>Time:</b> ${item.readyInMinutes} minutes</p>
          //         <p class="servings"><b>Serves:</b> ${item.servings}</p>
          //       </div>
          //       <div class="ingredients">
          //         <h4>Ingredients:</h4>
          //         <ul>
          //         ${item.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          //         </ul>
          //       </div>
          //         <a href="${item.sourceUrl}" target="_blank">Full recipe</a>
          //     `

          //   // Insert the HTML content into the random recipe section
          //   randomRecipeCard.innerHTML = recipeHTML
          //   container.appendChild(randomRecipeCard)
          // }

const fetchRandomData = async () => {
  const res = await fetch(randomURL)
  const data = await res.json()
  console.log("this is fetch", data)
   displayRandomRecipe(data.recipes[0])
}

  const displayRandomRecipe = (item) => {
    console.log("this is func", item)
    console.log('Image URL:', item.image);
    console.log('Source URL:', item.sourceUrl);
    if (!item) {
      console.error("No recipe item found.");
      return;
    }
    const randomRecipeCard = document.createElement('article')
    randomRecipeCard.classList.add('recipe-cards')

      container.innerHTML = '' 
      
      const recipeHTML = `
          <img src=${item.image} alt="${item.title}">
          <div class="recipe-title">
            <h3>${item.title}</h3>
          </div>
          <div class="recipe-details">
            <p class="cuisine"><b>Diets:</b> ${item.diets}</p>
            <p class="time"><b>Time:</b> ${item.readyInMinutes} minutes</p>
            <p class="servings"><b>Serves:</b> ${item.servings}</p>
          </div>
          <div class="ingredients">
            <h4>Quick Look:</h4>
            ${item.summary}
          </div>
            <a href="${item.sourceUrl}" target="_blank">Full recipe</a>
        `

      // Insert the HTML content into the random recipe section
      randomRecipeCard.innerHTML = recipeHTML
      container.appendChild(randomRecipeCard)
  }

randomRecipeBtn.addEventListener('click', () => {
  clearActiveButtons()
  updateMessage("I picked this just for you:")
  fetchRandomData()
  // getRandomRecipe(recipes)
})


// Technigo Recipe block
const manualRecipes = [
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
const loadRecipes = (recipesArray) => {
  container.innerHTML = '' //resets the container before load the recipes

  recipesArray.forEach(item => {
    
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
        <h4>Ingredients:</h4>
      </div>
    `
    // Generate the ingredients list for this recipe
    const ingredientsList = generateIngredientsList(item.ingredients);
    
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

loadRecipes(manualRecipes)

filterChoice()

sortChoice()

