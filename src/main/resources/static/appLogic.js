
//=========== Variables/Objects Declarations ==========

let studentList = [];
var numStudents = 0;

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
    showTable();
    formElement.style.display = "none";
    displayBoard.style.display = "none";
}

addButton.addEventListener("click", handleAddButton)
editButton.addEventListener("click", handleEditButton)
delButton.addEventListener("click", handleDeleteButton)
displayButton.addEventListener("click", showDisplay)
doneButton.addEventListener("click", handleDoneButton)

//=================== DISPLAY FUNCTIONS ====================

function displayDoneBtn(){
    doneButton.style.display = "inline-block";
    addButton.style.display = "none";
    editButton.style.display = "none";
    delButton.style.display = "none";
    displayButton.style.display = "none";
}

function showTable(){
    dataTableElement.style.display = "block";
    displayBoard.style.display = "none";

    doneButton.style.display = "none";
    addButton.style.display = "inline-block";
    editButton.style.display = "inline-block";
    delButton.style.display = "inline-block";
    displayButton.style.display = "inline-block";
}

function showDisplay(){
    displayBoard.style.display = "block";
    dataTableElement.style.display = "none";
    displayDoneBtn();
    displayBoxes();
}

function displayBoxes(){
    console.log("display student box mode")
    document.querySelectorAll(".std-box").forEach(function(studentBox){
        studentBox.style.display = "inline-block";
    })
}

//===================== ADD FUNCTION =======================

function handleAddButton(){
    displayDoneBtn()
    formElement.style.display = "block";
    formElement.addEventListener("submit", onAddStd);
    return;
}

function onAddStd(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const HC = document.getElementById('HC').value;
    const gpa = document.getElementById('gpa').value;
    const gender = document.getElementById('gender').value;

    const propList = [name, weight, height, HC, gpa, gender];

    for(const newProp in propList){
        console.log("checking property: ", newProp)
        if(newProp == ''){
            alert("Please fill out all fields!")
            return;
        }
    }
    
    numStudents++;
    let student = {
        index: numStudents,
        name: name,
        weight: weight,
        height: height,
        hairColor: HC,
        gpa: gpa,
        gender: gender
    }
    studentList.push(student);

    const newRow = document.createElement('tr');

    for(const property in student){
        if(student.hasOwnProperty(property)){
            const cell = document.createElement('td');
            cell.textContent = student[property];
            cell.setAttribute('data-attribute', property);
            newRow.appendChild(cell);
        }
    }

    //create and append student buttons for new student
    const stdCell = document.createElement('td');
    const stdButton = document.createElement('button');
    stdButton.classList.add('std-btn');
    stdCell.appendChild(stdButton);
    newRow.appendChild(stdCell);

    tbodyElement.appendChild(newRow);
    formElement.reset();

    //create corresponding student box
    const stdBox = document.createElement('span'); //create a span for the student
    stdBox.classList.add("std-box");
    stdBox.setAttribute("index", numStudents);
    for(const property in student){ // for each property in student
        if(student.hasOwnProperty(property)){
            if (property=="name"){
                stdBox.innerHTML = student[property];
            }
            if (property=="weight"){
                stdBox.style.width = `${student[property]*0.7}px`;
            }
            if (property=="height"){
                stdBox.style.height = `${student[property]*0.7}px`;
            }
            if (property=="hairColor"){
                stdBox.style.border = `3px solid ${student[property]}`;
            }
            if (property=="gpa"){
                stdBox.innerHTML += "<br>" + student[property];
            }
            if (property=="gender"){
                if(student[property]=="female"){
                    stdBox.style.backgroundColor = "#ed8aba";
                }else if(student[property]=="male"){
                    stdBox.style.backgroundColor = "#5270f2";
                }
            }
        }
    }
    displayBoard.appendChild(stdBox);
    return;
}

//==================== DELETE FUNCTION ======================

function handleDeleteButton(){
    displayDoneBtn()
    document.querySelectorAll(".std-btn").forEach(function(deleteButton) {
        deleteButton.classList.add("delete-mode")
        deleteButton.innerHTML = "Delete";
    });
    
    dataTableElement.addEventListener("click", onDeleteStd)
}

function onDeleteStd(e){
    if (!e.target.classList.contains('std-btn')) {
        return;
    }
    numStudents--;
    const btn = e.target;
    const rowIndex = btn.closest('tr').rowIndex - 1;

    document.querySelectorAll(".std-box").forEach(function(studentBox){
        if(studentBox.getAttribute("index") == rowIndex){
            displayBoard.remove(studentBox);
        }
    })
    btn.closest('tr').remove();
}

//======================= EDIT FUNCTION ========================

function handleEditButton(){
    console.log("in edit mode")
    displayDoneBtn()
    
    //add edit mode to std-btn
    document.querySelectorAll(".std-btn").forEach(function(editButton) {
        editButton.classList.add("edit-mode")
        editButton.innerHTML = "Edit";
    });

    //wait for user to click on std btn
    dataTableElement.addEventListener("click", function(e){
        const btn = e.target;
        const row = btn.closest('tr');
        if(!row) return;
        const rowIndex = row.rowIndex - 1;
        

        console.log("Row index: ", rowIndex)
        console.log("Student list length", studentList.length)
        console.log("Student at index: ", studentList[rowIndex])

        if(rowIndex >= 0 && rowIndex < studentList.length){
            //fill form with student information
            const student = studentList[rowIndex];
            document.getElementById('name').value = student.name;
            document.getElementById('weight').value = student.weight;
            document.getElementById('height').value = student.height;
            document.getElementById('HC').value = student.hairColor;
            document.getElementById('gpa').value = student.gpa;
            document.getElementById('gender').value = student.gender;


            formElement.style.display = "block";
            formElement.addEventListener("submit", function(event){
                event.preventDefault();
                const name = document.getElementById('name').value;
                const weight = document.getElementById('weight').value;
                const height = document.getElementById('height').value;
                const HC = document.getElementById('HC').value;
                const gpa = document.getElementById('gpa').value;
                const gender = document.getElementById('gender').value;

                //get which student is being edited
                const student = studentList[rowIndex];
                
                console.log(student);

                //update student properties
                student.name = name;
                student.weight = weight;
                student.height = height;
                student.hairColor = HC;
                student.gpa = gpa;
                student.gender = gender;

                //update table contents
                row.cells[1].textContent = name;
                row.cells[2].textContent = weight;
                row.cells[3].textContent = height;
                row.cells[4].textContent = HC;
                row.cells[5].textContent = gpa;
                row.cells[6].textContent = gender;

                formElement.style.display = "none";

            }, {once: true});
        }else{
            console.error("Invalid rowIndex:", rowIndex);
        }
    });
}


// function handleEditButton() {
//     displayDoneBtn()
//     document.querySelectorAll('td').forEach(function(td) {
//         //has an eventListener to each of the table's data
//         td.addEventListener('click', function() {
//             var currentText = td.textContent.trim();
//             var input = document.createElement('input');

//             if(currentText=="Invalid Input!"){
//                 currentText = '';
//             }

//             input.value = currentText;
//             td.innerHTML = '';
//             //adjust style of user input
//             input.style.width = this.offsetWidth - (this.clientLeft * 2) + "px";
//             input.style.border = "0px";
//             input.style.fontFamily = "inherit";
//             input.style.fontSize = "inherit";
//             input.style.textAlign = "inherit";
//             input.style.backgroundColor = "#ffe7e9";

//             td.appendChild(input);
//             input.focus();
//             input.addEventListener('blur', function() {
//                 var newText = input.value.trim();
//                 var attribute = td.getAttribute('data-attribute');
//                 var rowIndex = td.parentNode.rowIndex;
//                 var valid = true;

//                 //check if input is valid (if not valid flag red)
//                 if(attribute=="name"){
//                     if (!/[^a-zA-Z]/.test(newText)){ //test if it contains a number
//                         valid = false;
//                     }
//                 }else if(attribute=="weight"||attribute=="height"){
//                     if(/^\d+$/.test(newText)){
//                         valid = true;
//                         newText = Number(newText);
//                     }else{
//                         valid = false;
//                     }
//                 }else if(attribute=="hairColor"){
//                     const s = new Option().style;
//                     s.color = newText.toLowerCase();
//                     if(s.color !== ''){
//                         valid = true;
//                     }else{
//                         valid = false;
//                     }
//                 }else if(attribute=="gpa"){
//                     if (/^\d+$/.test(newText)){
//                         return 0;
//                     }else if(Number.isInteger(text*10)){
//                         return 0;
//                     }else{
//                         return text.toFixed(1);
//                     }
//                 }else if(attribute=="gender"){
//                     text=text.toLowerCase();
//                     return text=="female"||text=="male";
//                 }

//                 if(checkInput(newText,attribute)){
//                     studentList[rowIndex][attribute] = newText;
//                     console.log("Updated student object on row " + rowIndex + ":", studentList[rowIndex]);
//                     td.textContent = newText;
//                 }else{
//                     console.log("invalid input")
//                     td.textContent = "Invalid Input!";
//                     td.style.color = "#e95757"
//                 }
//             });
//             input.onkeypress = function(event){
//                 if(event.keyCode == 13) {
//                     event.preventDefault();
//                     this.blur();
//                 }
//             };
//         });
//     });
// }

// function checkInput(text, attribute){
    
// }

//===================== DONE BUTTON ==========================

function handleDoneButton(){
    showTable();
    //if student delete buttons contains the class delete mode, remove the class
    document.querySelectorAll(".std-btn").forEach(function(studentButton) {
        if(studentButton.classList.contains("delete-mode")){
            studentButton.classList.remove("delete-mode")
        }
        if(studentButton.classList.contains("edit-mode")){
            studentButton.classList.remove("edit-mode")
        }
    });
    formElement.style.display = "none";
}


startApp();