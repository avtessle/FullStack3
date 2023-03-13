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

// //See a specific record
// function seeNameRecord(name){
//     let request=new FXMLHttpRequest();    
//     request.onload= function() {
//         let showRecText=document.getElementById("showRec");
//         if (this.status == 200) {
//             recVisibility('visible');
//             showRecText.innerHTML = request.responseText;  
//             observedRec= request.responseText;
//             //let rec=JSON.parse(request.responseText); 
//         }
//         else{
//             alert("There is no matching appointment!");
//             recVisibility('hidden');
//         }
//     };
//     request.open("GET", `appointment/name/${name}`);
//     request.send();
// }

//See a specific record
function seeRecord(date,time){
    let request=new FXMLHttpRequest();    
    request.onload= function() {;
        if (this.status == 200) {
            removeRec();
            observedRec= request.responseText;
            displayRec(JSON.parse(observedRec));
            recVisibility('visible');
        }
        else{
            alert("There is no matching appointment!");
            removeRec();
        }
    };
    request.open("GET", `appointment/single/${date}/${time}`);
    request.send();
}

function removeRec(){
    if(observedRec){
        document.getElementById("recTable").remove();
        document.getElementById("submitEditBtn").remove();
        recVisibility('hidden');
    }
}

function seeDateRecord(date){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        // let showRecText=document.getElementById("mydate");
        if (this.status == 200) {
            // showRecText.innerHTML = request.responseText;  
            // observedRec= request.responseText;
            insertMeet(request.responseText);

        }
        else{
            alert("There is no matching appointment!");
                //recVisibility('hidden');
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
        }
    };
    request.open("POST", "appointment/add",newRecord);
    request.send();
}

function editRecord(){
    let table=document.getElementById("recTable");
    let cells = table.getElementsByTagName('td');
    for (let i = 1; i < cells.length; i+=2) {
        cells[i].addEventListener('click', editCell);
        cells[i].classList.add('editable');
    }

    // Create a button element
    let button = document.createElement("button");

    // Set the button text and attributes
    button.innerText = "submit changes";
    button.setAttribute("type", "button");
    button.setAttribute("id", "submitEditBtn");

    // Append the button to the HTML document
    document.getElementById("searchDiv").appendChild(button);
    button.addEventListener('click',submitChanges);
}

function submitChanges(){

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
    input.addEventListener('blur', inputBlur);
}

function inputBlur(event) {
    // Get the new value from the input field
    let newValue = event.target.value;

    // Replace the input field with the new value
    event.target.parentNode.innerHTML = newValue;
}

function deleteRecord(){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
            alert("deleted!");
            seeAll();
            removeRec();
        }
    };
    request.open("DELETE", "appointment/delete",observedRec);
    request.send();
}

function recVisibility(mode){
    //document.getElementById("showRec").style.visibility = mode;
    document.getElementById("editBtn").style.visibility = mode;
    document.getElementById("deleteBtn").style.visibility = mode;
}

function insertMeet(myMeets){
    // alert("hi"+meeting);
    myMeets =JSON.parse(myMeets);
    myMeets.forEach(meet => {
        let hour = document.getElementById(meet.time);
        let name = document.createElement('td');
        let phone = document.createElement('td');
        name.innerHTML = meet.name;
        phone.innerHTML = meet.phone;
        name.classList.add("newData");
        phone.classList.add("newData");
        hour.appendChild(name);
        hour.appendChild(phone);
    });
   
}

function displayRec(rec){

    let table = document.createElement('table');
    table.id = 'recTable';

    // Loop through the record properties and create a row for each one
    for (let key in rec) {
        let row = document.createElement('tr');

        // Create a cell for the property name
        let nameCell = document.createElement('td');
        nameCell.innerText = key;
        row.appendChild(nameCell);

        // Create a cell for the property value
        let valueCell = document.createElement('td');
        valueCell.innerText = rec[key];

        row.appendChild(valueCell);
        table.appendChild(row);
    }
    document.getElementById("searchDiv").appendChild(table);
}
