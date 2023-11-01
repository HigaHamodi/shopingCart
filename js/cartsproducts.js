document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.querySelector(".products-item-desc");
    const totalPriceElement = document.getElementById("total-price");
    let userElement = document.getElementById("user");
    let logoutElement = document.getElementById("logout");

    let username = localStorage.getItem("username");
    const customCartName = username ? `${username}'s Cart` : "Your Custom Cart Name";
    document.querySelector(".products-container h2").textContent = customCartName;

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};

    if (Object.keys(cartItems).length > 0) {
        let totalPrice = 0;

        for (let itemId in cartItems) {
            const item = cartItems[itemId];
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            const itemTotalPrice = item.price * item.quantity;

            let dynamicContent = `
            <h3><strong>${item.title}</strong></h3>
            <img src="${item.image}" alt="${item.title}" class="product-image">
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>Quantity:</strong> 
                <button class="quantity-button" onclick="reduceQuantity(${itemId})">-</button>
                ${item.quantity}
                <button class="quantity-button" onclick="increaseQuantity(${itemId})">+</button>
            </p>
            <hr>
            <p><strong>Item Total Price:</strong> $${itemTotalPrice.toFixed(2)}</p>
            <hr>
        `;

            const itemContainer = document.createElement("div");
            itemContainer.classList.add("cart-item-container");
            itemContainer.innerHTML = dynamicContent;

            cartItemsContainer.appendChild(itemContainer);

            totalPrice += itemTotalPrice;
        }

        totalPriceElement.textContent = totalPrice.toFixed(2);

    } else {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElement.textContent = "0.00";
    }
});

function reduceQuantity(itemId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};

    if (cartItems[itemId]) {
        if (cartItems[itemId].quantity > 1) {
            cartItems[itemId].quantity -= 1;
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        refreshCartDisplay();
    }
}

function increaseQuantity(itemId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};

    if (cartItems[itemId]) {
        cartItems[itemId].quantity += 1;

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        refreshCartDisplay();
    }
}

function refreshCartDisplay() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    const cartItemsContainer = document.querySelector(".products-item-desc");
    const totalPriceElement = document.getElementById("total-price");

    cartItemsContainer.innerHTML = "";

    let totalPrice = 0;

    for (let itemId in cartItems) {
        const item = cartItems[itemId];
        const cartItem = document.createElement("div");
        const img = new Image();
        img.src = item.image;
        cartItem.classList.add("cart-item");
        const itemTotalPrice = item.price * item.quantity;

        const itemContainer = document.createElement("div");
        itemContainer.classList.add("cart-item-container");

        let dynamicContent = `
            <h3><strong>${item.title}</strong></h3>
            <img src="${item.image}" alt="${item.title}" class="product-image">
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>Quantity:</strong> 
                <button class="quantity-button" onclick="reduceQuantity(${itemId})">-</button>
                ${item.quantity}
                <button class="quantity-button" onclick="increaseQuantity(${itemId})">+</button>
            </p>
            <hr>
            <p><strong>Item Total Price:</strong> $${itemTotalPrice.toFixed(2)}</p>
            <hr>
        `;

        itemContainer.innerHTML = dynamicContent;
        cartItemsContainer.appendChild(itemContainer);

        totalPrice += itemTotalPrice;
    }

    totalPriceElement.textContent = totalPrice.toFixed(2);

    if (Object.keys(cartItems).length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElement.textContent = "0.00";
    }
}

const emptyCartButton = document.getElementById("empty-cart");
emptyCartButton.addEventListener("click", function () {
    localStorage.removeItem("cartItems");
    refreshCartDisplay();
});

const goToCheckoutButton = document.getElementById("go-to-checkout");
goToCheckoutButton.addEventListener("click", function () {
    window.location.href = "checkout.html";
});
