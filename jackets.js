let currentProduct = {};

// Wait until DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Make products clickable
  document.querySelectorAll(".product").forEach(product => {
    product.addEventListener("click", () => {
      const title = product.getAttribute("data-title");
      const price = product.getAttribute("data-price");
      const img = product.getAttribute("data-img");
      openPopup(title, price, img);
    });
  });

  // Close button
  document.getElementById("close-btn").addEventListener("click", closePopup);

  // Handle Add to Cart
  document.getElementById("buy-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const size = document.getElementById("size").value;
    const qty = parseInt(document.getElementById("qty").value);

    if (!size) {
      alert("⚠️ Please select a size before adding to cart.");
      return;
    }

    const item = {
      title: currentProduct.title,
      price: currentProduct.price,
      img: currentProduct.img,
      size: size,
      qty: qty
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Added to cart!");
    closePopup();
  });
});

function openPopup(title, price, img) {
  currentProduct = { title, price, img };

  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-price").innerText = "Price: " + price;
  document.getElementById("popup-img").src = img;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
