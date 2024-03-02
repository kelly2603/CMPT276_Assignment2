
//=========== Variables/Objects Declarations ==========

var dataTableElement = document.getElementById("datatable")
var cells = document.getElementsByTagName("td")
const tbodyElement = document.querySelector("tbody")
const displayBoard = document.getElementById("display-board")
const formElement = document.querySelector('form')

const addButton = document.getElementById("add-btn")
const delButton = document.getElementById("del-btn")
const editButton = document.getElementById("edit-btn")
const displayButton = document.getElementById("display-btn")
const doneButton = document.getElementById("done-btn")

//================ Application Functions ===============

function startApp(){
    window.location.href = "/students/datatable.html";
    formElement.style.display = "none";
    displayBoard.style.display = "none";

}

addButton.addEventListener("click", handleAddButton)
editButton.addEventListener("click", handleEditButton)
delButton.addEventListener("click", handleDeleteButton)
displayButton.addEventListener("click", showDisplay)
doneButton.addEventListener("click", handleDoneButton)

//===================== ADD FUNCTION =======================

function handleAddButton(){
    formElement.action = "/students/add";
    formElement.method = "post";
    formElement.style.display = "block";
}

//==================== DELETE FUNCTION ======================

function handleDeleteButton(){

    displayDoneBtn()

    document.querySelectorAll(".std-btn").forEach(function(deleteButton) {
        deleteButton.classList.add("delete-mode")
        deleteButton.innerHTML = "Delete";
    });
    
    dataTableElement.addEventListener("click", onDeleteStd);
}

function onDeleteStd(e){
    if (!e.target.classList.contains('std-btn')) {
        return;
    }

    const btn = e.target;
    //const rowIndex = btn.closest('tr').rowIndex - 1;
    const studentID = btn.getAttribute("student-id");

    //remove student from database
    $.ajax({
        url: "/students/" + studentID,
        type: "DELETE",
        success: function(response){
            console.log("Student deleted");
        },
        error: function(error){
            console.log("Student failed to be deleted: ", error);
        }
    })
}

//====================== EDIT FUNCTION =======================
function handleEditButton(){
    
    formElement.action = "/students/edit";
    formElement.method = "patch";

    document.querySelectorAll(".std-btn").forEach(function(editButton) {
        editButton.classList.add("edit-mode")
        editButton.innerHTML = "Edit";
    });

    displayDoneBtn()

    dataTableElement.addEventListener("click", ()=>{
        if (!e.target.classList.contains('std-btn')) {
            return;
        }
        const btn = e.target;
        const studentID = btn.getAttribute("student-id");

        formElement.style.display = "block";
        formElement.addEventListener("submit", onEditStd(studentID));
    });
}

function onEditStd(studentID){
    
}

//===================== DISPLAY FUNCTIONS ====================
function showDisplay(){
    window.location.href = "/students/display.html";
}

//======================== DONE BUTTON ========================
function handleDoneButton(){
    window.location.href = "/students/datatable.html";
}