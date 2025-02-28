function loadCategory() {
  fetch("http://localhost:8080/category/get-all")
    .then((res) => res.json())
    .then((data) => {
      let unList = document.getElementById("categories");
      let cat = "";
      data.forEach((cate) => {
        cat += `
                     <li><button class="dropdown-item" type="button">${cate.category}</button></li>
               `;
      });

      unList.innerHTML = cat;
    });
}

function loadFoodItem() {
  fetch("http://localhost:8080/food/get-all")
    .then((res) => res.json())
    .then((data) => {
      let foodItems = document.getElementById("foodItems");
      let food = "";
      data.forEach((item) => {
        food += `
               <div class="card col-lg-2 col-md-3 col-sm-12 mt-3 ms-2" style="width: 12rem;">
                  <img src="/FrontEnd/assets/img/burger.jpg" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title text-center">Food Id : <label id="foodID">${item.id} </label></label></h5>
                    <h5 class="card-title text-center"><label id="foodName">${item.name}</label></h5>
                    <h6 class="card-text  text-center">Food Category : <label id="foodCategory" > ${item.category}</label></h6>
                    <h6 class="card-text  text-center" >Price LKR: <label id="foodPrice" >${item.price}</label></h6>
                    <h6 class="card-text  text-center" >Expire Date:<label class = "text-danger f-bold"> ${item.expireDate}</label></h6>
                    <h6 class="card-text  text-center">Status: ${item.status}</h6>
                    <a  class="btn btn-warning fw-bold text-dark d-flex justify-content-center" onclick = "addToCart()">Add To Cart</a>
                  </div>
                </div>
                `;
      });

      foodItems.innerHTML = food;
    });
}

function searchFoodByName() {
  let foodName = document.getElementById("searchname").value;

  fetch("http://localhost:8080/food/search-by-name/" + foodName)
    .then((res) => res.json())
    .then((data) => {
      let foodItems = document.getElementById("foodItems");
      let food = "";
      data.forEach((item) => {
        food += `
                     <div class="card col-lg-2 col-md-3 col-sm-12 mt-3 ms-2" style="width: 12rem;">
                        <img src="/FrontEnd/assets/img/burger.jpg" class="card-img-top" alt="...">
                         <div class="card-body">
                    <h5 class="card-title text-center">Food Id : <label id="foodID">${item.id} </label></label></h5>
                    <h5 class="card-title text-center"><label id="foodName">${item.name}</label></h5>
                    <h6 class="card-text  text-center">Food Category : <label id="foodCategory" > ${item.category}</label></h6>
                    <h6 class="card-text  text-center" >Price LKR: <label id="foodPrice" >${item.price}</label></h6>
                    <h6 class="card-text  text-center" >Expire Date:<label class = "text-danger f-bold"> ${item.expireDate}</label></h6>
                    <h6 class="card-text  text-center">Status: ${item.status}</h6>
                    <a  class="btn btn-warning fw-bold text-dark d-flex justify-content-center" onclick = "addToCart()">Add To Cart</a>
                  </div>
                      </div>
                      `;
      });

      foodItems.innerHTML = food;
    });
}

function loadToCart() {
  fetch("http://localhost:8080/cart/get-all")
    .then((res) => res.json())
    .then((data) => {
      let cartItem = document.getElementById("cart");
      let items = "";
      let total = 0;
      data.forEach((item) => {
        items +=
          `
                                    <div class="card col-lg-2 col-md-3 col-sm-12 mt-3 ms-2" style="width: 12rem;">
                  <img src="/FrontEnd/assets/img/burger.jpg" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title text-center">Food ID :${item.id}</h5>
                    <h5 class="card-title text-center">${item.foodName}</h5>
                    <h6 class="card-title text-center">Food Qty:${item.qty}</h6>
                    <h6 class="card-text  text-center">Food Category : ${item.category}</h6>
                    <h6 class="card-text  text-center">Price LKR: ${item.price}</h6>
                    <a  class="btn btn-danger fw-bold text-dark d-flex justify-content-center" onclick = "removeFromCart(` +
          item.id +
          `)">Remove</a>
                  </div>
                </div>
                `;

        total += item.price;
      });

      setTotalPrice(total);
      cartItem.innerHTML = items;
    });
}

function setTotalPrice(price) {
  document.getElementById("totalCost").innerText = price;
}

function addToCart() {
  let cQty = 1;
  let foodID = document.getElementById("foodID").innerText;
  let foodName = document.getElementById("foodName").innerText;
  let category = document.getElementById("foodCategory").innerText;
  let price = document.getElementById("foodPrice").innerText;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    qty: cQty,
    foodId: foodID,
    foodName: foodName,
    category: category,
    price: price,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch("http://localhost:8080/cart/add", requestOptions)
    .then((response) => response.text())
    .then((data) => {
      loadCategory();
      loadFoodItem();
      loadToCart();
    });
}

function removeFromCart(id) {
  const requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };

  fetch("http://localhost:8080/cart/delete/" + id, requestOptions)
    .then((res) => res.text())
    .then((data) => {
      loadToCart();
    });
}

function setCustomerName() {
  let customerMobile = document.getElementById("customerMobile").value;

  if (customerMobile != "") {
    fetch("http://localhost:8080/customer/search-by-mobile/" + customerMobile)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("customerName").value = data.name;
      });
  }
}

function setTotal() {
  let subTotal = document.getElementById("totalCost").innerText;
  let discount = document.getElementById("discount").value;

  document.getElementById("finalTotal").value = subTotal - discount;
}

function palceOrder() {
  let costomerName = document.getElementById("customerName").value;
  let customerMobile = document.getElementById("customerMobile").value;
  let dateTime = new Date().toLocaleDateString("en-US");
  let items = "";
  let subTotal = document.getElementById("totalCost").innerText;
  let discount = document.getElementById("discount").value;
  let total = document.getElementById("finalTotal").value;

  fetch("http://localhost:8080/cart/get-all")
    .then((res) => res.json())
    .then((data) => {
      const foodNames = data.map((item) => item.foodName);

      foodNames.forEach((element) => {
        items += " " + element;
      });

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        customerName: costomerName,
        customerMobile: customerMobile,
        dateAndTime: dateTime,
        items: items,
        subTotal: subTotal,
        discount: discount,
        total: total,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      fetch("http://localhost:8080/order/add", requestOptions)
        .then((res) => res.text())
        .then((data) => {
          deleteAllInCart();
          location.reload();
        });
    });
}

function deleteAllInCart() {
  const requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };

  fetch("http://localhost:8080/cart/delete-all", requestOptions)
    .then((res) => res.text())
    .then((data) => {
      loadToCart();
    });
}
