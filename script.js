const search = document.getElementById('search');

// Products and their pages
const productPages = {
  "jackets": "jackets.html",
  "shirts": "shirts.html",
  "cosmetics": "cosmetics.html",
  "shoes": "shoes.html"
};

// Function to find the closest match
function findClosestMatch(input, products) {
  input = input.toLowerCase();
  let closest = null;
  let highestScore = -1;

  products.forEach(product => {
    const score = similarity(input, product);
    if (score > highestScore) {
      highestScore = score;
      closest = product;
    }
  });

  return closest;
}

// Simple similarity check
function similarity(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  let matches = 0;
  const len = Math.min(a.length, b.length);

  for (let i = 0; i < len; i++) {
    if (a[i] === b[i]) {
      matches++;
    }
  }

  return matches / b.length; // score between 0–1
}

// When pressing ENTER
search.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    const value = search.value.toLowerCase();
    const products = Object.keys(productPages);

    const closest = findClosestMatch(value, products);

    if (closest) {
      window.location.href = productPages[closest]; // Go to closest page
    } else {
      alert("No product found!");
    }
  }
});
