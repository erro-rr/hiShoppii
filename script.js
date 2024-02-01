// script.js
// Function to fetch data from the API with search
async function fetchData(searchQuery) {
  try {
    const apiUrl = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to fetch product details by ID
async function fetchProductById(productId) {
  try {
    const apiUrl = `https://dummyjson.com/products/${productId}`;
    const response = await fetch(apiUrl);
    const productDetails = await response.json();
    return productDetails;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

// Function to render data in cards
async function renderData() {
  const container = document.querySelector(".container");
  const searchInput = document.querySelector("#searchInput");
  const searchQuery = searchInput.value.trim();

  // Fetch data with the search query
  const data = await fetchData(searchQuery);

  if (!data || !data.products) {
    return;
  }
  console.log("Data:", data);

  // Clear existing content
  container.innerHTML = "";

  // Render filtered data
  data.products.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h2");
    title.textContent = item.title;

    const category = document.createElement("h3");
    category.textContent = item.category;

    const thumbnail = document.createElement("img");
    thumbnail.src = item.thumbnail;
    thumbnail.alt = item.title; // Set alt text for accessibility

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";

    // Attach a click event listener to the 'Add to Cart' button
    addToCartButton.addEventListener("click", () => addToCart(item));

    card.appendChild(thumbnail);
    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(addToCartButton);
    container.appendChild(card);
  });
}

// Shopping Cart
let cart = [];

// Function to add an item to the cart using POST method
async function addToCart(item) {
  cart.push(item);
  updateCartDisplay();
  await updateCartInStorage(cart); // Update cart data in storage
}

// Function to show detailed information about items in the cart
function showCartDetails() {
  // Update cart data in storage before navigating to the cart.html page
updateCartInStorage(cart);
  // location.href = 'cart.html';
var valueToPass = "cart";
localStorage.setItem("value", valueToPass);
window.location.href = "cart.html";

}         

// Function to update the cart display
function updateCartDisplay() {
  const cartDisplay = document.querySelector('.cart-display');
  if (cartDisplay) {
    cartDisplay.textContent = `Cart (${cart.length} items)`;
  }
}

// Function to update the cart data in storage
function updateCartInStorage(cartData) {
  localStorage.setItem('cart', JSON.stringify(cartData));
}

// Event listener for the search input
const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("input", renderData);

// Event listener for the "Show Cart" button
const showCartButton = document.querySelector('.cart-display');
showCartButton.addEventListener('click', showCartDetails);

// Call the renderData function initially
renderData();

// Display initial cart status
updateCartDisplay();