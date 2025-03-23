// DOM selectors
const messageBox = document.getElementById("message")

const pickAllFilter = document.getElementById("all")
const pickMexicanFilter = document.getElementById("mexican")
const pickMediterraneanFilter = document.getElementById("mediterranean")
const pickAsianFilter = document.getElementById("asian")
const allButtons = document.querySelectorAll(".filtered, .sorted, #random-recipe-btn")
const randomRecipeBtn = document.getElementById("random-recipe-btn")

const container = document.getElementById("js-recipe-container")

// API RESOURCES
const apiKey = "2c9fdce04f884694b4cef3682f7a3bba"
const randomURL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`
const testURL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=20`

let fetchedRecipesArray = []

// Helper functions
const clearContainerHTML = () => {
  container.innerHTML = ""
}

const updateMessage = (message) => {
  messageBox.innerHTML = "" // Clear the message box
  messageBox.innerHTML += `<p>${message}</p>`
}

const clearActiveButtons = () => {
  allButtons.forEach(button => {
    button.classList.remove("active")
  })
}

const activateButton = (button) => {
  button.classList.toggle("active")
}

const displayNoResultsMessage = (message) => {
  messageBox.innerHTML = `<p>${message}</p>`
}

// Fetch Default Recipes from API || Local Storage
const fetchAllRecipeData = async () => {
  try {
      const res = await fetch(testURL)
      if (!res.ok) {
        displayNoResultsMessage("Sorry! We had to dig some recipes out of our vault- our API limit was hit!")
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      const data = await res.json()
      if (!data.recipes || data.recipes.length === 0) {
        throw new Error("Uh oh! No results found in API response, wait for it..")
      }

      fetchedRecipesArray = data.recipes.filter((recipe) => {
        return recipe.cuisines.length > 0 && recipe.image && recipe.title
      })

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

    if (window.savedRecipesData?.results?.length) {
      const savedData = window.savedRecipesData.results || []

      fetchedRecipesArray = savedData
      loadRecipes(fetchedRecipesArray)
      console.warn("All hope is not lost!🥳 savedFile saves the day")
    }
  }
}   
    
// Load all recipes    
const loadRecipes = (array) => {

  clearContainerHTML()

  if (!Array.isArray(array) || array.length === 0) {
    console.warn("No recipes to load bc array N/A.");
    displayNoResultsMessage("No recipes available. We wrote a strongly worded letter to management about this.")
    return
  }

  array.forEach(item => {
    if (!item) {
      console.error("No recipe item found.. keep them busy till I get back.")
      return
    }

    const recipeCard = document.createElement('article')
    recipeCard.classList.add('recipe-cards')

    recipeCard.innerHTML = `
    <img src="${item.image}" 
        alt="${item.title}" 
        onerror="this.onerror=null; this.src='./assets/no-image.png';">
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
        <ul>
          ${Array.isArray(item.extendedIngredients)
          ? item.extendedIngredients.map((item) => `<li>${item.original}</li>`).join("")
          : "<li>No ingredients available</li>"}   
        </ul>
    </div>
    <a href="${item.sourceUrl}">See Full Recipe</a>
    `
    container.appendChild(recipeCard)
  })
}

// Function to filter by Cuisine
const filterByCuisine = async (cuisine) => {

  if (!Array.isArray(fetchedRecipesArray)) {
    console.error("Error: fetchedRecipesArray is undefined or not an array.")
    return
  }
  
  const filteredRecipes = fetchedRecipesArray.filter(item => 
    item.cuisines?.some(c => c.toLowerCase() === cuisine.toLowerCase())
  )    
  
  filteredRecipes.length === 0
      ? displayNoResultsMessage(`Sorry! No recipes found for ${cuisine} cuisine. Refresh the page for new results.`)
      : loadRecipes(filteredRecipes)
}

// Filter Buttons Message and Click
const filterChoice = () => {
  const filters = [
    {button: pickAllFilter, cuisine: "", message:"You eat everything, maybe liver then?" },
    {button: pickMexicanFilter, cuisine: "mexican", message:"Yes. The answer is always tacos!" },
    {button: pickMediterraneanFilter, cuisine: "mediterranean", message:"They say Mediterranean is the healthiest diet" },
    {button: pickAsianFilter, cuisine: "asian", message:"你选择了中文" },
  ]

    filters.forEach(({ button, cuisine, message }) => {
      button.addEventListener("click", () => {
        clearActiveButtons()
        activateButton(button)
        updateMessage(message)
        cuisine ? filterByCuisine(cuisine) : loadRecipes(fetchedRecipesArray)
      })
    })
  }

// Function to sort by time
const sortRecipes = (order) => {
  loadRecipes([...fetchedRecipesArray].sort((a, b) =>
    order === "asc" ? a.readyInMinutes - b.readyInMinutes : b.readyInMinutes - a.readyInMinutes))
}

const sortChoice = () => {
  const ascendingButton = document.getElementById("ascending")
  const descendingButton = document.getElementById("descending")

  ascendingButton.addEventListener("click", () => {
    clearActiveButtons()
    activateButton(ascendingButton)
    updateMessage("In a rush, much?")
    sortRecipes("asc")
  })

  descendingButton.addEventListener("click", () => {
    clearActiveButtons()
    activateButton(descendingButton)
    updateMessage("Slow and steady = made with love")
    sortRecipes("desc")
  })
}

// Fetch Random Recipe from API || Local Storage         
const fetchRandomData = async () => {
  try {
      const res = await fetch(randomURL)
      if (!res.ok) {
        displayNoResultsMessage("Sorry! We had to dig some recipes out of our vault- our API limit was hit!")
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      const data = await res.json()
      if (!data.recipes || data.recipes.length === 0) {
        throw new Error("No results found in API response")
      }

      displayRandomRecipe(data.recipes[0]) 
      return
    
  } catch (error) {
      console.warn("API request failed, loading from localStorage...", error)

      const savedData = localStorage.getItem("recipes")
      if (savedData) {
        const data = JSON.parse(savedData)

        const randomIndex = Math.floor(Math.random() * data.results.length)
        const randomRecipe = data.results[randomIndex]
      
      displayRandomRecipe(randomRecipe)
      console.warn("All hope is not lost!🥳 localStorage loaded")
      return
      
      } else if 
         (window.savedRecipesData?.results?.length) {
          const randomIndex = Math.floor(Math.random() * window.savedRecipesData.results.length)
          const savedData = window.savedRecipesData.results[randomIndex] 

          // fetchedRecipesArray = savedData
          displayRandomRecipe(savedData)
          console.error("No recipes found in API or localStorage! IT'S ALL BROKEN 😩")
          console.warn("All hope is not lost!🥳 savedFile saves the day")
          return
         }

         displayNoResultsMessage("Sorry! No recipes found in API, localStorage, or saved files. We owe you one! 😞")

      }
    }
  
// Function to Create/Display Random Recipe
const displayRandomRecipe = (item) => {
      if (!item) {
        console.error("No recipe item found.")
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
  }, 10000) // Removes rainbow styling after 10s so its not overstimulating.
  updateMessage("I picked this just for you! Are you surprised?")

  fetchRandomData() 
})

fetchAllRecipeData()

filterChoice()

sortChoice()



// Holding these codes here for study reference. 
// Just didn't want to misplace it

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
 /* // // Technigo Recipe block
    // const manualRecipes = [
    //   {
    //     id: 1,
    //     title: "Vegan Lentil Soup",
    //     image: "./chicken.webp",
    //     readyInMinutes: 30,
    //     servings: 4,
    //     sourceUrl: "https://example.com/vegan-lentil-soup",
    //     diets: ["vegan"],
    //     cuisine: "Mediterranean",
    //     ingredients: [
    //       "red lentils",
    //       "carrots",
    //       "onion",
    //       "garlic",
    //       "tomato paste",
    //       "cumin",
    //       "paprika",
    //       "vegetable broth",
    //       "olive oil",
    //       "salt"
    //     ],
    //     pricePerServing: 2.5,
    //     popularity: 85
    //   },
    //   {
    //     id: 2,
    //     title: "Vegetarian Pesto Pasta",
    //     image: "./chicken.webp",
    //     readyInMinutes: 25,
    //     servings: 2,
    //     sourceUrl: "https://example.com/vegetarian-pesto-pasta",
    //     diets: ["vegetarian"],
    //     cuisine: "Italian",
    //     ingredients: [
    //       "pasta",
    //       "basil",
    //       "parmesan cheese",
    //       "garlic",
    //       "pine nuts",
    //       "olive oil",
    //       "salt",
    //       "black pepper"
    //     ],
    //     pricePerServing: 3.0,
    //     popularity: 92
    //   },
    //   {
    //     id: 3,
    //     title: "Gluten-Free Chicken Stir-Fry",
    //     image: "./chicken.webp",
    //     readyInMinutes: 20,
    //     servings: 3,
    //     sourceUrl: "https://example.com/gluten-free-chicken-stir-fry",
    //     diets: ["gluten-free"],
    //     cuisine: "Asian",
    //     ingredients: [
    //       "chicken breast",
    //       "broccoli",
    //       "bell pepper",
    //       "carrot",
    //       "soy sauce (gluten-free)",
    //       "ginger",
    //       "garlic",
    //       "sesame oil",
    //       "cornstarch",
    //       "green onion",
    //       "sesame seeds",
    //       "rice"
    //     ],
    //     pricePerServing: 4.0,
    //     popularity: 78
    //   },
    //   {
    //     id: 4,
    //     title: "Dairy-Free Tacos",
    //     image: "./chicken.webp",
    //     readyInMinutes: 15,
    //     servings: 2,
    //     sourceUrl: "https://example.com/dairy-free-tacos",
    //     diets: ["dairy-free"],
    //     cuisine: "Mexican",
    //     ingredients: [
    //       "corn tortillas",
    //       "ground beef",
    //       "taco seasoning",
    //       "lettuce",
    //       "tomato",
    //       "avocado"
    //     ],
    //     pricePerServing: 2.8,
    //     popularity: 88
    //   },
    //   {
    //     id: 5,
    //     title: "Middle Eastern Hummus",
    //     image: "./chicken.webp",
    //     readyInMinutes: 10,
    //     servings: 4,
    //     sourceUrl: "https://example.com/middle-eastern-hummus",
    //     diets: ["vegan", "gluten-free"],
    //     cuisine: "Middle Eastern",
    //     ingredients: [
    //       "chickpeas",
    //       "tahini",
    //       "garlic",
    //       "lemon juice",
    //       "olive oil"
    //     ],
    //     pricePerServing: 1.5,
    //     popularity: 95
    //   },
    //   {
    //     id: 6,
    //     title: "Quick Avocado Toast",
    //     image: "./chicken.webp",
    //     readyInMinutes: 5,
    //     servings: 1,
    //     sourceUrl: "https://example.com/quick-avocado-toast",
    //     diets: ["vegan"],
    //     cuisine: "Mediterranean",
    //     ingredients: [
    //       "bread",
    //       "avocado",
    //       "lemon juice",
    //       "salt"
    //     ],
    //     pricePerServing: 2.0,
    //     popularity: 90
    //   },
    //   {
    //     id: 7,
    //     title: "Beef Stew",
    //     image: "./chicken.webp",
    //     readyInMinutes: 90,
    //     servings: 5,
    //     sourceUrl: "https://example.com/beef-stew",
    //     diets: [],
    //     cuisine: "European",
    //     ingredients: [
    //       "beef chunks",
    //       "potatoes",
    //       "carrots",
    //       "onion",
    //       "garlic",
    //       "tomato paste",
    //       "beef broth",
    //       "red wine",
    //       "bay leaves",
    //       "thyme",
    //       "salt",
    //       "black pepper",
    //       "butter",
    //       "flour",
    //       "celery",
    //       "mushrooms"
    //     ],
    //     pricePerServing: 5.5,
    //     popularity: 80
    //   }
    // ]
    */
 /* // // const recipesURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=20&addRecipeInformation=true&cuisine=African,Asian,American,British,Cajun,Caribbean,Chinese,Eastern,European,European,French,German,Greek,Indian,Irish,Italian,Japanese,Jewish,Korean,Latin,American,Mediterranean,Mexican,Middle,Eastern,Nordic,Southern,Spanish,Thai,Vietnamese&fillIngredients=true&addRecipeInstructions=true` */

