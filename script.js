console.log("running")

const messageBox = document.getElementById("message")

const pickAllFilter = document.getElementById("all")
const pickUsaFilter = document.getElementById("usa")
const pickItalyFilter = document.getElementById("italy")
const pickChinaFilter = document.getElementById("china")

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