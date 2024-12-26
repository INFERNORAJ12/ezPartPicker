async function connect(name, password) {
    console.log(name + ': ' + password)
    let db = await fetch("http://localhost:2000/db")
    let res = await db.json()
    let check = false
    res.map((n)=>{
         if(n.username == name && n.password == password){
                 check = true
                
            
             }
        
    })
    if(check){
        location.href = "index.html"
    }else{
        console.log("Login Failed")
    }
}
var sv = document.getElementById("btn").addEventListener("click", async (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value
    let password = document.getElementById("password").value
    console.log(name + " " + password)
     connect(name, password)

    }); 
