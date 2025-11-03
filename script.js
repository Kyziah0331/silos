let cart = [];

function addToCart(name, price) {
  const item = cart.find(p => p.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCart();
  alert(`${name} added to cart!`);
}

function updateCart() {
  const table = document.getElementById('cartTable');
  table.innerHTML = `
    <tr><th>Item</th><th>Price</th><th>Quantity</th><th>Subtotal</th></tr>
  `;
  let total = 0;
  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    table.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td><input type="number" min="1" value="${item.qty}" onchange="changeQty('${item.name}', this.value)"></td>
        <td>$${subtotal}</td>
      </tr>
    `;
  });
  document.getElementById('totalDisplay').innerHTML = `<strong>Total: $${total}</strong>`;
}

function changeQty(name, qty) {
  const item = cart.find(p => p.name === name);
  if (item) {
    item.qty = parseInt(qty);
    updateCart();
  }
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('checkoutForm').addEventListener('submit', function (e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Order placed successfully! Thank you for shopping with Opulence Atelier.");
  cart = [];
  updateCart();
  this.reset();
});
