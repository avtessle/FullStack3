//Get data of the new record to add
function newRecordInfo(){
    let record={id:0, name:"a", date:new Date(2018, 11, 24, 10, 33)};
    add(JSON.stringify(record));
}

//See all the records
function seeAll(){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
        document.getElementById("request").innerHTML = request.responseText;
    }};
    request.open("GET", "application/all");
    request.send();   
}

//See a specific record
function seeRecord(){
    let id=0;
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
        document.getElementById("request").innerHTML = request.responseText;
    }};
    request.open("GET", `application/${id}`);
    request.send();
}

//Add a record
function add(newRecord){
    let request=new FXMLHttpRequest();    
    request.onload= function() {
        if (this.status == 200) {
        document.getElementById("request").innerHTML = request.responseText;
    }};
    request.open("POST", "application/add",newRecord);
    request.send();   
}