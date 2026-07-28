// PUNICA — catalogue produits + logique panier partagée
const PUNICA_PRODUCTS = [
  { id: "sb-01", name: "Sidi Bou Shirt", collection: "sidi-bou", tag: "Whitewash", price: 89, image: "tunisian-summer-vibe.png", desc: "Lin ample, col ouvert." },
  { id: "sb-02", name: "Sidi Bou Popover", collection: "sidi-bou", tag: "Whitewash", price: 89, image: "tunisian-summer-vibe.png", desc: "Pull-over en lin, demi-placket." },
  { id: "lm-01", name: "La Marsa Overshirt", collection: "la-marsa", tag: "Harbor", price: 89, image: "tunisian-summer-vibe.png", desc: "Coton épais, pensé pour le vent." },
  { id: "lm-02", name: "La Marsa Shirt Jacket", collection: "la-marsa", tag: "Harbor", price: 89, image: "tunisian-summer-vibe.png", desc: "Coton brossé, col doublé." },
  { id: "ct-01", name: "Carthage Tee", collection: "carthage", tag: "Foundation", price: 89, image: "tunisian-summer-vibe.png", desc: "Coton épais, basique du quotidien." },
  { id: "ct-02", name: "Carthage Base Shirt", collection: "carthage", tag: "Foundation", price: 89, image: "tunisian-summer-vibe.png", desc: "Popeline de coton, tous les jours." },
];

function productImgHTML(p) {
  return `<img src="${p.image}" alt="${p.name}">`;
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("punica_cart")) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("punica_cart", JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, size) {
  size = size || "M";
  const cart = getCart();
  const existing = cart.find((i) => i.id === productId && i.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, size: size, qty: 1 });
  }
  saveCart(cart);
}

function removeFromCart(productId, size) {
  saveCart(getCart().filter((i) => !(i.id === productId && i.size === size)));
}

function setQty(productId, size, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId && i.size === size);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (badge) badge.textContent = cartCount();
}

document.addEventListener("DOMContentLoaded", updateCartBadge);