function clearForm(){
    document.getElementById("txtName").value = "";
    document.getElementById("txtmobile").value="";

}

function addCustomer(){
    let name = document.getElementById("txtName").value;
    let mobile = document.getElementById("txtmobile").value;
    let status = "Active";

    if (name != "" && mobile != "") {
       
      const myHeaders = new Headers();
      myHeaders.append("Content-Type","application/json");

      const raw = JSON.stringify({
            "name":name,
            "mobile":mobile,
            "status":status
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      fetch("http://localhost:8080/customer/add",requestOptions)
      .then((response) => response.text())
      .then((data)=>{
        clearForm();
        loadCustomers();
      });
        

    }else{
        alert("please enter name and mobile")
    }
}

function loadCustomers(){
    fetch("http://localhost:8080/customer/get-all")
    .then((res)=>res.json())
    .then((data) => {
        let tableRow = `
          <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Mobile Number</th>
              <th>Status</th>
              <th>Update</th>
              <th>Remove</th>
            </tr>
        `;

        let customerTable = document.getElementById("tblCustomers");

        data.forEach(customer => {
            tableRow+=`
                    <tr>
              <td>
                <p class="fw-normal mb-1">${customer.id}</p>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">${customer.name}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">${customer.mobile}</p>
              </td>
              <td>
                <p class="fw-normal mb-1">${customer.status}</p>
              </td>

              <td>'
                <button type="button" class="btn btn-success col-10" onclick="setDataToupdateCustomer(`+customer.id+`)"
                data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@mdo"
                >
                  Update
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger col-10" onclick = "deleteCustomer(`+customer.id+`)">
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

    fetch("http://localhost:8080/customer/search-by-id/"+id)
    .then((res)=>res.json())
    .then((data)=>{
        document.getElementById("customerId-1").value = data.id;
        document.getElementById("customerName-1").value = data.name;
        document.getElementById("customerMobile-1").value = data.mobile;
        document.getElementById("customerStatus-1").value = data.status;
    });

}

function updateCustomer(){
    let customerId = document.getElementById("customerId-1").value;
    let customerName = document.getElementById("customerName-1").value;
    let customerMobile = document.getElementById("customerMobile-1").value;
    let customerStatus = document.getElementById("customerStatus-1").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");

    const raw = JSON.stringify({
        id: customerId,
        name: customerName,
        mobile: customerMobile,
        status: customerStatus,

    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("http://localhost:8080/customer/update-customer",requestOptions)
        .then((res) => res.text())
        .then((data) => {
            clearForm();
            loadCustomers();
            clearModal();
        })
        .catch((error) => console.log(error));
    
}

function clearModal(){
    document.getElementById("customerId-1").value ="";
    document.getElementById("customerName-1").value ="";
    document.getElementById("customerMobile-1").value ="";
    document.getElementById("customerStatus-1").value ="";
}

function deleteCustomer(id){
    const requestOptions = {
        method: "DELETE",
        redirect: "follow",
    };

    fetch("http://localhost:8080/customer/delete/"+id, requestOptions)
        .then((res) => res.text())
        .then((data)=>{
            loadCustomers();
            clearForm();
        })
}


