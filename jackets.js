// Oppretter et tomt objekt for å holde informasjon om det produktet som er valgt
let currentProduct = {};

// Venter til hele DOM-en (HTML-strukturen) er lastet inn før koden kjører
document.addEventListener("DOMContentLoaded", () => {
  
  // Går gjennom alle elementer på siden som har klassen "product"
  // og legger til en klikkhendelse på hver av dem
  document.querySelectorAll(".product").forEach(product => {
    product.addEventListener("click", () => {
      
      // Henter informasjon om produktet fra data-attributtene i HTML
      const title = product.getAttribute("data-title"); // Produktnavn
      const price = product.getAttribute("data-price"); // Pris
      const img = product.getAttribute("data-img");     // Bilde-URL
      
      // Åpner popup-vinduet med riktig produktinformasjon
      openPopup(title, price, img);
    });
  });

  // Legger til en hendelse på "Lukk"-knappen for å lukke popupen
  document.getElementById("close-btn").addEventListener("click", closePopup);

  // Håndterer innsending av skjemaet (kjøpsskjemaet i popupen)
  document.getElementById("buy-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Hindrer siden i å laste inn på nytt (standard oppførsel for skjemaer)

    // Henter valgt størrelse og antall fra skjemaet
    const size = document.getElementById("size").value;
    const qty = parseInt(document.getElementById("qty").value);

    // Sjekker om brukeren har valgt en størrelse
    if (!size) {
      alert("⚠️ Vennligst velg en størrelse før du legger til i handlekurven.");
      return; // Stopper funksjonen her hvis ingen størrelse er valgt
    }

    // Oppretter et objekt som representerer varen som skal legges i handlekurven
    const item = {
      title: currentProduct.title,  // Navn
      price: currentProduct.price,  // Pris
      img: currentProduct.img,      // Bilde
      size: size,                   // Valgt størrelse
      qty: qty                      // Valgt antall
    };

    // Henter eksisterende handlekurv fra localStorage, eller lager en ny tom tabell hvis ingen finnes
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Legger det nye produktet til i handlekurven
    cart.push(item);

    // Lagrer handlekurven tilbake i localStorage som en JSON-streng
    localStorage.setItem("cart", JSON.stringify(cart));

    // Viser en bekreftelse til brukeren
    alert("✅ Produktet ble lagt til i handlekurven!");

    // Lukker popup-vinduet
    closePopup();
  });
});


// Funksjon som åpner popup-vinduet og fyller det med riktig produktinformasjon
function openPopup(title, price, img) {
  // Oppdaterer det globale currentProduct-objektet med gjeldende produkt
  currentProduct = { title, price, img };

  // Oppdaterer popup-innholdet med produktdata
  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-price").innerText = "Pris: " + price;
  document.getElementById("popup-img").src = img;

  // Gjør popupen synlig (for eksempel med en fleks-layout)
  document.getElementById("popup").style.display = "flex";
}


// Funksjon som lukker popup-vinduet
function closePopup() {
  document.getElementById("popup").style.display = "none";
}
