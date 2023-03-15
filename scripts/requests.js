var run_id=0;
let observedRec;

//See all the records- request
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
            alert("No matching appointment");
            removeRecDisplay();
        }
    };
    request.open("GET", `appointment/single/${date}/${time}`);
    request.send();
}

//Get all record by date - request
function getRecordsByDate(date){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
            insertMeet(request.responseText);
        }
        else{
            alert("No matching appointment");
            //recVisibility('hidden');
        }
    };
    request.open("GET", `appointment/multi/date/${date}`);
    request.send();
}

//Add a record- request
function add(newRecord){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
            alert("appointment added!");
        } else if(this.status == 422)
        {
            alert("It is not possible to make the appointment at the chosen time. Choose another date.");
        }
    }
    request.open("POST", "appointment/add",newRecord);
    request.send();
}

//Edit the record- request
function editRecord(evt){
    let updatedRec=evt.currentTarget.param;

    let request=new FXMLHttpRequest();    
    request.onload= function() {;
        if (this.status == 200) {
            observedRec=updatedRec;
            alert('Appointment details have been successfully updated');
            seeAll();
        }
    };
    request.open("PUT", `appointment/update/${observedRec.date}/${observedRec.time}`,JSON.stringify(updatedRec));
    request.send();
}

//Delete the record- request
function deleteRecord(){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
            alert("Appointment was successfully deleted");
            seeAll();
            removeRecDisplay();
        }
    };
    request.open("DELETE", "appointment/delete",observedRec);
    request.send();
}

//-------------------------------------------------------------

//Get data of the new record to add
function newRecordInfo(){
    let cName = document.getElementById("cname").value;
    let cPhone = document.getElementById("cphone").value;
    let cDate = document.getElementById("cdate").value;
    let cTime = document.getElementById("ctime").value;

    let now = (new Date(Date.now())).toLocaleDateString();
    let selectedDate = (new Date(cDate)).toLocaleDateString();
    alert("now: "+now+"\nselected date: "+selectedDate);
    if(selectedDate<now){
        alert("It is not possible to make an appointment at a time that has already passed.");
    }
    else{
       let record={id:run_id++, name:cName, phone:cPhone, date:cDate, time:cTime};
        add(JSON.stringify(record)); 
    }

    
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

//Display record data
function displayRec(){

    let table = document.createElement('table');
    table.id = 'recTable';

    // Create the table rows with editable cells for each property of the record
    for (let prop in observedRec) {
        if (observedRec.hasOwnProperty(prop)) {
            let row = table.insertRow();
            let labelCell = row.insertCell();
            let valueCell = row.insertCell();
            labelCell.innerText = prop;
            valueCell.contentEditable = true;
            valueCell.setAttribute("data-property", prop);
            valueCell.innerText = observedRec[prop];

            // EvenetListener for all the cells- save the new input
            valueCell.addEventListener("blur", function(event) {
                let cell = event.target;
                let property = cell.getAttribute("data-property");
                if (property) {
                    updatedRec[property] = cell.innerText;
                }
            });
        }
    }

    document.getElementById("searchDiv").appendChild(table);

    let updatedRec=observedRec;
    createBtn("deleteBtn","delete",deleteRecord);
    let editBtn=createBtn("editBtn","edit",editRecord);
    editBtn.param=updatedRec;
}

//Create buuton and add it to the DOM
function createBtn(id, text,eventListener){
    button = document.createElement("button");
    button.innerText = text;
    button.setAttribute("type", "button");
    button.setAttribute("id", id);
    document.getElementById("searchDiv").appendChild(button);
    button.addEventListener('click',eventListener);
    return button;
}

//Remove record data from the page
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