var run_id=0;

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
            alert("ok!");
            //document.getElementById("request").innerHTML = request.responseText;
    }};
    request.open("GET", "appointment/all");
    request.send();   
}

//See a specific record
function seeRecord(){
    let id=0;
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
            alert("ok!");
            //document.getElementById("request").innerHTML = request.responseText;    
        }
    };
    request.open("GET", `appointment/${id}`);
    request.send();
}

//Add a record
function add(newRecord){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
            alert("ok!");
            //document.getElementById("request").innerHTML = request.responseText;
        }
    };
    request.open("POST", "appointment/add",newRecord);
    request.send();   
}