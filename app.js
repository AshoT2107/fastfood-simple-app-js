const products = [
  {
    title: "Go'shtli lavash",
    price: "31000",
  },
  {
    title: "Chizburger",
    price: "25000",
  },
  {
    title: "Kartoshka fri",
    price: "10000",
  },
];

const productDiv = document.querySelector(".products");

products.forEach((product, index) => {
  productDiv.innerHTML += `
    <div class="product" onclick = "addOrder(event)" product="${index}">
    <div class="title">${product.title}</div>
    <div class="price">${product.price} <span> so'm </span></div>
    </div>
  `;
});

const orderDivs = document.querySelector(".order__list");
const order__sum = document.querySelector(".order__sum");

const renderOrder = () => {
  order__sum.innerHTML = "";
  let sum = 0;
  orderDivs.innerHTML = "";

  tempOrders.forEach((order, index) => {
    sum += order.price * order.count;
    orderDivs.innerHTML += `
      <div class="order">
        <div class="count">${order.count}</div>
        <div class="name">${order.title}</div>
        <div class="price">${order.price.toLocaleString()} s.</div>
        <div class = "buttons">
          <button onclick="changeCount(${index},-1)">-</button>
          <button onclick="changeCount(${index},1)">+</button>
        </div>
      </div>  
    `;
  });
  order__sum.innerHTML = `
  <div>Jami: ${sum} so'm</div>
  `;
};

const tempOrders = [];

const addOrder = (e) => {
  let index = e.target.getAttribute("product");
  let order = {
    title: products[index].title,
    price: products[index].price,
    value: index,
    count: 1,
  };

  let check = tempOrders.findIndex((ord) => ord.value == order.value);
  if (check >= 0) {
    tempOrders[check].count += 1;
  } else {
    tempOrders.push(order);
  }

  renderOrder();
};

const changeCount = (index, value) => {
  if (
    tempOrders[index].count == 1 &&
    value == -1 &&
    confirm("zakasdan uchirmoqchimisiz?")
  ) {
    tempOrders.splice(index, 1);
  } else {
    tempOrders[index].count += value;
  }
  renderOrder();
};

const orders = JSON.parse(localStorage.getItem("order")) || [];

let createOrder = () => {
  if (tempOrders.length == 0) {
    alert("Buyurtma uchun taom qushilmagan");
    return false;
  }

  orders.push({
    product: [...tempOrders],
    status: false,
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  tempOrders.length = 0;
  renderOrder();
};

const removeOrder = () => {
  if (confirm("Buyurtmani bekor qilmoqchimisiz?")) {
    tempOrders.length = 0;
    renderOrder();
  }
};
