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