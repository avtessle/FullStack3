let observedRec;

//See all the records- request
function seeAll(){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
            allRecsTable(JSON.parse(request.responseText));
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
            alert("Appointment was added");
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
    request.onload= function() {

        //Update the observed record and the all-records table
        if (this.status == 200) {
            observedRec= Object.assign({}, updatedRec); // observedRec=updatedRec
            alert('Appointment details have been successfully updated');
            seeAll();
        } 
        
        //The appt time is taken- return the time to the original value
        else if(this.status == 422)
        {
            alert("It is not possible to make the appointment at the chosen time.");
            const table = document.querySelector('#recTable');
            const timeRow=table.rows[ table.rows.length - 1 ];
            const timeCell = timeRow.querySelector('td:last-child');
            timeCell.innerText=observedRec['time'];
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
       let record={name:cName, phone:cPhone, date:cDate, time:cTime};
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

    //Create the table rows with editable cells for each property of the record
    for (let prop in observedRec) {
        let row = table.insertRow();
        let labelCell = row.insertCell();
        let valueCell = row.insertCell();
        labelCell.innerText = prop.toUpperCase();

        valueCell.contentEditable = true;
        valueCell.setAttribute("data-property", prop);
        valueCell.innerText = observedRec[prop];

        //EvenetListener for all the cells- save the new input
        valueCell.addEventListener("blur", function(event) {
            let cell = event.target;
            let property = cell.getAttribute("data-property");
            //if proprety
            if (validDtata(property, cell.innerText) ) {
                updatedRec[property] = cell.innerText;
            }
            else{
                alert('details are not in the right format!');
                cell.innerText=observedRec[property];
            }
        });
    }

    //Style the table and insert it in the html
    table.classList.add("recTableClass");
    document.getElementById("searchDiv").appendChild(table);

    //updatedRec=observedRec
    let updatedRec= Object.assign({}, observedRec); //updatedRec=observedRec
    
    //Create edit and delete buttons
    createBtn("deleteBtn","delete",deleteRecord);
    let editBtn=createBtn("editBtn","edit",editRecord);
    editBtn.param=updatedRec;
}

//Validate data format
function validDtata(property,data){

    switch(property){
        case 'name':
            regex=new RegExp("([a-zA-Z\s]){2,}"); 
            break;
        case 'phone':
            regex=new RegExp("05[0-9]{1}-[0-9]{3}-[0-9]{4}");
            break;
        case 'date':
            regex=new RegExp('^\\d{4}-\\d{2}-\\d{2}$');
            break;
        case 'time':
            regex=new RegExp('^(1[0-9]|20|08|09):00$');
            break;
        default:
            break;
    }

    if (regex.test(data)) {
        return true;
    }
    return false;
}

//Create buuton and add it to the DOM
function createBtn(id, text,eventListener){
    button = document.createElement("button");
    button.innerText = text;
    button.setAttribute("type", "button");
    button.setAttribute("id", id);
    button.setAttribute("class", "recBtn");
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

//Create the table of all the records
function allRecsTable(allRecs){
    const listElement = document.getElementById('allRecs');
    listElement.innerHTML='';
    const columns = ['name', 'phone', 'date', 'time'];
    
    //For each record 
    allRecs.forEach(item => {
        item=JSON.parse(item);
        const rowElement = document.createElement('tr');
        
        //For each proprety
        columns.forEach(column => {
            const cellElement = document.createElement('td');
            cellElement.innerHTML = item[column];
            rowElement.appendChild(cellElement);
        });
        
        listElement.appendChild(rowElement);
    });
}