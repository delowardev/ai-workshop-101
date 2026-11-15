const money = (cents) => `${cents < 0 ? '-' : ''}$${(Math.abs(cents) / 100).toFixed(2)}`;

const $ = (sel) => document.querySelector(sel);

async function api(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

function showMessage(text, isError = false) {
  const el = $('#message');
  el.textContent = text;
  el.classList.toggle('error', isError);
}

function renderCart(cart) {
  const tbody = $('#cart tbody');
  tbody.innerHTML = '';
  for (const item of cart.items) {
    const row = document.createElement('tr');
    row.dataset.testid = `cart-item-${item.productId}`;
    row.innerHTML = `
      <td>${item.name}</td>
      <td data-testid="qty">${item.qty}</td>
      <td>${money(item.priceCents * item.qty)}</td>
      <td><button type="button" data-testid="remove-${item.productId}">Remove</button></td>`;
    row.querySelector('button').addEventListener('click', async () => {
      renderCart(await api('DELETE', `/api/cart/items/${item.productId}`));
    });
    tbody.appendChild(row);
  }
  $('#cart').hidden = cart.items.length === 0;
  $('#empty').hidden = cart.items.length > 0;

  const t = cart.totals;
  $('[data-testid="subtotal"]').textContent = money(t.subtotalCents);
  $('[data-testid="discount"]').textContent = money(-t.discountCents);
  $('[data-testid="shipping"]').textContent = t.shippingCents === 0 && t.subtotalCents > 0 ? 'Free' : money(t.shippingCents);
  $('[data-testid="total"]').textContent = money(t.totalCents);
}

async function renderProducts() {
  const products = await api('GET', '/api/products');
  const list = $('#products');
  for (const p of products) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${p.name}</span><span>${money(p.priceCents)}</span>
      <button type="button" data-testid="add-${p.id}">Add to cart</button>`;
    li.querySelector('button').addEventListener('click', async () => {
      try {
        renderCart(await api('POST', '/api/cart/items', { productId: p.id, qty: 1 }));
        showMessage('');
      } catch (err) {
        showMessage(err.message, true);
      }
    });
    list.appendChild(li);
  }
}

$('#discount-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const code = $('#discount-code').value;
  try {
    renderCart(await api('POST', '/api/cart/discount', { code }));
    showMessage(`Code ${code} applied`);
  } catch (err) {
    showMessage(err.message, true);
  }
});

await renderProducts();
renderCart(await api('GET', '/api/cart'));
