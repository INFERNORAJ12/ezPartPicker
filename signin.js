var sb = document.getElementById('sb').addEventListener('click',async (e)=>{
    e.preventDefault(); // prevent form from submitting normally
    let name = document.getElementById('names').value
    
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let data = JSON.stringify({ name,  email,  password})
   
    let sent = await fetch('http://localhost:2000',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        body: data

    })
});
