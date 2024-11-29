var siteName = document.getElementById("siteName") ;
var siteUrl = document.getElementById("siteUrl") ;

var searchData = document.getElementById("searchData") 

var btnUpdate = document.getElementById("btnUpdate") ;
var btnAdd = document.getElementById("btnAdd") ;

var currentIndex = 0 ;

var siteList  = []; 
if(localStorage.getItem("siteContainer") !== null) {
    siteList = JSON.parse(localStorage.getItem("siteContainer" ))
    displayData()
}

function addData() {
   if(validationName (siteName) && validationUrl (siteUrl)) {
    var site = {
        name : siteName.value.trim() ,
        url : siteUrl.value.trim()
    }

    siteList.push(site)
    console.log(siteList)
    
    localStorage.setItem("siteContainer" , JSON.stringify(siteList))
    
    displayData ()

    clearInputs()

    Swal.fire({
    position: "center",
    icon: "success",
    title: `<p class= "fs-5 ">Valid Name and URL</p>`,
    showConfirmButton: false,
    timer: 2000
    });

   }
   else {
        Swal.fire({
        position: "center center",
        icon: "warning",
        title: `<p class="" style="font-size:15px "><span class="fw-bold text-danger">Site Name : </span>It must start letter following number , space , _ , but a maximum at top 20 characters </p>
               <p class="" style="font-size:15px "><span class="fw-bold text-danger">Site URL : </span>It must start words (.) wordes , It Support All Domain </p> `,
        showConfirmButton: false,
        });
   }
}

function displayData () {
   var cartona = ""
   for (var i = 0 ; i < siteList.length ; i++) {
        cartona += `
            <tr>
                <td class="bg-light" >${ i+1 }</td>
                <td class="bg-light">${siteList[i].name}</td>
                <td class="bg-light">
                    <button onclick = "visiteSite (${i})" type="button" class="btn btn-success btn-sm"><i class="fa-solid fa-eye pe-1"></i> Visite</button>
                </td>
                <td class="bg-light">
                    <button onclick = "deletItem(${i})" type="button" class="btn btn-danger btn-sm"> <i class="fa-solid fa-trash-can pe-1"></i> Delete</button>
                </td>
                <td class="bg-light">
                    <button onclick = "updateInfo(${i})" type="button" class="btn btn-warning btn-sm text-light"> <i class="fa-solid fa-pen-to-square pe-1"></i> Update</button>
                </td>
            </tr> 
        `
   }
   document.getElementById("rowData").innerHTML = cartona ;
}

function clearInputs () {
    siteName.value = null ;
    siteUrl.value = null ;

    siteName.classList.remove("is-valid")  ;
    siteUrl.classList.remove("is-valid")  ;


}

function visiteSite(index) {
    window.location.href = `${siteList[index].url}`;
}

function deletItem(index) {
    siteList.splice(index , 1)
    localStorage.setItem("siteContainer" , JSON.stringify(siteList) )
    displayData()
}
function updateInfo (index) {
    currentIndex = index ;

    siteName.value = siteList[index].name
    siteUrl.value = siteList[index].url

    btnUpdate.classList.remove("d-none")
    btnAdd.classList.add("d-none")

    console.log(siteList[index].name)
    
}

function updateItem () {
    var site = {
        name : siteName.value.trim() ,
        url: siteUrl.value.trim()
    }

    siteList.splice(currentIndex , 1 , site)

    localStorage.setItem("siteContainer" , JSON.stringify(siteList))

    displayData()

    btnUpdate.classList.add("d-none")
    btnAdd.classList.remove("d-none")

    clearInputs()
    
}

function searchItem() {
    var term = searchData.value ;
    var cartona = "" ;

    for(var i = 0 ; i < siteList.length ; i++) {
        if(siteList[i].name.toLocaleLowerCase().includes(term.toLocaleLowerCase())) {
            var regex = new RegExp(searchData.value , "gi")
            cartona += `
            <tr>
                <td class="bg-light" >${ i+1 }</td>
                <td class="bg-light">${siteList[i].name.replace(regex , (match)=> (`<span style="background-color:#fec260">${match}</span>`)) }</td>
                <td class="bg-light">
                    <button type="button" class="btn btn-success btn-sm"><i class="fa-solid fa-eye pe-1"></i> Visite</button>
                </td>
                <td class="bg-light">
                    <button onclick = "deletItem(${i})" type="button" class="btn btn-danger btn-sm"> <i class="fa-solid fa-trash-can pe-1"></i> Delete</button>
                </td>
                <td class="bg-light">
                    <button onclick = "updateInfo(${i})" type="button" class="btn btn-warning btn-sm text-light"> <i class="fa-solid fa-pen-to-square pe-1"></i> Update</button>
                </td>
            </tr> 
        `
        console.log(regex)
        }
    }
    document.getElementById("rowData").innerHTML = cartona ;
    
    
}

function validationName (element) {
    var text = element.value
    var regex = /^[a-zA-Z][a-zA-Z0-9 _]{2,19}$/ ;
    if(regex.test(text)) {

        element.classList.add("is-valid")
        element.classList.remove("is-invalid")

        return true
    }
    else {

        element.classList.add("is-invalid")
        element.classList.remove("is-valid")

        return false
    }
        
    
}
function validationUrl (element) {
    var text = element.value
    var regex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
    if(regex.test(text)) {

        element.classList.add("is-valid")
        element.classList.remove("is-invalid")

        return true
    }
    else {

        element.classList.add("is-invalid")
        element.classList.remove("is-valid")

        return false
    }
        
    
}
