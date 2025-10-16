let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartBody = document.getElementById("cart-body");
const cartTotalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

renderCart();

function renderCart() {
  cartBody.innerHTML = "";
  let total = 0;

  if (!cart || cart.length === 0) {
    cartBody.innerHTML = `<tr><td colspan="6">Your cart is empty 🛒</td></tr>`;
    cartTotalEl.innerText = "Total: $0";
    checkoutBtn.disabled = true;
    return;
  }

  cart.forEach((item, index) => {
    const priceNum = parseFloat(item.price.replace("$", "")) || 0;
    const qty = parseInt(item.qty) || 1;
    const itemTotal = priceNum * qty;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.img}" alt="${item.title}"><br>${item.title}</td>
      <td>${item.size || "-"}</td>
      <td>${qty}</td>
      <td>$${priceNum.toFixed(2)}</td>
      <td>$${itemTotal.toFixed(2)}</td>
      <td><button class="remove-btn" data-index="${index}">✖ Remove</button></td>
    `;
    cartBody.appendChild(row);
  });

  cartTotalEl.innerText = "Total: $" + total.toFixed(2);
  checkoutBtn.disabled = false;

  // Koble til alle fjern-knappene
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const i = parseInt(e.currentTarget.getAttribute("data-index"));
      removeItem(i);
    });
  });
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function checkout() {
  const freshCart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  freshCart.forEach(item => {
    const priceNum = parseFloat(item.price.replace("$", "")) || 0;
    const qty = parseInt(item.qty) || 1;
    total += priceNum * qty;
  });

  localStorage.setItem("cartTotal", total.toFixed(2));
  localStorage.setItem("cart", JSON.stringify(freshCart));
  window.location.href = "thankyou.html";
}
