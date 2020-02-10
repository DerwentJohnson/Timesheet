window.onload = function(){
    

    const goHome = document.getElementById('home')
    const clients = document.getElementById('clients')
    const logout = document.getElementById('logout')

    logout.addEventListener('click',Logout)

    goHome.addEventListener('click', GoHome)

    clients.addEventListener('click', GoToClients)

    getData()
}

function getData() {
    const container = this.document.getElementById('container')
    const xhr = new XMLHttpRequest();

    xhr.open('POST','/clients',true)
    xhr.onload = function() {
        console.log(this.response)
        var clientData = JSON.parse(this.response)
        for (const key in clientData) {
            var card = document.createElement('div');
            card.classList.add("card");
             card.innerHTML = '<h3 class="cardHeader">'+clientData[key].name+'</h3>'+'<div class="card-body">'+'<div class="email">'+'<label>'+'Email :'+'</label>'+clientData[key].email+'</div>'+'<div class="address">'+'<label>'+'Address :'+'</label>'+clientData[key].address+'</div>'

            container.appendChild(card)
        }
        
    }
    xhr.send()
}

function Logout() {
    
    const xhr = new XMLHttpRequest();

    xhr.open('GET','/logout',true)
    xhr.onload = function() {
        window.location = this.responseURL;
    }
    xhr.send()
}

function GoHome() {
    window.location = '/'
}

function GoToClients() {
window.location = '/clients'
}