
function loadOrderHistory(){
    fetch("http://localhost:8080/order/get-all")
    .then((res) => res.json())
    .then((data) =>{
        let tableRow = `
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Customer Mobile</th>
              <th>Date & Time</th>
              <th>Items</th>
              <th>Sub Total</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>
        `;

        let orderHistoryTable = document.getElementById("tblOrderHistory");

        data.forEach((orderHistoryRecord) => {
            tableRow+=`

                        <tr>
              <td>
                <p class="fw-normal mb-1">${orderHistoryRecord.id}</p>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">${orderHistoryRecord.customerName}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">${orderHistoryRecord.customerMobile}</p>
              </td>
              <td>
                <p class="fw-normal mb-1">${orderHistoryRecord.dateAndTime}</p>
              </td>

              <td>
                <p class="fw-normal mb-1">${orderHistoryRecord.items}</p>
              </td>
              <td>
                <p class="fw-normal mb-1">${orderHistoryRecord.subTotal}</p>
              </td>
              <td>
                <p class="fw-normal mb-1">${orderHistoryRecord.discount}</p>
              </td>
              <td>
                <p class="fw-normal mb-1">${orderHistoryRecord.total}</p>
              </td>
            </tr>
            `;

           
        });
        orderHistoryTable.innerHTML = tableRow;
    });
}

function getOrderByCustomerMobile(){
    let customerMobile = document.getElementById("customerMobile").value;

    fetch("http://localhost:8080/order/search-by-mobile/"+customerMobile)
        .then((res)=>res.json())
        .then((data)=>{
            let tableRow = `
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Customer Mobile</th>
              <th>Date & Time</th>
              <th>Items</th>
              <th>Sub Total</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>
        `;

        let orderHistoryTable = document.getElementById("tblOrderHistory");
        
        data.forEach((orderHistoryRecord) => {
            tableRow+=`

                        <tr>
              <td>
                <p class="fw-normal mb-1">${orderHistoryRecord.id}</p>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">${orderHistoryRecord.customerName}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">${orderHistoryRecord.customerMobile}</p>
              </td>
              <td>
                <p class="fw-normal mb-1">${orderHistoryRecord.dateAndTime}</p>
              </td>

              <td>
                <p class="fw-normal mb-1">${orderHistoryRecord.items}</p>
              </td>
              <td>
                <p class="fw-normal mb-1">${orderHistoryRecord.subTotal}</p>
              </td>
              <td>
                <p class="fw-normal mb-1">${orderHistoryRecord.discount}</p>
              </td>
              <td>
                <p class="fw-normal mb-1">${orderHistoryRecord.total}</p>
              </td>
            </tr>
            `;

           
        });

        orderHistoryTable.innerHTML = tableRow;

     });
}

// function getOrderReport(){
    
//     // fetch("http://localhost:8080/order/get-full-report")
//   let originalContent = document.body.innerHTML;
//   let printTable = document.getElementById("tblOrderHistory");
//   document.body.innerHTML = printTable;
//   window.print();
//   document.body.innerHTML = originalContent;
    
        
// }