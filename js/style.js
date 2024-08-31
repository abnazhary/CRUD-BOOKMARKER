
var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var tableBody = document.getElementById("tableBody")
var tablHead = document.getElementById("tablHead")
var addBtn = document.getElementById("addBtn")
var searchInput = document.getElementById("searchInput")

var mainIndex = 0

var bookMarks ;
if(localStorage.getItem("bookMarks") != null){
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
    displayBook()
}
else{
    bookMarks = [];
}



function addsite(){
    var bookMark = {
        name:nameInput.value,
        url:urlInput.value,
    }

    if (nameInput.value == "" || urlInput.value == ""){
        alert("Error, please enter a value")
    }

    else{
       
       if(addBtn.innerHTML == "submit"){
        bookMarks.push(bookMark);
       }
       
       else{
        bookMarks.splice(mainIndex , 1 , bookMark)
        addBtn.innerHTML = "submit"
       }
       
       
        
        displayBook()
        clearForm()
        localStorage.setItem("bookMarks",JSON.stringify(bookMarks))
    }


    
    
    
    
    
}

function displayBook(){
    var marks = ``;
    for(var i = 0 ; i < bookMarks.length ; i++ ){
        marks += `
        <tr>
                        <td>${i}</td>
                        <td>${bookMarks[i].name}</td>
                        <td><button class="btn btn-primary  "><a href="${bookMarks[i].url}" class="text-decoration-none text-white">visit</a></button></td>
                        <td><button onclick="updateBook(${i})" class="btn btn-warning text-white">Update</button></td>
                        <td><button onclick="deleteBook(${i})" class="btn btn-danger">Delete</button></td>
                    </tr>
        `
    }
    tableBody.innerHTML = marks;
}


function clearForm(){
    nameInput.value ="";
    urlInput.value = "";
}


function deleteBook(index){
    bookMarks.splice(index,1);
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks))
    displayBook()
}



function updateBook(index){

    mainIndex = index;
nameInput.value = bookMarks[index].name;
urlInput.value = bookMarks[index].url

addBtn.innerHTML = "Update"
}




function search (){
    searchValue = searchInput.value;

    var marks = ``;
    for(var i = 0 ; i < bookMarks.length ; i++ ){
      if(bookMarks[i].name.toLowerCase().includes(searchValue.toLowerCase())){
        marks += `
        <tr>
                        <td>${i}</td>
                        <td>${bookMarks[i].name}</td>
                        <td><button class="btn btn-primary  "><a href="${bookMarks[i].url}" class="text-decoration-none text-white">visit</a></button></td>
                        <td><button onclick="updateBook(${i})" class="btn btn-warning text-white">Update</button></td>
                        <td><button onclick="deleteBook(${i})" class="btn btn-danger">Delete</button></td>
                    </tr>
        `
      }
    }
    tableBody.innerHTML = marks;
}