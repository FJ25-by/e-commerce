// This file contains the JavaScript for client-side functionality, including search and cart management.

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('product-search');
    const cartButton = document.getElementById('cart-button');
    const cartCount = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to update cart count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Function to handle product search
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const productItems = document.querySelectorAll('.product-item');

        productItems.forEach(item => {
            const productName = item.querySelector('.product-name').textContent.toLowerCase();
            if (productName.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Function to add item to cart
    window.addToCart = (productId) => {
        if (!cart.includes(productId)) {
            cart.push(productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }
    };

    // Initialize cart count on page load
    updateCartCount();
});

function addToCart(productId) {
  fetch('/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId })
  })
  .then(res => {
    if (res.ok) {
      alert('Produk berhasil ditambahkan ke keranjang');
    } else {
      alert('Gagal menambahkan produk ke keranjang');
    }
  })
  .catch(() => alert('Terjadi kesalahan saat menambahkan ke keranjang'));
}
