var run_id=0;
let observedRec;

//Get data of the new record to add
function newRecordInfo(){
    let cName = document.getElementById("cname").value;
    let cPhone = document.getElementById("cphone").value;
    let cDate = document.getElementById("cdate").value;
    let cTime = document.getElementById("ctime").value;

    let record={id:run_id++, name:cName, phone:cPhone, date:cDate, time:cTime};
    add(JSON.stringify(record));
}

//See all the records
function seeAll(){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
            document.getElementById("allRecs").innerHTML=request.responseText;
    }};
    request.open("GET", "appointment/all");
    request.send();   
}

//See a specific record- request
function seeRecord(date,time){
    let request=new FXMLHttpRequest();    
    request.onload= function() {;
        if (this.status == 200) {
            removeRecDisplay();
            observedRec= JSON.parse(request.responseText);
            displayRec();
        }
        else{
            alert("There is no matching appointment!");
            removeRecDisplay();
        }
    };
    request.open("GET", `appointment/single/${date}/${time}`);
    request.send();
}

function getRecordsByDate(date){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
            insertMeet(request.responseText);
        }
        else{
            alert("There is no matching appointment!");
        }
    };
    request.open("GET", `appointment/multi/date/${date}`);
    request.send();
}

//Add a record
function add(newRecord){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
            alert("appointment added!");
        } else if(this.status == 422){
            alert("It is not possible to make the appointment at the chosen time. Choose another date.");
        }
    }
    request.open("POST", "appointment/add",newRecord);
    request.send();
}

function deleteRecord(){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
            alert("deleted!");
            seeAll();
            recVisibility('hidden');
        }
    };
    request.open("DELETE", "appointment/delete",observedRec);
    request.send();
}

//Display record data
function displayRec(){

    let table = document.createElement('table');
    table.id = 'recTable';

    // Loop through the record properties and create a row for each one
    for (let key in observedRec) {
        let row = document.createElement('tr');

        // Create a cell for the property name
        let nameCell = document.createElement('td');
        nameCell.innerText = key;
        row.appendChild(nameCell);

        // Create a cell for the property value
        let valueCell = document.createElement('td');
        valueCell.innerText = observedRec[key];

        row.appendChild(valueCell);
        table.appendChild(row);
    }
    document.getElementById("searchDiv").appendChild(table);

    createBtn("editBtn","edit",editRecord);
    createBtn("deleteBtn","delete",deleteRecord);
}

function createBtn(id, text,eventListener){
    button = document.createElement("button");
    button.innerText = text;
    button.setAttribute("type", "button");
    button.setAttribute("id", id);
    document.getElementById("searchDiv").appendChild(button);
    button.addEventListener('click',eventListener);
}

//Remove record data
function removeRecDisplay(){
    if(observedRec){
        let elements=[document.getElementById("recTable"),
        document.getElementById("editBtn"),
        document.getElementById("deleteBtn"),
        document.getElementById("submitEditBtn")]
        for (let i in elements) {
            if(elements[i]){
                elements[i].remove();
            }
        }
    }
}

function editRecord(){
    let table=document.getElementById("recTable");
    let cells = table.getElementsByTagName('td');
    for (let i = 1; i < cells.length; i+=2) {
        cells[i].addEventListener('click', editCell);
        cells[i].classList.add('editable');
    }

    // Create a submit button
    createBtn("submitEditBtn","submit changes",submitChanges);
    document.getElementById("editBtn").remove();
    document.getElementById("deleteBtn").remove();
}

function editCell(event) {
    // Get the current value of the cell
    let currentValue = event.target.innerHTML;

    // Replace the cell content with an input field
    event.target.innerHTML = `<input type="text" value="${currentValue}">`;

    // Focus on the input field and select its content
    let input = event.target.getElementsByTagName('input')[0];
    input.focus();
    input.select();

    // Add an event listener to the input field
    //Get the new value from the input field and replace the input field with the new value
    input.addEventListener('blur', function(event){
        let newValue = event.target.value;
        event.target.parentNode.innerHTML = newValue;
    });
}

// function inputBlur(event) {
//     // Get the new value from the input field
//     let newValue = event.target.value;

//     // Replace the input field with the new value
//     event.target.parentNode.innerHTML = newValue;
// }

function submitChanges(){
}

function recVisibility(mode){
    document.getElementById("showRec").style.visibility = mode;
    document.getElementById("editBtn").style.visibility = mode;
    document.getElementById("deleteBtn").style.visibility = mode;
}

function insertMeet(myMeets){

    myMeets =JSON.parse(myMeets);
    myMeets.forEach(meet => {
        let hourRow = document.getElementById(meet.time);
        let name = document.createTextNode(meet.name);
        let phone = document.createTextNode(meet.phone);

        (hourRow.childNodes[1]).appendChild(name);
        (hourRow.childNodes[2]).appendChild(phone);
    });
   
}