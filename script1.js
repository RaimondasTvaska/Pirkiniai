
createPurchaseTable();

function createPurchaseTable() {

    let generatedHtml = "";
    let items = JSON.parse(localStorage.getItem('data'));
    let select = document.getElementById("select");
    //console.log(items);


    if(items === null){
        localStorage.setItem('data', JSON.stringify( [] ) );
        localStorage.setItem('id', "0" );
        return;
    }   
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        //console.log(item);
        if (select.value != "0") {
            if (select.value != item.category) {
                continue;
                
            }
            
        }
        let tableRow = `<tr>
                            <td>${item.name}</td>
                            <td>${item.category}</td>
                            <td>${item.quantity}</td>`+
                            `<td>
                            <div style="float: right;" class="done btn btn-success" id="${item.id}">Atlikta</div>
                            <div style="float: right;" class="edit btn btn-warning" id="edit-${item.id}">Edit</div>
                            <div style="float: right;" class="delete btn btn-danger" id="${item.id}">Trinti</div>
                             <td>`+
                              // `<div class="delete btn btn-danger" onclick="deleteEntry(${todo.id});">trinti irasa</div>`
                            `</td>
                        </tr>`               

        generatedHtml = generatedHtml + tableRow;
    }

    let bodyElement = document.getElementById("tasks-table");

    bodyElement.innerHTML = generatedHtml;
    activateDeleteBtns();
    activateEditBtns();
    activateDoneBtns();
    
    // foreach todoList
        //generate <tr><td> task1 </td> <td> description2 </td> </tr>
        // merge generate table html
    // get table html element
    //get tbody of that table
    //modify tbody.innerHtml into our newly generated one
    
}

function addNewTodo() {
    // if(!inputValidation2()){
    //     return;
    // }
    let items = JSON.parse(localStorage.getItem('data'));
    //console.log(todos);
    // 1 Get Name from  document variable
    let itemValue = document.getElementById("product").value;
    // 2 Get Description from document variable
    let categoryValue= document.getElementById("category").value;
    let quantityValue = document.getElementById("quantity").value;
    // 3 Create Todo object with received name and description
    
    let item = {
        id: parseInt(localStorage.getItem("id")) + 1,
        name: itemValue,
        category: categoryValue,
        quantity: quantityValue,
        status: 0
    }
    // 4 Add new todo to todos list
    items.push(item);
    localStorage.setItem("id", item.id);
    localStorage.setItem("data", JSON.stringify(items));
    // 5 Call UpdateHtmlTable function
    clearForm();
    createPurchaseTable();
    
    document.getElementById('product').focus();
    
}

function activateDeleteBtns() {
    let deleteBtns = document.getElementsByClassName('delete');
    for (let i = 0; i < deleteBtns.length; i++) {
        let btn = deleteBtns[i];
        btn.addEventListener('click',function () {
            deleteEntry(btn.id);
            
        });
        
    }
    
}

function activateEditBtns() {
    let editBtns = document.getElementsByClassName('edit');

    for (let i = 0; i < editBtns.length; i++) {
        let btn = editBtns[i];
        btn.addEventListener('click',function(){
            editEntry(btn.id);
        });
    }
}
function activateDoneBtns() {
    let doneBtns = document.getElementsByClassName('done');

    for (let i = 0; i < doneBtns.length; i++) {
        let btn = doneBtns[i];
        btn.addEventListener('click',function(){
            doneEntry(btn.id);
        });
    }
}
function clearForm() {

    document.getElementById("product").value = "";
    document.getElementById("category").value = "";
    document.getElementById("quantity").value = "";
}

// function inputValidation() {
//     document.getElementById("error").innerHTML = "";
//     if( isValid("item") ){
//         return true;

//     }

//     if( !isValid("todo-description") ){
        
//             document.getElementById("error").innerHTML += "<h1>Forma negali buti tuscia</h1>";
            
//     }
//     if( !isValid("todo-name") ){

//         document.getElementById("error").innerHTML += "<h1>Forma negali buti be pavadinimo</h1>";
            
//     }
//         return false;
    

    
// }

// function inputValidation2() {
//     document.getElementById("error").innerHTML = "";
//     document.getElementById("error").classList.remove('success');
//     document.getElementById("error").classList.remove('error');

//     if( !isValid("todo-name") &&
//     !isValid("todo-description") ){
//         document.getElementById("error").innerHTML += "<h1>Forma negali buti tuscia</h1>";
//         document.getElementById("error").classList.add('error');
//         return false;
//     }

//     if( !isValid("todo-name") &&
//     isValid("todo-description") ){
//         document.getElementById("error").innerHTML += "<h1>Forma negali buti be pavadinimo</h1>";
//         document.getElementById("error").classList.add('error');
//         return false;
//     }
//     document.getElementById("error").classList.add('success');
//     document.getElementById("error").innerHTML += "<h1>Jums pavyko prideti irasa</h1";
//     return true;
// }

// function isValid(id) {

//     if(document.getElementById(id).value == ""){
//         return false
//     }

//     return true;
    
// }

let hide = document.getElementById("hide");
let show = document.getElementById("show");

hide.addEventListener('click', function() {
    document.getElementById("form").classList.add('hidden');
    show.classList.remove('hidden');
});
show.addEventListener('click', function() {
    document.getElementById("form").classList.remove('hidden');
    show.classList.add('hidden');
});

function editEntry(id) {

    let items = JSON.parse(localStorage.getItem('data'));
    for (let i = 0; i < items.length; i++) {
        if(`edit-${items[i].id}` == id){
            activateEditMode(items[i]);
        }
        
    }
}

function activateEditMode(item) {
    //Get Html elements of Name, description
    document.getElementById("product").value = item.name;
    document.getElementById("category").value = item.description;
    document.getElementById("quantity").value = item.quantity;
    document.getElementById("todo-id").value = item.id;
    document.getElementById("edit-btn").style = "";
    document.getElementById("submit-btn").style = "display:none";
    //Ypdate those Html elements with todo.name, todo.description
    //Unhide the EditButton
    document.getElementById("form").classList.remove('hidden');
    document.getElementById("show").classList.add('hidden');
    
}

function editTodo() {
    // if(!inputValidation2()){
    //     return;
    // }
    //var todoId = document.getElementById("todo-id").value;
    let items = JSON.parse(localStorage.getItem('data'));
    let item = {
        "id": document.getElementById("todo-id").value,
        "product": document.getElementById("product").value,
        "category": document.getElementById("category").value,
        "quantity": document.getElementById("quantity").value,
        "status": 0
        
    }
    
    
    for (let i = 0; i < items.length; i++) {
        if(items[i].id == item.id){
            items[i] = item;
            break;
            
        }
        
    }
    
    localStorage.setItem("data", JSON.stringify(items));

    createPurchaseTable();
    clearForm();
    document.getElementById("edit-btn").style = "display:none";
    document.getElementById("submit-btn").style = "";
    document.getElementById("form").classList.add('hidden');
    show.classList.remove('hidden');

}

let select = document.getElementById("select");
select.addEventListener('change', function(){
    createPurchaseTable();
})


function deleteEntry(id) {
    //console.log(id);
    let items = JSON.parse(localStorage.getItem('data'));
    for (let i = 0; i < items.length; i++) {
        if(items[i].id == id){
            //console.log(todos[i]);
            items.splice(i,1);
            break;
        }
    }
    localStorage.setItem("data", JSON.stringify(items));

    createPurchaseTable();
}

function doneEntry(id) {
    let items = JSON.parse(localStorage.getItem('data'));
    for (let i = 0; i < items.length; i++) {
        if(items[i].id == id){
            //console.log(todos[i]);
            items.splice(i,1);
            break;
        }
    }
    sessionStorage.setItem("data", JSON.stringify(items));

    
}
    


categorySelect();

function categorySelect() {
    let shoppingList = JSON.parse(localStorage.getItem('data'));
    let select = document.getElementById("select");
    let categories = [];
    let HTML = "";

    shoppingList.forEach(item => {
        if (!categories.includes(item.category)) {
            categories.push(item.category);
        }
        
    });

    categories.forEach(category =>{
        HTML += `<option value="${category}">${category}</option>`;
    });
    select.innerHTML += HTML;
}
