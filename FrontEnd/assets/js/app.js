function login(){
 let username = document.getElementById("username").value;
 let password = document.getElementById("password").value;

 fetch("http://localhost:8080/user/isUserExists/"+username+":"+password+"")
        .then((res)=>res.json())
        .then((data)=>{
            if (data == true) {
                window.location = "assets/pages/Dashboard.html";
            } else {
                alert("Invalid Username or Password")
            }
        });
 
}