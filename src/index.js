let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  getAllToys()
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      document.querySelector('.add-toy-form').addEventListener('submit', handleCreateButton)      
    } else {
      toyFormContainer.style.display = "none";
    }        
  });   
});

function getAllToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => {
      data.forEach(toy => renderOneToy(toy))
    })
}

function renderOneToy(toy) {
  let card = document.createElement('li')
  card.className = 'card'
  card.style.textAlign = 'center'
  card.innerHTML = `
  <div>
    <h2>${toy.name}</h2>
    <img class="toy-avatar" src="${toy.image}">
    <p>${toy.likes} likes</p>
    <button class='like-btn' ${toy.id}>like</button>
  </div>`
  card.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes++
    card.querySelector('p').textContent = toy.likes + ' likes'
    updateLikes(toy)
  }) 
  document.querySelector('#toy-collection').appendChild(card)
}

function handleCreateButton(e) {
  e.preventDefault()
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes: 0
  }
  renderOneToy(toyObj)
  addNewToy(toyObj)
}

function addNewToy(toyObj) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(data => console.log(data))
}

function updateLikes(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}