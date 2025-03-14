// DOM selectors
const messageBox = document.getElementById("message")

const pickAllFilter = document.getElementById("all")
const pickMexicanFilter = document.getElementById("mexican")
const pickMediterraneanFilter = document.getElementById("mediterranean")
const pickAsianFilter = document.getElementById("asian")
const filterButtons = document.querySelectorAll(".filtered, .sorted, #random-recipe-btn")
const randomRecipeBtn = document.getElementById("random-recipe-btn")

const container = document.getElementById("js-recipe-container")

// API RESOURCES
const randomURL = "https://api.spoonacular.com/recipes/random?apiKey=2c9fdce04f884694b4cef3682f7a3bba"
const recipesURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=2c9fdce04f884694b4cef3682f7a3bba&number=20&addRecipeInformation=true&cuisine=African,Asian,American,British,Cajun,Caribbean,Chinese,Eastern,European,European,French,German,Greek,Indian,Irish,Italian,Japanese,Jewish,Korean,Latin,American,Mediterranean,Mexican,Middle,Eastern,Nordic,Southern,Spanish,Thai,Vietnamese&fillIngredients=true&addRecipeInstructions=true"
let fetchedRecipesArray = []

// Helper functions
const clearContainerHTML = () => {
  container.innerHTML = ''
}

const updateMessage = (message) => {
  messageBox.innerHTML = '' // Clear the message box
  messageBox.innerHTML += `<p>${message}</p>`
}

const clearActiveButtons = () => {
  filterButtons.forEach(button => {
    button.classList.remove("active")
  })
}

const activateButton = (button) => {
  button.classList.toggle("active")
}

const displayNoResultsMessage = (message) => {
  messageBox.innerHTML += `<p>${message}</p>`
}

// Fetch Default Recipes from API || Local Storage
const fetchAllRecipeData = async () => {
  try {
      const res = await fetch(recipesURL)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      const data = await res.json()
      if (!data.results || data.results.length === 0) {
        throw new Error("No results found in API response")
      }

      fetchedRecipesArray = data.results

      loadRecipes(fetchedRecipesArray)
      filterChoice(fetchedRecipesArray)

  } catch (error) {
    console.warn("API request failed, loading from localStorage...", error)
   
    const savedData = localStorage.getItem("recipes")
      if (savedData) {
        const data = JSON.parse(savedData)

      fetchedRecipesArray = data.results
      loadRecipes(fetchedRecipesArray)
      filterChoice(fetchedRecipesArray)

    } else {
      console.error("No saved recipes found in localStorage! loading from local file...")
  }
}
      if (window.savedRecipesData?.results?.length) {
        const savedData = window.savedRecipesData.results || []

      fetchedRecipesArray = savedData
      loadRecipes(fetchedRecipesArray)
      console.warn("All hope is not lost!🥳")
    
      }

      if (typeof window.savedRecipesData === "string") {
        try {
          window.savedRecipesData = JSON.parse(window.savedRecipesData)
          console.log("✅ Parsed `window.savedRecipesData` successfully.")

          fetchedRecipesArray = savedData
      loadRecipes(fetchedRecipesArray)
      console.warn("All hope is not lost!🥳")

        } catch (jsonError) {
          console.error("❌ Failed to parse `window.savedRecipesData`:", jsonError);
          return [];
        }
        console.error("No recipes found in anything! IT'S ALL BROKEN")
        return []
      }
    }
    
// Function for all default recipes    
const loadRecipes = (array) => {

  clearContainerHTML()

  if (!Array.isArray(array) || array.length === 0) {
    console.warn("No recipes to load bc array N/A.");
    displayNoResultsMessage("No recipes available.")
    return
  }

  array.forEach(item => {
    if (!item) {
      console.error("No recipe item found.")
      return
    }

    const recipeCard = document.createElement('article')
    recipeCard.classList.add('recipe-cards')


    recipeCard.innerHTML = `
    <img src="${item.image || "assets/no-image.png"}" alt="${item.title}">
    <div class="recipe-title">
      <h3>${item.title}</h3>
    </div>
    <div class="recipe-details">
      <p class="cuisine"><b>Cuisine:</b> ${item.cuisines}</p>
      <p class="time"><b>Time:</b> ${item.readyInMinutes} minutes</p>
      <p class="servings"><b>Serves:</b> ${item.servings}</p>
    </div>
    <div class="ingredients">
      <h4>Ingredients:</h4>
    </div>
    <a href="${item.sourceUrl}" target="_blank">See Full Recipe</a>
    `
    container.appendChild(recipeCard)
    
    // Function to generate an unordered list of ingredients
    const generateIngredientsList = (ingredients) => {
      
      const ul = document.createElement('ul')
      
      ingredients.forEach(ingredient => {
      const li = document.createElement("li") 
      li.textContent = ingredient.original || ingredient.name || "Unknown ingredient"
      ul.appendChild(li)
      })
      return ul
    }
    const ingredientsList = generateIngredientsList(item.extendedIngredients || [])

    const ingredientsContainer = recipeCard.querySelector(".ingredients")
    ingredientsContainer.appendChild(ingredientsList)

  })
}

// Function to filter by Cuisine
const filterByCuisine = async (cuisine) => {

  if (!Array.isArray(fetchedRecipesArray)) {
    console.error("Error: fetchedRecipesArray is undefined or not an array.")
    return
  }
  
  const filteredRecipes = fetchedRecipesArray.filter(item => {
    if (!item.cuisines || item.cuisines.length === 0) return false  // Handle missing cuisine data
    return item.cuisines.some(c => c.toLowerCase() === cuisine.toLowerCase()) // Check within array
  })    
  
  if (filteredRecipes.length === 0) {
      displayNoResultsMessage(`No recipes found for ${cuisine} cuisine`)
    } else {
      loadRecipes(filteredRecipes)
    }
}
// Filter Buttons Click
const filterChoice = () => {

  pickAllFilter.addEventListener("click", () => {
    clearActiveButtons()
    activateButton(pickAllFilter)
    updateMessage("You eat everything, maybe liver then?")
    loadRecipes(fetchedRecipesArray)
  })

  pickMexicanFilter.addEventListener("click", () => {
    clearActiveButtons()
    activateButton(pickMexicanFilter)
    updateMessage("Yes. The answer is always tacos!")
    filterByCuisine("mexican")
  })

  pickMediterraneanFilter.addEventListener("click", () => {
    clearActiveButtons()
    activateButton(pickMediterraneanFilter)
    updateMessage("They say Mediterranean is the healthiest diet")
    filterByCuisine("mediterranean")
  })

  pickAsianFilter.addEventListener("click", () => {
    clearActiveButtons()
    activateButton(pickAsianFilter)
    updateMessage("你选择了中文")
    filterByCuisine("asian")
  })
}

// Function to sort by time
const sortChoice = () => {
  const ascendingButton = document.getElementById("ascending")
  const descendingButton = document.getElementById("descending")

  ascendingButton.addEventListener("click", () => {
    clearActiveButtons()
    activateButton(ascendingButton)
    updateMessage("What's the rush?")
    loadRecipes([...fetchedRecipesArray].sort((a, b) => a.readyInMinutes - b.readyInMinutes))
  })

  descendingButton.addEventListener("click", () => {
    clearActiveButtons()
    activateButton(descendingButton)
    updateMessage("Slow and steady = made with love")
    loadRecipes([...fetchedRecipesArray].sort((a, b) => b.readyInMinutes - a.readyInMinutes))
  })
}

    /* // // Function to get a random recipe from Manual Rceipes
          // const getRandomRecipe = (recipesArray) => {
          //   const randomIndex = Math.floor(Math.random() * recipesArray.length)
          //   const randomRecipe = recipesArray[randomIndex]
            
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
          */


// Fetch Random Recipe from API || Local Storage         
const fetchRandomData = async () => {
  try {
      const res = await fetch(randomURL)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      const data = await res.json()
      if (!data.results || data.results.length === 0) {
        throw new Error("No results found in API response")
      }

      displayRandomRecipe(data.recipes[0]) 
      //randomURL provides only one recipe so this is unique
    
  } catch (error) {
      console.warn("API request failed, loading from localStorage...", error)

      const savedData = localStorage.getItem("recipes")
      if (savedData) {
        const data = JSON.parse(savedData)

        const randomIndex = Math.floor(Math.random() * data.results.length)
        const randomRecipe = data.results[randomIndex]
      
      displayRandomRecipe(randomRecipe)
      console.warn("All hope is not lost!🥳")
      
      } else {
        console.error("No recipes found in API or localStorage! IT'S ALL BROKEN")
      }
    }
  }

// Function to Create/Display Random Recipe
  const displayRandomRecipe = (item) => {
      if (!item) {
        console.error("No recipe item found.")
        return
      }
      
    const randomRecipeCard = document.createElement('article')
          randomRecipeCard.classList.add('recipe-cards')

    clearContainerHTML()
      
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
          <a href="${item.sourceUrl}" target="_blank">See Full Recipe</a>
      `
    // Fill and display this recipe card 
      randomRecipeCard.innerHTML = recipeHTML
      container.appendChild(randomRecipeCard)
  }

// Random Button Click
randomRecipeBtn.addEventListener('click', () => {
  clearActiveButtons()
  activateButton(randomRecipeBtn)
  setTimeout(() => {
    randomRecipeBtn.classList.remove("active")
  }, 10000)
  updateMessage("I picked this just for you! Are you surprised?")

  fetchRandomData() 
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

fetchAllRecipeData()

filterChoice()

sortChoice()

