const URL = "https://64fb193acb9c00518f7aa434.mockapi.io/api/v1/userList"
const cards = document.querySelector(".cards")

let currentUserEdit;

const showCards = async() =>{
    
    const response = await fetch(URL)
    const resData = await response.json()

    resData.forEach(user => {
        const card = document.createElement("div")
        card.id = user.id

        card.classList.add("card")

        const userName = document.createElement("p")
        userName.textContent = user.name

        const userEmail = document.createElement("p")
        userEmail.textContent = user.email

        const userId = document.createElement("p")
        userId.textContent = user.id

        const userDelete = document.createElement(`button`)
        userDelete.id = user.id

        userDelete.onclick = () => deleteUser(user.id)
        userDelete.textContent = "DELETE"

        const userEdit = document.createElement(`button`)
        userEdit.id = user.id
        userEdit.onclick = ()=>{ toggleEditUser(user.id)}
        userEdit.textContent = "EDIT"


        card.appendChild(userId)
        card.appendChild(userName)
        card.appendChild(userEmail)
        card.appendChild(userDelete)
        card.appendChild(userEdit)
        cards.appendChild(card)
    });
}

const deleteUser = (id)=>{
    const allCards = cards.querySelectorAll(".card")
    allCards.forEach(async (card)=>{
        if(card.id === id){ 
            const response = await fetch((URL + `/${id}`), {
                method: "DELETE"
            })
            if(response.ok){
                console.log("Se borro el usuario correctamente")
                
            }else{
                console.log("Eu ta mal")
            }
        }
    })
}
const createUser = async (event)=>{
    
    event.preventDefault()

    const newUserName = document.getElementById("new-user-name").value
    console.log(newUserName)

    const newUserEmail = document.getElementById("new-user-email").value
    console.log(newUserEmail)

    const newUserCountry = document.getElementById("new-user-country").value
    console.log(newUserCountry)

    const newUserAvatar = document.getElementById("new-user-avatar").value
    console.log(newUserAvatar)

    const newUserRoles = []
    if(newUserRoles.length !== 0){
        newUserRoles.push(document.getElementById("new-user-roles").value)
    }


    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            name: newUserName,
            email: newUserEmail,
            country: newUserCountry,
            avatar: newUserAvatar,
            roles : newUserRoles
        })
    })
    if(response.ok){
        console.log("Se agrego correctamente")
    }else{
        console.log("Eu ta todo mal")
    }
}

const toggleEditUser = (id)=>{
    currentUserEdit = id
    const editModal = document.getElementById("show-edit-user")
    if(editModal.checked){
        editModal.checked = false
    }else{
        editModal.checked = true
    }
}

const editUser = async (event)=>{

    event.preventDefault()

    const datosAEditar = {
    }

    const editUserName = document.getElementById("edit-user-name").value
    console.log(editUserName)

    if(editUserName){
        datosAEditar.name = editUserName
    }

    const editUserEmail = document.getElementById("edit-user-email").value
    console.log(editUserEmail)

    if(editUserEmail){
        datosAEditar.email = editUserEmail
    }

    const editUserCountry = document.getElementById("edit-user-country").value
    console.log(editUserCountry)

    if(editUserCountry){
        datosAEditar.country = editUserCountry
    }

    const editUserAvatar = document.getElementById("edit-user-avatar").value
    console.log(editUserAvatar)

    if(editUserAvatar){
        datosAEditar.avatar =editUserAvatar
    }

    const editUserRoles = []
    if(editUserRoles.length !== 0){
        editUserRoles.roles = document.getElementById("edit-user-roles").value
    }

    console.log(URL + `/${currentUserEdit}`)
    console.log(datosAEditar)

    const response = await fetch(URL + `/${currentUserEdit}`, {
       method: "PUT",
       headers : {"Content-Type": "application/json"
        },
        body : JSON.stringify(datosAEditar)
    })
}

showCards()