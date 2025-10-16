// Hent totalsum fra localStorage
let total = localStorage.getItem("cartTotal");
console.log("Cart total hentet:", total);

if (!total || isNaN(total) || total <= 0) {
  alert("⚠️ Ingen varer i handlekurven.");
  window.location.href = "cart.html";
}

document.getElementById("checkout-total").innerText = "Total to Pay: $" + total;

// Lag PayPal-knapp
paypal.Buttons({
  createOrder: function (data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: total.toString()
        }
      }]
    });
  },
  onApprove: function (data, actions) {
    return actions.order.capture().then(function (details) {
      alert("✅ Payment completed by " + details.payer.name.given_name);
      localStorage.removeItem("cart");
      localStorage.removeItem("cartTotal");
      window.location.href = "success.html";
    });
  }
}).render('#paypal-button-container');
