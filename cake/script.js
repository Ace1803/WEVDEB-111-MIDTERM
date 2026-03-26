const products = [
  {id:1, name:"Chocolate Dream", price:20},
  {id:2, name:"Berry Bliss", price:22},
  {id:3, name:"Vanilla Cloud", price:18}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id){
  const item = cart.find(p=>p.id===id);

  if(item){
    item.qty++;
  } else {
    const product = products.find(p=>p.id===id);
    cart.push({...product, qty:1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount(){
  const el = document.getElementById("cart-count");
  if(!el) return;

  let count = 0;
  cart.forEach(i => count += i.qty);
  el.textContent = count;
}

function renderProducts(){
  const grid = document.getElementById("product-grid");
  const trending = document.getElementById("trending");

  if(grid){
    grid.innerHTML = "";
    products.forEach(p=>{
      grid.innerHTML += `
        <div class="card">
          <h3>${p.name}</h3>
          <p>$${p.price}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      `;
    });
  }

  if(trending){
    products.forEach(p=>{
      trending.innerHTML += `
        <div class="card small">
          <h4>${p.name}</h4>
          <p>$${p.price}</p>
        </div>
      `;
    });
  }
}

renderProducts();
updateCartCount();