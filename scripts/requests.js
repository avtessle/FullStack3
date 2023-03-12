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

//See a specific record
function seeNameRecord(name){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        let showRecText=document.getElementById("showRec");
        if (this.status == 200) {
            recVisibility('visible');
            showRecText.innerHTML = request.responseText;  
            observedRec= request.responseText;
            //let rec=JSON.parse(request.responseText); 
        }
        else{
            alert("There is no matching appointment!");
            recVisibility('hidden');
        }
    };
    request.open("GET", `appointment/name/${name}`);
    request.send();
}

//See a specific record
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
            // recVisibility('hidden');
        }
    };
    request.open("GET", `appointment/date/${date}`);
    request.send();
}

//Add a record
function add(newRecord){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
            alert("ok!");
        }
    };
    request.open("POST", "appointment/add",newRecord);
    request.send();
}

function editRecord(){
    alert("deleted");
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

function recVisibility(mode){
    document.getElementById("showRec").style.visibility = mode;
    document.getElementById("editBtn").style.visibility = mode;
    document.getElementById("deleteBtn").style.visibility = mode;
}

function insertMeet(meeting){
    alert("hi"+meeting);
    meeting =JSON.parse(meeting);
    let hour = document.getElementById(meeting.time);
    let name = document.createElement('td');
    let phone = document.createElement('td');
    name.innerHTML = meeting.name;
    phone.innerHTML = meeting.phone;
    name.classList.add("newData");
    phone.classList.add("newData");
    hour.appendChild(name);
    hour.appendChild(phone);
}