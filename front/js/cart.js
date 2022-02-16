//Initialisation du local storage
let cart = JSON.parse(localStorage.getItem("cartContent"));

let productsCart = [];
const cartItems = document.querySelector("#cart__items");

// Si le panier est vide
let totalPrice = 0;
if (cart != null) {
  cart.forEach((productCart) => {
    fetch(`http://localhost:3000/api/products/${productCart.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        productsCart.push({
          id: productCart.id,
          imageUrl: data.imageUrl,
          name: data.name,
          price: data.price,
          description: data.description,
          altTxt: data.altTxt,
          quantity: productCart.nombre,
          color: productCart.color,
        });

        displayCart();

        setTotalQuantity()
        setTotalPrice()
      });
  });
  // Insertion des l'éléments, article, div, image, h3, couleur, prix
  function displayCart() {
    let html = "";

    productsCart.forEach((product) => {
      html += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
          <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${product.name}</h2>
              <p>${product.color}</p>
              <p>${product.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" onchange="changeQuantity(event, '${product.id}', '${product.color}')"  class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem" onclick="deleteProduct('${product.id}','${product.color}')">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;
    });
    //la section cartItems se modifie avec la chaine de caractère de html
    cartItems.innerHTML = html;
  }
}
// Récupération des quantités
function changeQuantity(event, id, color) {

  for (let i = 0; i < productsCart.length; i++) {

    if (productsCart[i].id === id && productsCart[i].color === color) {
      productsCart[i].quantity = parseInt(event.target.value)
    }
  }

  for (let i = 0; i < cart.length; i++) {

    if (cart[i].id === id && cart[i].color === color) {
      cart[i].nombre = parseInt(event.target.value)
    }
  }
  localStorage.setItem("cartContent", JSON.stringify(cart));

  setTotalQuantity();
  setTotalPrice();
}
// Suppression d'un produit
function deleteProduct(id, color) {

  for (let i = 0; i < productsCart.length; i++) {
    if (productsCart[i].id === id && productsCart[i].color === color) {
      productsCart.splice(i, 1)
    }
  }

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id && cart[i].color === color) {
      cart.splice(i, 1);
      displayCart()
    }
  }
  localStorage.setItem("cartContent", JSON.stringify(cart));
  setTotalQuantity();
  setTotalPrice();
}

function setTotalQuantity() {
  document.getElementById("totalQuantity").innerText = `${totalFinalUnits()}`
}

// Récupération du prix total
function setTotalPrice() {
  document.getElementById("totalPrice").innerText = `${totalFinal()}`
}

setTotalQuantity();
setTotalPrice();


//totalprice
function totalFinal() {
  let cart = JSON.parse(localStorage.getItem("cartContent"));
  let finalPrice = 0;

  for (let item in cart) {
    finalPrice += cart[item].price * Number(cart[item].nombre);
  }
  if (cart == null) {
    return 0
  }
  return finalPrice;
}

function totalFinalUnits() {
  let cart = JSON.parse(localStorage.getItem("cartContent"));
  let totalUnits = 0;

  for (let item in cart) {
    totalUnits += Number(cart[item].nombre);
  }
  if (cart == null) {
    return 0

  }
  return totalUnits;
}

//Formulaire avec regex
let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let email = document.getElementById('email')
let address = document.getElementById('address')
let city = document.getElementById('city')

let firstNameRegExp = new RegExp(/^([a-zA-Z,.'-]+[ ]?)+$/)
let lastNameRegExp = new RegExp(/^([a-zA-Z,.'-]+[ ]?)+$/)
let addressRegExp = new RegExp(/^[a-zA-Z0-9\s,.'-]{3,}$/)
let cityRegExp = new RegExp(/^([a-zA-Z,.'-]+[ ]?)+$/)
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

let orderContact = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
}

//prenom
firstName.addEventListener('change', function () {
  validFirstName(firstName.value)
  console.log(firstName.value)
})
const validFirstName = function (inputText) {
  let testFirstName = firstNameRegExp.test(firstName.value)
  console.log(firstName.value)

  if (inputText.length > 2 && testFirstName) {
    firstNameErrorMsg.innerHTML = ""
  } else {
    firstNameErrorMsg.innerHTML = "Prénom Invalide"
  }
};

//insertion et validation du Nom
lastName.addEventListener('change', function () {
  validlastName(lastName.value)
  console.log(lastName.value)
})
const validlastName = function (inputText) {
  let testLastName = lastNameRegExp.test(lastName.value)
  console.log(lastName.value)

  if (inputText.length > 2 && testLastName) {
    lastNameErrorMsg.innerHTML = ""
    orderContact.lastName = inputText
  } else {
    lastNameErrorMsg.innerHTML = "Nom Invalide"
  }
};

//insertion et validation de la Adresse
address.addEventListener('change', function () {
  validaddress(address.value)
  console.log(address.value)
})
const validaddress = function (inputText) {
  let testaddress = addressRegExp.test(address.value)
  console.log(address.value)

  if (testaddress) {
    addressErrorMsg.innerHTML = ""
    orderContact.address = inputText

  } else {
    addressErrorMsg.innerHTML = "Adresse postale invalide"
  }
};

//insertion et validation de la ville
city.addEventListener('change', function () {
  validcity(city.value)
  console.log(city.value)
})
const validcity = function (inputText) {
  let testCity = cityRegExp.test(city.value)
  console.log(city.value)

  if (inputText.length > 2 && testCity) {
    cityErrorMsg.innerHTML = ""
    orderContact.city = inputText
  } else {
    cityErrorMsg.innerHTML = "Ville Invalide"
  }
};

//insertion et validation du E-mail
email.addEventListener('change', function () {
  validemail(email.value)
  console.log(email.value)
})
const validemail = function (inputText) {
  let testemail = emailRegExp.test(email.value)
  console.log(email.value)
  if (testemail) {
    emailErrorMsg.innerHTML = ""
    orderContact.email = inputText

  } else {
    emailErrorMsg.innerHTML = "Adresse mail invalide"
  }
};

//Récupération des produits et des informations du clients
const order = document.getElementById("order")
order.addEventListener("click", function (event) {
  event.preventDefault()

  const contact = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value
  }

  let products = [];
  for (let i = 0; i < cart.length; i++) {
    products.push(cart[i].id);
    console.log(cart[i].id)
  }

  const sendFormData = {
    contact,
    products,
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(sendFormData),
    headers: {
      'Content-Type': 'application/json',
    }
  };
  //Recuperation du nombre de confirmation de commande depuis l'API
  fetch("http://localhost:3000/api/products/order", options)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('orderId', data.orderId);
      document.location.href = 'confirmation.html?id=' + data.orderId;
    });
})





