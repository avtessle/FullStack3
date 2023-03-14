var run_id=0;
let observedRec;

//Get data of the new record to add
function newRecordInfo(){
    let cName = document.getElementById("cname").value;
    let cPhone = document.getElementById("cphone").value;
    let cDate = document.getElementById("cdate").value;
    let cTime = document.getElementById("ctime").value;
    //date in past
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
function seeRecord(date,time){
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
    request.open("GET", `appointment/single/${date}/${time}`);
    request.send();
}



function getRecordsByDate(date){
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
        else if(this.status == 422){
            alert("It is not possible to make the appointment at the chosen time. Choose another date.");
        }
    };
    request.open("POST", "appointment/add",newRecord);
    request.send();
}

function editRecord(){
    alert("appointment deleted");
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