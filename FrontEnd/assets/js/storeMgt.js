function addFood(){
    let foodName = document.getElementById("foodName").value;
    let foodPrice = document.getElementById("foodPrice").value;
    let expireDate = document.getElementById("expireDate").value;
    let foodStatus = document.getElementById("foodStatus").innerText;
    let foodCategory = document.getElementById("foodCategory").innerText;
  
    if (foodName != "" && foodPrice != "" &&  expireDate != "") {
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type","application/json");
  
        const raw = JSON.stringify({
              "name":foodName,
              "category":foodCategory,
              "price":foodPrice,
              "expireDate":expireDate,
              "status":foodStatus
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
          };
   
       
          fetch("http://localhost:8080/food/add",requestOptions)
            .then((res) => res.text())
            .then((data) => {
                 clearForm();
                 loadCategories();
          });

    } else {
        alert("Please Enter Relavent details")
    }

   
}

function clearForm(){
   location.reload();
}

function loadCategories(){
    fetch("http://localhost:8080/category/get-all")
    .then((res)=>res.json())
    .then((data) => {
        let tableRow = "";

        let categoryList = document.getElementById("foodCategoryList");

        data.forEach(customer => {
            tableRow+=`
                 <li id="foodCategory"><a class="dropdown-item" href="#">${customer.category}</a></li>
            `;
        });

        categoryList.innerHTML = tableRow;
    });
}

function loadFood(){
    fetch("http://localhost:8080/food/get-all")
    .then((res)=>res.json())
    .then((data) => {
        let tableRow = `
          <tr>
              <th>Food ID</th>
              <th>Food Name</th>
              <th>Food Category</th>
              <th>Price</th>
              <th>Expire Date</th>
              <th>Status</th>
              <th>Update</th>
              <th>Remove</th>
            </tr>
        `;

        let customerTable = document.getElementById("tblFood");

        data.forEach(food => {
            tableRow+=`
                            <tr>
              <td>
                <p class="fw-normal mb-1">${food.id}</p>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="/FrontEnd/assets/img/burger.jpg"
                    alt=""
                    style="width: 100px; height: 100px"
                    class="rounded-circle"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">${food.name}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">${food.category}</p>
              </td>
              <td>
                <p class="fw-normal mb-1">${food.price}</p>
              </td>

              <td>
                <span
                  class="badge badge-success rounded-pill d-inline text-bg-dark"
                  >${food.expireDate}</span
                >
              </td>
              <td>
                <p class="fw-normal mb-1 fw-bold">${food.status}</p>
              </td>
              <td>
                <button type="button" class="btn btn-success col-10" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@mdo"
                onclick="setDataToupdateCustomer(`+food.id+`)";
                >
                  Update
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger col-10" onclick="deleteFood(`+food.id+`)">
                  Remove
                </button>
              </td>
            </tr>

            `;
        });

        customerTable.innerHTML = tableRow;
    });
}

function setDataToupdateCustomer(id){

    fetch("http://localhost:8080/food/get/"+id)
    .then((res)=>res.json())
    .then((data)=>{
        document.getElementById("foodItemId").value = data.id;
        document.getElementById("foodItemName").value = data.name;
        document.getElementById("foodItemCategory").value = data.category;
        document.getElementById("foodItemPrice").value = data.price;
        document.getElementById("foodItemExpireDate").value = data.expireDate;
        document.getElementById("foodItemStatus").value = data.status;
    });

}


function updateFood(){
       let foodItemId = document.getElementById("foodItemId").value;
       let foodItemName = document.getElementById("foodItemName").value;
       let foodItemCategory = document.getElementById("foodItemCategory").value;
       let foodItemPrice = document.getElementById("foodItemPrice").value;
       let foodItemExpireDate = document.getElementById("foodItemExpireDate").value;
       let foodItemStatus = document.getElementById("foodItemStatus").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");

    const raw = JSON.stringify({
        id: foodItemId,
        name: foodItemName,
        category: foodItemCategory,
        price: foodItemPrice,
        expireDate: foodItemExpireDate,
        status: foodItemStatus

    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("http://localhost:8080/food/update-food",requestOptions)
        .then((res) => res.text())
        .then((data) => {
            clearModal();
            loadFood();
        })
        .catch((error) => console.log(error));
    
}

function clearModal(){
    document.getElementById("foodItemId").value = "";
    document.getElementById("foodItemName").value = "";
    document.getElementById("foodItemCategory").value = "";
    document.getElementById("foodItemPrice").value = "";
    document.getElementById("foodItemExpireDate").value = "";
    document.getElementById("foodItemStatus").value = "";
}


function deleteFood(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow",
    };

    fetch("http://localhost:8080/food/delete/"+id, requestOptions)
        .then((res) => res.text())
        .then((data)=>{
            loadFood();
        })
}